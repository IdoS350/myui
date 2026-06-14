# Setting Up a New Vite + React + TypeScript App with myui

This guide walks you through the full setup process to integrate myui components into your Vite + React + TypeScript project.

---

## Step 1: Configure the Path Alias

myui requires the `@/` path alias for all cross-directory imports. You need to configure this in two places:

### tsconfig.json

Add the `paths` configuration to your TypeScript compiler options:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### vite.config.ts

Add the Vite alias resolver to match your TypeScript paths:

```ts
import path from 'path'

export default {
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
}
```

This ensures that both your TypeScript compiler and Vite bundler understand the `@/` alias correctly.

---

## Step 2: Create components.json

Create a `components.json` file in your project root pointing to the myui registry. Note that **myui does not use Tailwind**, so the config is minimal:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "utils": "@/utilities"
  },
  "registries": {
    "@myui": "https://idos350.github.io/myui/r/{name}.json"
  }
}
```

Key points:
- The `@myui` registry URL points to the myui GitHub Pages registry
- Set `"style": "default"` (myui doesn't use Tailwind)
- `rsc` is `false` for client-side React
- The component and utilities aliases map to your `src/` directory structure

---

## Step 3: Install the Select Component

Once your path alias and `components.json` are in place, you can install components using the shadcn CLI:

```bash
pnpm dlx shadcn@latest add @myui/select
```

The CLI will:
1. Fetch the `select` component from the myui registry
2. Copy the source files into `src/components/Select/`
3. Install any required dependencies

You now own the source files and can edit them freely.

---

## Step 4: Use the Select Component

Import the Select sub-components directly from the component file (never from `primitives.ts`):

```tsx
import { SelectRoot, SelectTrigger, SelectList, SelectItem } from '@/components/Select/Select'

export function MySelectExample() {
  return (
    <SelectRoot>
      <SelectTrigger placeholder="Choose an option…" />
      <SelectList>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
        <SelectItem value="c">Option C</SelectItem>
      </SelectList>
    </SelectRoot>
  )
}
```

---

## Step 5: Bootstrap the Theme (Optional but Recommended)

To use myui's built-in theming, design tokens, and dark mode support, import the theme at your app entry point:

```scss
// src/main.scss or src/index.scss
@use '@/theme/main.scss';
```

Then wrap your app with `ThemeProvider`:

```tsx
import { ThemeProvider } from '@/theme/useTheme'

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  )
}
```

This enables:
- Dark mode (via `useTheme()`)
- System preference tracking
- CSS custom properties for colors, spacing, typography, and more
- Automatic persistence of theme preference to `localStorage`

---

## Key Import Rules

Always follow these rules when working with myui:

- **Use `@/` for cross-directory imports**: `import { SelectRoot } from '@/components/Select/Select'` ✅
- **Never use `../`**: `import { SelectRoot } from '../../components/Select/Select'` ❌
- **Same-directory imports are fine**: `import Primitives from './primitives'` ✅
- **Never import from `primitives.ts` for normal usage**: It's an internal implementation detail. Always import from `ComponentName.tsx` instead.
- **No barrel `index.ts` files**: Import directly from the component file.

---

## Next Steps

- **Browse available components**: Visit [https://idos350.github.io/myui](https://idos350.github.io/myui) to see the full component library
- **Customize colors**: Edit `src/theme/colors.scss` to change brand colors using OKLCH format
- **Add more components**: Use `pnpm dlx shadcn@latest add @myui/<component-name>` for any component in the registry
- **Enable dark mode**: Use the `useTheme()` hook to toggle between light and dark modes
- **RTL support**: Wrap your app with `DirectionProvider` from `@base-ui/react/direction-provider` if needed

---

## Troubleshooting

If you encounter import errors:
1. Verify both `tsconfig.json` and `vite.config.ts` have the `@/` alias configured
2. Make sure `components.json` exists in your project root
3. Check that the registry URL is correctly set to `https://idos350.github.io/myui/r/{name}.json`

That's it! You're now ready to build with myui.
