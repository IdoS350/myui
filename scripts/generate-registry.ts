#!/usr/bin/env tsx
// Generates registry.json by scanning src/components/ and lib directories.
// Run with: pnpm registry:build

import { readdir, readFile, stat, writeFile } from 'fs/promises'
import { basename, dirname, extname, join, relative, resolve } from 'path'
import { format, resolveConfig } from 'prettier'
import { fileURLToPath } from 'url'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')
const COMPONENTS_DIR = join(ROOT, 'src/components')
const OUTPUT = join(ROOT, 'registry.json')

const REGISTRY_NAME = 'myui'

function registryRef(name: string): string {
  return `@${REGISTRY_NAME}/${name}`
}

// Files to exclude from registry entries
const EXCLUDE_SUFFIXES = ['.stories.tsx', '.stories.ts']

// Packages that every React project already provides
const IMPLICIT_DEPS = new Set(['react', 'react-dom'])

/**
 * Directories to scan for hooks and utilities.
 * Each .ts / .tsx file found here becomes its own registry item.
 * Files already declared in FIXED_ITEMS are skipped automatically.
 */
const LIB_SCAN_DIRS: Array<{
  path: string
  type: 'registry:hook' | 'registry:lib'
}> = [
  { path: 'src/hooks', type: 'registry:hook' },
  { path: 'src/lib', type: 'registry:lib' },
  { path: 'src/theme', type: 'registry:lib' },
]

type RegistryType = 'registry:ui' | 'registry:lib' | 'registry:hook' | 'registry:theme'

interface RegistryFile {
  path: string
  type: RegistryType
  target: string
}

interface RegistryItem {
  name: string
  type: RegistryType
  title: string
  description?: string
  meta?: { version?: string }
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
}

interface ScannedItem {
  item: RegistryItem
  changelogPath: string
  required: boolean
}

interface Registry {
  $schema: string
  name: string
  homepage: string
  items: RegistryItem[]
}

function toKebab(name: string): string {
  return name.replace(/([A-Z])/g, (m, l, i) => (i > 0 ? '-' + l.toLowerCase() : l.toLowerCase()))
}

/** Strip extension and SCSS partial underscore prefix for loose matching. */
function normalizePath(p: string): string {
  const noExt = p.replace(/\.[^/.]+$/, '')
  // /theme/_mixins → /theme/mixins (SCSS partials)
  return noExt.replace(/([\\/])_([^\\/]+)$/, '$1$2')
}

/**
 * Build a map from normalized absolute path → registry item name
 * for every file declared in the given fixed items.
 */
function buildSourceMap(fixedItems: RegistryItem[]): Map<string, string> {
  const map = new Map<string, string>()
  for (const item of fixedItems) {
    for (const file of item.files) {
      const abs = join(ROOT, file.path)
      map.set(normalizePath(abs), item.name)
    }
  }
  return map
}

/**
 * Resolve a path-alias import (@/...) to an absolute path using the same
 * alias the Vite config defines: @/ → src/.
 */
function resolveAlias(imp: string): string {
  return join(ROOT, 'src', imp.slice(2)) // strip "@/"
}

/** Extract bare npm package name from any import specifier. */
function extractPackageName(imp: string): string | null {
  if (imp.startsWith('.') || imp.startsWith('/') || imp.startsWith('@/') || imp.startsWith('node:'))
    return null
  if (imp.startsWith('@')) {
    const parts = imp.split('/')
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : null
  }
  return imp.split('/')[0]
}

/** Load runtime dependencies from package.json — names for existence checks, versions for pinning. */
async function loadRuntimeDeps(): Promise<{ names: Set<string>; versions: Map<string, string> }> {
  const raw = await readFile(join(ROOT, 'package.json'), 'utf-8')
  const pkg = JSON.parse(raw) as { dependencies?: Record<string, string> }
  const deps = pkg.dependencies ?? {}
  return {
    names: new Set(Object.keys(deps)),
    versions: new Map(Object.entries(deps)),
  }
}

/** Return a dep string with a pinned ^ range sourced from package.json versions. */
function pinnedDep(dep: string, versions: Map<string, string>): string {
  // Skip if already versioned (e.g. "pkg@^1.0.0") — check after index 0 to skip scoped @ prefix
  if (dep.includes('@', 1)) return dep
  const version = versions.get(dep)
  if (!version) return dep
  const bare = version.replace(/^[\^~>=<]+/, '')
  return `${dep}@^${bare}`
}

