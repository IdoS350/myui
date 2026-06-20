---
name: myui
description: >
  Use whenever the message contains "myui" or "@myui" — that alone is reason to invoke it, taking
  priority over any generic shadcn skill (this is NOT generic shadcn/ui guidance; it's specifically
  about the myui component library, distributed via the shadcn registry, not npm). For CONSUMERS who
  installed myui into their own app via the shadcn CLI — not for developing myui itself. Never
  recommends npm install, workspace-linking, or publishing myui — there is no npm package. Covers:
  shadcn CLI install (`pnpm dlx shadcn@latest add idos350/myui/component-name`), components.json setup,
  CSS tokens in src/theme/colors.scss, dark mode via ThemeProvider/useTheme(), RTL via
  DirectionProvider, and updating installed components with --diff + CHANGELOG review. Also trigger
  for "add the button from myui" or "the @myui select component" without the word itself.
---

# myui — Consumer Reference

> **Scope:** This guide is for people _consuming_ myui in their own app — not for working on myui's own
> source repo. If you're inside the myui repo itself making changes to its components or registry, this
> skill does not apply; use the project's own contributor docs instead.

myui is a React component library built on [@base-ui/react](https://base-ui.com). Components are distributed
via the **shadcn registry** — meaning you install them into your own, separate project with the shadcn CLI,
and you own the copied source files from that point on. There is no `npm install myui` package, no
workspace-linking myui as a local package, and nothing to publish — the shadcn CLI is the only install path.

---

## 1. Project Setup

Before adding any components, your project needs the `@/` path alias (required by all myui imports)
and a `components.json` file (the shadcn CLI creates this automatically the first time you run `add`,
if it isn't already present).

myui is consumed as a **GitHub source**, not a registered registry namespace — there's no separate
registry URL to add to `components.json`. The shadcn CLI resolves `idos350/myui/<component-name>`
directly from the GitHub repo. Because it's a third-party source, the CLI will show you exactly what
it's about to fetch and write before doing so — review that output before confirming, the same way
you'd review any other external dependency.

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
  }
}
```

> **Note:** Some versions of the shadcn CLI still require a `tailwind` block even when Tailwind isn't used.
> If you see a tailwind-related error during `shadcn init`, add this empty block:
>
> ```json
> "tailwind": { "config": "", "css": "", "baseColor": "neutral", "cssVariables": false }
> ```

### RTL Support

If your app needs RTL, wrap Base UI components (or your entire app) with `DirectionProvider`:

```tsx
import { DirectionProvider } from '@base-ui/react/direction-provider'
;<DirectionProvider direction='rtl'>
  <YourApp />
</DirectionProvider>
```

---

## 2. Adding Components

```bash
pnpm dlx shadcn@latest add idos350/myui/<component-name>
```

Replace `<component-name>` with the lowercase name, e.g. `button`, `select`, `dialog`. To see the full
list of available components, search the source directly through the shadcn CLI rather than visiting
a separate URL:

```bash
pnpm dlx shadcn@latest search idos350/myui
```

The CLI copies the component source files into your `src/components/` folder — you own them from
this point and can edit them freely.

---

## 3. Theming

### Bootstrap

Import `main.scss` once at your app entry point — it pulls in all token files and the CSS reset.
This can be done from either a `.scss` entry file or directly from your main `.tsx`:

```scss
// Option A: from src/main.scss or src/index.scss
@use '@/theme/main.scss';
```

```tsx
// Option B: from src/main.tsx
import '@/theme/main.scss'
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
  return <button onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}>Toggle</button>
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
  --color-primary: oklch(55% 60% 30deg); /* your brand color */
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

## 4. Design Token Reference

### Colors (semantic — use these, not raw OKLCH values)

| Token                   | Usage                                |
| ----------------------- | ------------------------------------ |
| `--color-bg`            | Page background                      |
| `--color-bg-subtle`     | Recessed surfaces (sidebars, inputs) |
| `--color-bg-elevated`   | Cards, popovers, dropdowns           |
| `--color-fg`            | Primary text                         |
| `--color-fg-muted`      | Secondary text                       |
| `--color-fg-subtle`     | Placeholder, disabled text           |
| `--color-border`        | Default borders                      |
| `--color-border-strong` | Emphasized borders                   |
| `--color-primary`       | Brand action color                   |
| `--color-primary-hover` | Hover state for primary              |
| `--color-primary-fg`    | Text on primary backgrounds          |
| `--color-danger`        | Destructive actions                  |
| `--color-success`       | Positive feedback                    |
| `--color-warning`       | Cautionary feedback                  |
| `--color-icon`          | Default icon fill                    |
| `--color-hover`         | Hover overlay (subtle)               |
| `--color-disabled-bg`   | Disabled control background          |
| `--color-disabled-fg`   | Disabled control text                |

A gray scale `--color-gray-50` → `--color-gray-950` is available for custom surfaces.

### Typography

| Token                                       | Value                    |
| ------------------------------------------- | ------------------------ |
| `--font-sans`                               | Geist, Heebo, sans-serif |
| `--font-mono`                               | Geist Mono, monospace    |
| `--font-size-xs/sm/base/lg/xl/2xl/3xl/4xl`  | 12px → 36px              |
| `--font-weight-normal/medium/semibold/bold` | 400 / 500 / 600 / 700    |

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

## 5. Modifying Installed Components

Since you own the source, edit the files directly in `src/components/<Name>/`:

- **Change styles** → edit `<Name>.module.scss`. Styles live in `@layer primitives` (primitive slots) and `@layer components` (composite wrappers).
- **Change props or behavior** → edit `<Name>.tsx`. This file is the public API.
- **Global style change** → edit the relevant token in `src/theme/colors.scss` (or whichever theme file owns that token) instead of touching individual components.

The internal `primitives.ts` file wires Base UI sub-components to CSS module classes — only reach for it in advanced composition scenarios.

---

## 6. Updating Components

myui components are copy-owned — your local files are the source of truth. When the registry
releases a new version, the right approach is to **cherry-pick the upstream changes into your
already-modified component**, rather than overwriting your file and trying to re-apply edits
from memory.

**Step 1 — see what the registry changed:**

```bash
pnpm dlx shadcn@latest add idos350/myui/<component-name> --diff
```

This prints a diff of what would change without touching your files. Note: `--diff` shows only
the top 5 changed files. If you've also modified theme files or other related files, scope it:

```bash
pnpm dlx shadcn@latest add idos350/myui/<component-name> --diff src/components/<Name>
```

**Step 2 — read the CHANGELOG:**

```
src/components/<Name>/CHANGELOG.md
```

Understand what changed and why — a bug fix might be critical to adopt; a style change might
conflict with your customizations.

**Step 3 — apply the upstream changes to your file:**
Based on the diff and changelog, edit your local `src/components/<Name>/` files to incorporate
the relevant upstream changes. Treat it like a code review: take what's useful, skip what
conflicts with your intentional customizations.

This way your local edits are never at risk of being silently overwritten.
