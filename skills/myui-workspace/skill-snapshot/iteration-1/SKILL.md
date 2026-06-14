---
name: myui
description: >
  Reference guide for consuming myui — a React component library distributed via the shadcn registry.
  Use this skill whenever the user: asks about myui or @myui, wants to install or add a myui component,
  asks how to theme or customize myui components, asks about the myui registry URL or setup, asks about
  dark mode / ThemeProvider / DirectionProvider in myui, asks about overriding CSS tokens in myui,
  asks what components are available in myui, or asks how to update an already-installed myui component.
  Trigger even if the user says things like "add the button from myui", "how do I override the accent color",
  "where's the myui Select docs", or "component keeps importing from primitives" — any myui-adjacent question.
---

# myui — Consumer Reference

myui is a React component library built on [@base-ui/react](https://base-ui.com). Components are distributed
via the **shadcn registry** — meaning you install them into your own project with the shadcn CLI and own the
source files from that point on. There is no `npm install myui` package.

---

## 1. Project Setup

Before adding any components, your project needs two things: the `@/` path alias (required by all myui
imports) and a `components.json` pointing at the myui registry.

**`tsconfig.json`**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**`vite.config.ts`**
```ts
import path from 'path'

export default {
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
}
```

**`components.json`** — myui does not use Tailwind; a minimal config looks like this:
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

### RTL Support

If your app needs RTL, wrap Base UI components (or your entire app) with `DirectionProvider`:

```tsx
import { DirectionProvider } from '@base-ui/react/direction-provider'

<DirectionProvider direction="rtl">
  <YourApp />
</DirectionProvider>
```

---

## 2. Adding Components

```bash
pnpm dlx shadcn@latest add @myui/<component-name>
```

Replace `<component-name>` with the lowercase name, e.g. `button`, `select`, `dialog`. The full
component list is available at the myui registry (`https://idos350.github.io/myui`).

The CLI copies the component source files into your `src/components/` folder — you own them from
this point and can edit them freely.

---

## 3. Importing Components

Import directly from the component file — there are no barrel `index.ts` files. Always use the
`@/` alias for cross-directory imports (never `../`).

```tsx
import { ButtonRoot } from '@/components/Button/Button'
import { SelectRoot, SelectTrigger, SelectList, SelectItem } from '@/components/Select/Select'
```

Each component folder also contains a `primitives.ts` file — that is an internal implementation
detail that wires Base UI sub-components to CSS classes. Importing from it directly is only
appropriate in very specific cases (e.g. building a custom composition on top of the primitives);
for normal usage, always import from `ComponentName.tsx`.

### Example: Select

```tsx
import { SelectRoot, SelectTrigger, SelectList, SelectItem } from '@/components/Select/Select'

<SelectRoot>
  <SelectTrigger placeholder="Choose…" />
  <SelectList>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectList>
</SelectRoot>
```

---

## 4. Theming

### Bootstrap

Import `main.scss` once at your app entry point — it pulls in all token files and the CSS reset:

```scss
// src/main.scss or src/index.scss
@use '@/theme/main.scss';
```

### ThemeProvider

Wrap your app to enable dark mode and system preference tracking:

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

Use `useTheme()` to read or change the active theme:

```tsx
import { useTheme } from '@/theme/useTheme'

function ThemeToggle() {
  const { theme, setTheme, resolved } = useTheme()
  // theme: 'light' | 'dark' | 'system' (stored preference)
  // resolved: 'light' | 'dark' (actual applied value)
  // setTheme: (value: 'light' | 'dark' | 'system') => void
  return (
    <button onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}>
      Toggle
    </button>
  )
}
```

Dark mode is applied by setting `data-theme="dark"` on `document.documentElement`. The preference
is persisted to `localStorage` under the key `sp-theme`.

### Customizing Colors

The installed theme source lives at `src/theme/colors.scss` — edit it directly to change brand
colors, neutrals, or semantic tokens. Colors use OKLCH format:

```scss
// src/theme/colors.scss
:root {
  --color-primary: oklch(55% 60% 30deg);       /* your brand color */
  --color-primary-hover: oklch(49% 60% 30deg);

  &[data-theme='dark'] {
    --color-primary: oklch(62% 55% 30deg);
    --color-primary-hover: oklch(56% 55% 30deg);
  }
}
```

For quick scoped overrides (e.g. a marketing section with different radius), CSS custom properties
also accept inline overrides:

```css
.marketing-section {
  --radius-md: 12px;
}
```

---

## 5. Design Token Reference

### Colors (semantic — use these, not raw OKLCH values)

| Token | Usage |
|---|---|
| `--color-bg` | Page background |
| `--color-bg-subtle` | Recessed surfaces (sidebars, inputs) |
| `--color-bg-elevated` | Cards, popovers, dropdowns |
| `--color-fg` | Primary text |
| `--color-fg-muted` | Secondary text |
| `--color-fg-subtle` | Placeholder, disabled text |
| `--color-border` | Default borders |
| `--color-border-strong` | Emphasized borders |
| `--color-primary` | Brand action color |
| `--color-primary-hover` | Hover state for primary |
| `--color-primary-fg` | Text on primary backgrounds |
| `--color-danger` | Destructive actions |
| `--color-success` | Positive feedback |
| `--color-warning` | Cautionary feedback |
| `--color-icon` | Default icon fill |
| `--color-hover` | Hover overlay (subtle) |
| `--color-disabled-bg` | Disabled control background |
| `--color-disabled-fg` | Disabled control text |

A gray scale `--color-gray-50` → `--color-gray-950` is available for custom surfaces.

### Typography

| Token | Value |
|---|---|
| `--font-sans` | Geist, Heebo, sans-serif |
| `--font-mono` | Geist Mono, monospace |
| `--font-size-xs/sm/base/lg/xl/2xl/3xl/4xl` | 12px → 36px |
| `--font-weight-normal/medium/semibold/bold` | 400 / 500 / 600 / 700 |

### Spacing (4px scale)

`--space-0` (0) · `--space-px` (1px) · `--space-0-5` (2px) · `--space-1` (4px) · `--space-2` (8px) · `--space-3` (12px) · `--space-4` (16px) · `--space-5` (20px) · `--space-6` (24px) · `--space-8` (32px) · `--space-10` (40px) · `--space-12` (48px) · `--space-16` (64px) · `--space-20` (80px) · `--space-24` (96px)

### Radius

`--radius-sm` (4px) · `--radius-md` (6px) · `--radius-lg` (10px) · `--radius-xl` (16px) · `--radius-full` (9999px)

### Shadows

`--shadow-sm` · `--shadow-md` · `--shadow-lg` · `--shadow-xl` (opacity increases in dark mode)

### Transitions

Durations: `--duration-fast` (150ms) · `--duration-base` (200ms) · `--duration-slow` (300ms)

Easing: `--ease-out-quart` · `--ease-out-cubic` · `--ease-in-out-quart` · `--ease-swift-out` · `--ease-overshoot` · `--ease-anticipate` (and more — see `src/theme/transitions.scss`)

```scss
transition: opacity var(--duration-fast) var(--ease-out-quart);
```

---

## 6. Modifying Installed Components

Since you own the source, edit the files directly in `src/components/<Name>/`:

- **Change styles** → edit `<Name>.module.scss`. Styles live in `@layer primitives` (primitive slots) and `@layer components` (composite wrappers).
- **Change props or behavior** → edit `<Name>.tsx`. This file is the public API.
- **Global style change** → edit the relevant token in `src/theme/colors.scss` (or whichever theme file owns that token) instead of touching individual components.

The internal `primitives.ts` file wires Base UI sub-components to CSS module classes — only reach for it in advanced composition scenarios.

---

## 7. Updating Components

myui components are copy-owned, so "updating" means re-running the shadcn add command — it will
overwrite your local files with the latest registry version. Because you may have made local edits,
the right process is:

**Step 1 — preview the diff before overwriting:**
```bash
pnpm dlx shadcn@latest add @myui/<component-name> --diff
```
This prints what would change without touching any files.

**Step 2 — check the component's CHANGELOG:**
```
src/components/<Name>/CHANGELOG.md
```
Read the entries since your current version to understand what changed and why.

**Step 3 — apply the update:**
```bash
pnpm dlx shadcn@latest add @myui/<component-name>
```
The CLI will warn before overwriting existing files. Review carefully and re-apply any local
customizations that the update would clobber.