/** Read the first ## [x.y.z] version from a CHANGELOG.md. Returns null if missing or unparseable. */
async function readChangelogVersion(filePath: string): Promise<string | null> {
  try {
    const content = await readFile(filePath, 'utf-8')
    const match = content.match(/^## \[(\d+\.\d+\.\d+)\]/m)
    return match ? match[1] : null
  } catch {
    return null
  }
}

/** Parse `from '…'` specifiers from a TS/TSX file. */
async function parseTsImports(filePath: string): Promise<string[]> {
  const content = await readFile(filePath, 'utf-8')
  const imports: string[] = []
  const re = /from\s+['"]([^'"]+)['"]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(content)) !== null) imports.push(m[1])
  return imports
}

/** Parse `@use '…'` / `@import '…'` specifiers from a SCSS file. */
async function parseScssUses(filePath: string): Promise<string[]> {
  const content = await readFile(filePath, 'utf-8')
  const uses: string[] = []
  const re = /@(?:use|import)\s+['"]([^'"]+)['"]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(content)) !== null) uses.push(m[1])
  return uses
}

async function isDir(p: string): Promise<boolean> {
  try {
    return (await stat(p)).isDirectory()
  } catch {
    return false
  }
}

async function exists(p: string): Promise<boolean> {
  try {
    await stat(p)
    return true
  } catch {
    return false
  }
}

/**
 * Resolve registry deps and npm deps from a list of (filePath, imports) pairs.
 * Works for both component files and lib files.
 */
async function resolveImportDeps(
  files: Array<{ path: string; imports: string[] }>,
  runtimeDeps: Set<string>,
  sourceMap: Map<string, string>,
  componentNames: Set<string>,
  ownerName: string | null, // component folder name to exclude from cross-deps, null for libs
): Promise<{ deps: Set<string>; registryDeps: Set<string> }> {
  const deps = new Set<string>()
  const registryDeps = new Set<string>()

  for (const { path: filePath, imports } of files) {
    for (const imp of imports) {
      if (imp.startsWith('.')) {
        const resolved = normalizePath(resolve(dirname(filePath), imp))

        const fixedItem = sourceMap.get(resolved)
        if (fixedItem) {
          registryDeps.add(fixedItem)
          continue
        }

        // Cross-component dependency
        const relToComponents = relative(COMPONENTS_DIR, resolved)
        const parts = relToComponents.split('/')
        if (!relToComponents.startsWith('..') && parts.length >= 1) {
          const depName = parts[0]
          if (componentNames.has(depName) && depName !== ownerName) {
            registryDeps.add(toKebab(depName))
          }
        }
      } else if (imp.startsWith('@/')) {
        const resolved = normalizePath(resolveAlias(imp))
        const fixedItem = sourceMap.get(resolved)
        if (fixedItem) {
          registryDeps.add(fixedItem)
        } else {
          // Cross-component dependency via @/components/Name/...
          const relToComponents = relative(COMPONENTS_DIR, join(ROOT, 'src', imp.slice(2)))
          const parts = relToComponents.split('/')
          if (!relToComponents.startsWith('..') && parts.length >= 1) {
            const depName = parts[0]
            if (componentNames.has(depName) && depName !== ownerName) {
              registryDeps.add(toKebab(depName))
            }
          }
        }
      } else {
        const pkg = extractPackageName(imp)
        if (pkg && runtimeDeps.has(pkg) && !IMPLICIT_DEPS.has(pkg)) {
          deps.add(pkg)
        }
      }
    }
  }

  return { deps, registryDeps }
}

// --- Fixed registry items ---

const THEME_ITEM: RegistryItem = {
  name: 'theme',
  type: 'registry:theme',
  title: 'MyUI Theme',
  description: 'Design tokens: OKLCH colors, spacing, typography, radius, shadows, transitions',
  files: [
    'main.scss',
    '_mixins.scss',
    'colors.scss',
    'spacing.scss',
    'sizes.scss',
    'typography.scss',
    'radius.scss',
    'shadows.scss',
    'transitions.scss',
  ].map((f) => ({
    path: `src/theme/${f}`,
    type: 'registry:theme' as const,
    target: `~/src/theme/${f}`,
  })),
}

