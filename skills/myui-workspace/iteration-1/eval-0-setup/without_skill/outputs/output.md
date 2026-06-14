# Setting Up Vite + React + TypeScript with myui

Here's the complete walkthrough to bootstrap a new Vite + React + TypeScript app and integrate myui components.

## Step 1: Create Your Vite App

Start with Vite's React template:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
pnpm install
```

This scaffolds a new project with:
- React 19 and TypeScript support
- Vite as the build tool
- Hot module reloading during development

## Step 2: Configure Path Aliases

MyUI uses the `@/` alias convention (a shadcn standard) to resolve imports from your `src/` directory. You need to set this up in both **Vite** and **TypeScript**.

### Configure Vite (`vite.config.ts`)

Update your `vite.config.ts` to add the path alias:

```ts
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Allows @use '@/...' to resolve from src/
        importers: [
          {
            findFileUrl(url: string) {
              if (!url.startsWith('@/')) return null
              return new URL('file://' + path.resolve(__dirname, 'src', url.slice(2)))
            },
          },
        ],
      },
    },
  },
})
```

The SCSS `importers` config is critical—it enables `@use '@/...'` imports in SCSS files, which is required when installing myui's theme.

### Configure TypeScript (`tsconfig.app.json`)

Update your `tsconfig.app.json` to tell TypeScript about the alias:

```json
{
  "compilerOptions": {
    "target": "es2023",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "esnext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "strict": true,
    
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "allowArbitraryExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,

    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"]
}
```

## Step 3: Add the myui Registry

MyUI is a shadcn-compatible component registry. To add it, create (or update) a `components.json` file in your project root:

```json
{
  "$schema": "https://ui.shadcn.com/schema/components.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "",
    "baseColor": "slate"
  },
  "aliases": {
    "@/*": "./src/*",
    "@ui/*": "./src/components/*",
    "@lib/*": "./src/lib/*",
    "@hooks/*": "./src/hooks/*"
  },
  "registries": [
    {
      "name": "myui",
      "url": "https://myui.dev"
    }
  ]
}
```

Key points:
- **`registries`** — Points to the myui registry (replace with your actual registry URL if different)
- **`aliases`** — Maps install targets; `@ui/*` is where components land, `@lib/*` for utilities, `@hooks/*` for custom hooks
- **TSX/TypeScript** — Set `tsx: true` since myui uses TypeScript components

If you haven't already, install shadcn CLI:

```bash
pnpm add -D shadcn-ui
```

## Step 4: Install the Theme (Required First)

Before installing components, install the theme. This sets up all design tokens (colors, spacing, typography, radius, shadows, transitions):

```bash
npx shadcn-ui@latest add myui:theme
```

This command:
1. Fetches the theme from the myui registry
2. Copies SCSS files to `src/theme/`
3. Sets up CSS custom properties and SCSS mixins

Your directory should now have:
```
src/
  theme/
    main.scss
    _mixins.scss
    colors.scss
    spacing.scss
    ...
```

## Step 5: Import the Theme in Your App

In your `src/main.tsx` (or however your app is bootstrapped), import the theme:

```tsx
import './theme/main.scss'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

This activates all the design tokens globally.

## Step 6: Install the Select Component

Now you can install individual components. Let's install Select as an example:

```bash
npx shadcn-ui@latest add myui:select
```

This installs:
- `src/components/Select/Select.tsx` — The main component
- `src/components/Select/Select.module.scss` — Scoped styles
- `src/components/Select/primitives.ts` — Base UI primitive definitions

And automatically adds its dependencies:
- `@base-ui/react@^1.5.0` — Headless select primitives
- `lucide-react@^1.16.0` — Icons

## Step 7: Use the Select Component

Import and use it in your app:

```tsx
import { SelectRoot, SelectTrigger, SelectValue, SelectList, SelectItem } from '@/components/Select/Select'

function App() {
  return (
    <SelectRoot defaultValue="apple">
      <SelectTrigger placeholder="Pick a fruit">
        <SelectValue />
      </SelectTrigger>
      <SelectList>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectList>
    </SelectRoot>
  )
}

export default App
```

Key import pattern:
- Always import **directly from the component file**: `@/components/Select/Select`
- Never import from `@base-ui/react` directly (always go through myui's wrapper)
- Never import from `primitives.ts` (it's internal; the main component re-exports what you need)

## Step 8: Install Additional Components (Optional)

You can install any other component from the registry the same way:

```bash
# Install Button
npx shadcn-ui@latest add myui:button

# Install Input
npx shadcn-ui@latest add myui:input

# Install Dialog
npx shadcn-ui@latest add myui:dialog
```

## Key Principles

1. **Path Aliases Matter** — MyUI requires the `@/` alias. Without it, imports break and shadcn installs fail.

2. **SCSS Imports** — The theme includes SCSS files. Make sure your Vite config's `preprocessorOptions.scss.importers` is set up correctly so `@use '@/theme/_mixins'` works.

3. **Import Convention** — Always import from the component's main file, not primitives:
   ```ts
   ✅ import { SelectRoot } from '@/components/Select/Select'
   ❌ import Primitives from '@/components/Select/primitives'
   ```

4. **Theme is Required** — All components depend on the theme. Install it first before any UI component.

5. **CSS Custom Properties** — MyUI uses CSS custom properties (`var(--color-accent)`, etc.) for theming. All colors are in OKLCH color space. Dark mode is toggled via `[data-theme='dark']` on `document.documentElement`.

## Troubleshooting

**TypeScript can't find `@/` imports?**
- Restart your IDE/editor
- Verify `paths` in `tsconfig.app.json`

**SCSS imports fail with `@use '@/...'`?**
- Check the `preprocessorOptions.scss.importers` in `vite.config.ts`
- Make sure you're using `@use` (not `@import`) in SCSS files

**Components aren't styling?**
- Confirm you imported `src/theme/main.scss` in your main entry file
- Check browser DevTools—CSS custom properties should be on `:root` or the component element

**Registry install fails?**
- Run `npx shadcn-ui@latest init` first to set up `components.json`
- Ensure the registry URL in `components.json` is correct

---

You're now set up to use myui in your Vite + React + TypeScript app! Start building with the Select component or add more from the registry as needed.
