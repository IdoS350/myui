import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(fileURLToPath(import.meta.url), '../..')

const SOURCE_EXTS = ['.ts', '.tsx', '.scss']

function extractVersion(content: string): string | null {
  const match = content.match(/^## \[(\d+\.\d+\.\d+)\]/m)
  return match?.[1] ?? null
}

function readVersionOnMain(relPath: string): string | null {
  try {
    const content = execSync(`git show origin/main:"${relPath}"`, {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    return extractVersion(content)
  } catch {
    // File doesn't exist on main → new item, no prior version to compare
    return null
  }
}

// Get files changed between this branch and main, plus any uncommitted changes
let changedFiles: string[]
try {
  const run = (cmd: string) =>
    execSync(cmd, { cwd: ROOT, encoding: 'utf-8' }).trim().split('\n').filter(Boolean)

  changedFiles = [
    ...new Set([
      ...run('git diff --name-only origin/main...HEAD'),
      ...run('git diff --name-only --cached'),
      ...run('git diff --name-only'),
    ]),
  ]
} catch {
  console.log('⚠  Could not diff against origin/main — skipping changelog check')
  process.exit(0)
}

// Map changed source files → changelog path. Hooks, utilities, and types are exempt.
// Uses a Map so multiple changed files in the same component deduplicate to one check.
const checks = new Map<string, string>() // relChangelogPath → display label

for (const file of changedFiles) {
  if (!SOURCE_EXTS.some((ext) => file.endsWith(ext))) continue
  if (file.includes('.stories.') || file.includes('.test.') || file.includes('.spec.')) continue

  // UI component: src/components/{Name}/...
  const componentMatch = file.match(/^src\/components\/([^/]+)\//)
  if (componentMatch) {
    const name = componentMatch[1]
    checks.set(`src/components/${name}/CHANGELOG.md`, name)
    continue
  }

  // Theme: src/theme/*.{ts,tsx,scss} — skip hooks (use[A-Z] prefix)
  if (file.startsWith('src/theme/')) {
    const filename = file.split('/').pop()!
    if (!filename.match(/^use[A-Z]/)) {
      checks.set('src/theme/CHANGELOG.md', 'theme')
    }
    continue
  }

  // src/lib/*, src/hooks/*: exempt — no check
}

if (checks.size === 0) {
  console.log('✓ No changelog-tracked items changed.')
  process.exit(0)
}

const warnings: string[] = []

for (const [relPath, label] of checks) {
  const mainVersion = readVersionOnMain(relPath)

  // New item (not on main yet) — nothing to compare against
  if (mainVersion === null) continue

  const absPath = join(ROOT, relPath)
  if (!existsSync(absPath)) {
    warnings.push(`  ${label}: CHANGELOG.md missing (was ${mainVersion} on main)`)
    continue
  }

  const headVersion = extractVersion(readFileSync(absPath, 'utf-8'))
  if (!headVersion || headVersion === mainVersion) {
    warnings.push(`  ${label}: version not bumped (still ${mainVersion})`)
  }
}

if (warnings.length === 0) {
  console.log('✓ All changed items have changelog bumps.')
  process.exit(0)
} else {
  console.log('⚠  Changelog bump missing for the following items:\n')
  for (const w of warnings) console.log(w)
  console.log('\nBump the version in each CHANGELOG.md before merging.')
  process.exit(1)
}
