# Setting Up myui in a New Vite + React + TypeScript App

This guide walks you through integrating myui, a shadcn-based component library, into a fresh Vite + React + TypeScript project.

## Step 1: Create a New Vite + React + TypeScript Project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

## Step 2: Configure Path Aliases

myui uses the `@/` alias pattern (standard for shadcn). You need to configure this in both Vite and TypeScript.

### Update `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Update `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "target": "ES2020",
    "useDefineForModule": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Step 3: Install the Shadcn Registry CLI

The shadcn CLI is required to add components from registries.

```bash
npm install -D shadcn-ui
```

## Step 4: Initialize Shadcn (with myui Registry)

```bash
npx shadcn-ui init
```

When prompted:

- **Style**: Choose your preferred style (typically "Default" for component libraries)
- **Base color**: Choose a color (e.g., "Slate" or "Neutral")
- **CSS variables**: Select "Yes" for CSS variables (required for myui theming)
- **ESLint**: Choose "Yes" if you want ESLint configuration

This creates a `components.json` file at your project root.

## Step 5: Configure `components.json` for myui Registry

Update your `components.json` to point to the myui registry:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "aliasPrefix": "@",
  "resolvedPaths": {
    "ui": "./src/components/ui",
    "utils": "./src/lib/utils"
  },
  "registries": [
    {
      "name": "default",
      "url": "https://idos350.github.io/myui"
    }
  ]
}
```

Key points:
- Set the registry `url` to the myui registry endpoint
- The `aliasPrefix` must be `@` to match your path alias setup
- Components will install to `./src/components/ui` by default

## Step 6: Install Base UI as a Peer Dependency

myui components are built on top of `@base-ui/react`. Install it:

```bash
npm install @base-ui/react
```

## Step 7: Install the Select Component

Now you can add the Select component from myui:

```bash
npx shadcn-ui add select --registry https://idos350.github.io/myui
```

Alternatively, if your `components.json` is configured correctly:

```bash
npx shadcn-ui add select
```

This command will:
- Download the Select component from the myui registry
- Install it to `src/components/ui/select/`
- Add any required dependencies

## Step 8: Use the Select Component

In your component:

```typescript
import { SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select/Select'

export function MyComponent() {
  return (
    <SelectRoot>
      <SelectTrigger>
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </SelectRoot>
  )
}
```

## Step 9: Install Additional Components as Needed

To install other myui components, use:

```bash
npx shadcn-ui add [component-name]
```

Common components you might add:
- `button`
- `input`
- `dialog`
- `dropdown-menu`
- `tabs`

## Step 10: Theme Setup (Optional but Recommended)

myui components support CSS custom properties for theming. Create a theme file in `src/theme/`:

```css
/* src/theme/globals.css */
:root {
  --color-bg: hsl(0 0% 100%);
  --color-fg: hsl(0 0% 0%);
  --color-border: hsl(0 0% 90%);
  --color-accent: hsl(200 100% 50%);
  --color-danger: hsl(0 100% 50%);
  
  /* Add other semantic tokens as needed */
}

[data-theme='dark'] {
  --color-bg: hsl(0 0% 0%);
  --color-fg: hsl(0 0% 100%);
  --color-border: hsl(0 0% 20%);
  --color-accent: hsl(200 100% 60%);
  --color-danger: hsl(0 100% 60%);
}
```

Import this in your main entry point (`src/main.tsx`):

```typescript
import './theme/globals.css'
```

## Step 11: Verify the Installation

Create a test page with the installed component:

```typescript
// src/App.tsx
import { SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select/Select'

function App() {
  return (
    <div>
      <h1>myui Setup Test</h1>
      <SelectRoot>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test1">Test Option 1</SelectItem>
          <SelectItem value="test2">Test Option 2</SelectItem>
        </SelectContent>
      </SelectRoot>
    </div>
  )
}

export default App
```

Run your dev server:

```bash
npm run dev
```

## Troubleshooting

### Components Not Found

- Verify `components.json` points to the correct registry URL
- Ensure the `aliasPrefix` is set to `@`
- Check that `src/components/ui/` directory exists

### Import Errors

- Confirm `tsconfig.json` has the `@/*` path alias configured
- Verify `vite.config.ts` has the matching alias in `resolve.alias`
- Make sure imports use `@/` not `../`

### Styling Issues

- Ensure Base UI components are installed: `npm install @base-ui/react`
- Check that CSS custom properties are defined in your global styles
- myui uses OKLCH color values and logical CSS properties (RTL-compatible)

### Registry Not Found

- Double-check the registry URL: `https://idos350.github.io/myui`
- Ensure your network connection allows access to the registry
- Try clearing the shadcn cache: `rm -rf ~/.shadcn-ui`

## Summary

You now have:
- ✅ A Vite + React + TypeScript project
- ✅ Path alias configuration (`@/`)
- ✅ myui registry configured in `components.json`
- ✅ Base UI installed as a dependency
- ✅ Select component installed and ready to use
- ✅ Optional theme setup for custom styling

You can add more components from myui as your project grows using `npx shadcn-ui add [component-name]`.