const UTILS_ITEM: RegistryItem = {
  name: 'style-utils',
  type: 'registry:lib',
  title: 'MyUI Utilities',
  description: 'Shared styled() helper and slot-prop type utilities',
  dependencies: ['clsx'],
  files: [
    {
      path: 'src/lib/styled.tsx',
      type: 'registry:lib',
      target: '@lib/styled.tsx',
    },
    {
      path: 'src/lib/slotProps.ts',
      type: 'registry:lib',
      target: '@lib/slotProps.ts',
    },
  ],
}

const FIXED_ITEMS: RegistryItem[] = [THEME_ITEM, UTILS_ITEM]

// --- Component scanning ---

async function buildComponentItem(
  name: string,
  runtimeDeps: Set<string>,
  componentNames: Set<string>,
  sourceMap: Map<string, string>,
): Promise<RegistryItem> {
  const dir = join(COMPONENTS_DIR, name)
  const allFiles = await readdir(dir)

  const registryFiles = allFiles.filter(
    (f) =>
      !EXCLUDE_SUFFIXES.some((s) => f.endsWith(s)) &&
      (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.scss')),
  )

  const registryDeps = new Set<string>()

  // Any component with a stylesheet implicitly depends on theme tokens being defined
  if (registryFiles.some((f) => f.endsWith('.scss'))) {
    registryDeps.add('theme')
  }

  // Collect imports from TS/TSX files
  const tsFiles = await Promise.all(
    registryFiles
      .filter((f) => f.endsWith('.ts') || f.endsWith('.tsx'))
      .map(async (f) => {
        const filePath = join(dir, f)
        return { path: filePath, imports: await parseTsImports(filePath) }
      }),
  )

  // Collect @use directives from SCSS files
  const scssFiles = await Promise.all(
    registryFiles
      .filter((f) => f.endsWith('.scss'))
      .map(async (f) => {
        const filePath = join(dir, f)
        return { path: filePath, imports: await parseScssUses(filePath) }
      }),
  )

  const { deps, registryDeps: importedRegistryDeps } = await resolveImportDeps(
    [...tsFiles, ...scssFiles],
    runtimeDeps,
    sourceMap,
    componentNames,
    name,
  )

  for (const d of importedRegistryDeps) registryDeps.add(d)

  const files: RegistryFile[] = registryFiles.map((f) => ({
    path: `src/components/${name}/${f}`,
    type: 'registry:ui',
    target: `@ui/${name}/${f}`,
  }))

  return {
    name: toKebab(name),
    type: 'registry:ui',
    title: name,
    dependencies: [...deps].sort(),
    registryDependencies: [...registryDeps].sort().map(registryRef),
    files,
  }
}

// --- Lib/hook scanning ---

async function scanLibDirs(
  runtimeDeps: Set<string>,
  componentNames: Set<string>,
  sourceMap: Map<string, string>,
): Promise<ScannedItem[]> {
  // Collect the set of absolute paths already declared in fixed items so we skip them
  const declaredPaths = new Set(
    FIXED_ITEMS.flatMap((item) => item.files.map((f) => join(ROOT, f.path))),
  )

  const items: ScannedItem[] = []

  for (const scanDir of LIB_SCAN_DIRS) {
    const dirPath = join(ROOT, scanDir.path)
    if (!(await exists(dirPath))) continue

    const entries = await readdir(dirPath, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) continue

      const ext = extname(entry.name)
      if (ext !== '.ts' && ext !== '.tsx') continue
      if (EXCLUDE_SUFFIXES.some((s) => entry.name.endsWith(s))) continue

      const filePath = join(dirPath, entry.name)
      if (declaredPaths.has(filePath)) continue

      const nameWithoutExt = basename(entry.name, ext)
      // Files starting with "use" are hooks regardless of the dir's declared type
      const type = nameWithoutExt.match(/^use[A-Z]/) ? 'registry:hook' : scanDir.type

      const imports = await parseTsImports(filePath)
      const { deps, registryDeps } = await resolveImportDeps(
        [{ path: filePath, imports }],
        runtimeDeps,
        sourceMap,
        componentNames,
        null,
      )

      const relPath = relative(ROOT, filePath).replace(/\\/g, '/')

      const targetPrefix = type === 'registry:hook' ? '@hooks/' : '@lib/'
      items.push({
        item: {
          name: toKebab(nameWithoutExt),
          type,
          title: nameWithoutExt,
          dependencies: [...deps].sort(),
          registryDependencies: [...registryDeps].sort().map(registryRef),
          files: [{ path: relPath, type, target: `${targetPrefix}${entry.name}` }],
        },
        changelogPath: join(dirPath, `CHANGELOG.${nameWithoutExt}.md`),
        required: false,
      })
    }
  }

  return items
}

/**
 * Pre-scan lib dirs to build a path→name map from filenames alone (no file reads).
 * Used to populate the sourceMap before resolving deps so hook-to-hook imports resolve correctly.
 */
async function buildLibSourceMap(): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  const declaredPaths = new Set(
    FIXED_ITEMS.flatMap((item) => item.files.map((f) => join(ROOT, f.path))),
  )

  for (const scanDir of LIB_SCAN_DIRS) {
    const dirPath = join(ROOT, scanDir.path)
    if (!(await exists(dirPath))) continue

    const entries = await readdir(dirPath, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) continue
      const ext = extname(entry.name)
      if (ext !== '.ts' && ext !== '.tsx') continue
      if (EXCLUDE_SUFFIXES.some((s) => entry.name.endsWith(s))) continue

      const filePath = join(dirPath, entry.name)
      if (declaredPaths.has(filePath)) continue

      map.set(normalizePath(filePath), toKebab(basename(entry.name, ext)))
    }
  }

  return map
}

// --- Main ---

async function main(): Promise<void> {
  const [{ names: runtimeDeps, versions: depVersions }, entries] = await Promise.all([
    loadRuntimeDeps(),
    readdir(COMPONENTS_DIR, { withFileTypes: true }),
  ])

  const componentNames = new Set(
    (
      await Promise.all(
        entries
          .filter((e) => e.isDirectory())
          .map(async (e) => ((await isDir(join(COMPONENTS_DIR, e.name))) ? e.name : null)),
      )
    ).filter((n): n is string => n !== null),
  )

  const sortedNames = [...componentNames].sort()

  // Build the full sourceMap before scanning so hook-to-hook deps resolve correctly
  const libPathMap = await buildLibSourceMap()
  const sourceMap = new Map([...buildSourceMap(FIXED_ITEMS), ...libPathMap])

  const libScanned = await scanLibDirs(runtimeDeps, componentNames, sourceMap)

  const componentScanned: ScannedItem[] = await Promise.all(
    sortedNames.map(async (name) => ({
      item: await buildComponentItem(name, runtimeDeps, componentNames, sourceMap),
      changelogPath: join(COMPONENTS_DIR, name, 'CHANGELOG.md'),
      required: true,
    })),
  )

  const allItems = [
    ...FIXED_ITEMS,
    ...libScanned.map((s) => s.item),
    ...componentScanned.map((s) => s.item),
  ]

  // Pin dep versions across all items using the ranges from package.json
  for (const item of allItems) {
    item.dependencies = (item.dependencies ?? []).map((dep) => pinnedDep(dep, depVersions))
  }

  // Read changelog versions and emit warnings for required items that are missing one
  const fixedScanned: ScannedItem[] = [
    { item: THEME_ITEM, changelogPath: join(ROOT, 'src/theme/CHANGELOG.md'), required: true },
    {
      item: UTILS_ITEM,
      changelogPath: join(ROOT, 'src/lib/CHANGELOG.style-utils.md'),
      required: false,
    },
  ]

  const allScanned = [...fixedScanned, ...libScanned, ...componentScanned]
  let missingCount = 0

  for (const { item, changelogPath, required } of allScanned) {
    const version = await readChangelogVersion(changelogPath)
    if (version) {
      item.meta = { version }
    } else if (required) {
      missingCount++
      console.warn(`⚠  No changelog for "${item.name}" — add ${relative(ROOT, changelogPath)}`)
    }
  }

  if (missingCount > 0) {
    console.warn(`\n${missingCount} item(s) missing changelogs`)
  }

  const registry: Registry = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'myui',
    homepage: 'https://github.com/idos350/myui',
    items: allItems,
  }

  const prettierConfig = await resolveConfig(OUTPUT)
  const formatted = await format(JSON.stringify(registry), {
    ...prettierConfig,
    filepath: OUTPUT,
  })
  await writeFile(OUTPUT, formatted)
  console.log(
    `registry.json written — ${componentScanned.length} components, ${libScanned.length} hooks/libs, ${FIXED_ITEMS.length} fixed items`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
