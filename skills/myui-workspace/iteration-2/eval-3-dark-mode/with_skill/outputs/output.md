# Adding Dark/Light Mode Toggle to Your myui App

The myui library makes dark mode setup straightforward through the `ThemeProvider` and `useTheme()` hook. Here's the complete walkthrough.

---

## Step 1: Import the Theme Styles

At your app entry point (typically `src/main.scss` or `src/index.scss`), import the main theme file to load all CSS tokens and the reset:

```scss
@use '@/theme/main.scss';
```

This one import brings in all color tokens, typography scales, spacing, shadows, and transitions defined in myui.

---

## Step 2: Wrap Your App with ThemeProvider

Import `ThemeProvider` from the theme module and wrap your entire app:

```tsx
import { ThemeProvider } from '@/theme/useTheme'

function App() {
  return (
    <ThemeProvider>
      <YourAppContent />
    </ThemeProvider>
  )
}
```

The `ThemeProvider` handles:
- Detecting system color scheme preference (via `prefers-color-scheme`)
- Persisting user preference to `localStorage` under the key `sp-theme`
- Applying the theme by setting `data-theme="dark"` on `document.documentElement`

---

## Step 3: Create a Toggle Button

Use the `useTheme()` hook in any component to read the current theme and create a toggle:

```tsx
import { useTheme } from '@/theme/useTheme'

function ThemeToggle() {
  const { theme, setTheme, resolved } = useTheme()
  
  return (
    <button onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}>
      {resolved === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
```

### Understanding the `useTheme()` Return Values

- **`theme`** — The stored preference: `'light'` | `'dark'` | `'system'`
  - Use this if you need to distinguish between an explicit choice and system default
  
- **`resolved`** — The actual applied theme: `'light'` | `'dark'`
  - Use this for UI decisions (e.g., which icon to show)
  
- **`setTheme(value)`** — Update the theme
  - Pass `'light'`, `'dark'`, or `'system'` to set a new preference

---

## Example: Complete Integration

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/theme/useTheme'
import App from './App'
import '@/theme/main.scss' // Load all theme tokens

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
```

```tsx
// src/components/Header/Header.tsx
import { useTheme } from '@/theme/useTheme'

export function Header() {
  const { resolved, setTheme } = useTheme()
  
  return (
    <header>
      <h1>My App</h1>
      <button
        onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}
        title={`Switch to ${resolved === 'dark' ? 'light' : 'dark'} mode`}
      >
        {resolved === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  )
}
```

---

## How Dark Mode Works Under the Hood

myui colors are defined in OKLCH format in `src/theme/colors.scss` with automatic dark mode variants:

```scss
:root {
  --color-primary: oklch(55% 60% 30deg);       /* light mode */
  --color-primary-hover: oklch(49% 60% 30deg);

  &[data-theme='dark'] {
    --color-primary: oklch(62% 55% 30deg);     /* dark mode */
    --color-primary-hover: oklch(56% 55% 30deg);
  }
}
```

When the theme changes, the `data-theme` attribute on `document.documentElement` automatically updates, causing all CSS custom properties to re-evaluate. Components automatically pick up the new colors — no refetch needed.

---

## Customizing Colors

To change brand colors or semantic tokens for your app, edit `src/theme/colors.scss` directly:

```scss
// src/theme/colors.scss
:root {
  --color-primary: oklch(48% 65% 15deg);           /* your brand blue */
  --color-primary-hover: oklch(42% 65% 15deg);

  &[data-theme='dark'] {
    --color-primary: oklch(65% 55% 15deg);         /* lighter for dark mode */
    --color-primary-hover: oklch(60% 55% 15deg);
  }
}
```

For one-off scoped overrides (e.g., a specific section with different colors), use inline CSS custom properties:

```tsx
<section style={{ '--color-primary': 'oklch(60% 50% 200deg)' } as React.CSSProperties}>
  {/* This section uses a different primary color */}
</section>
```

---

## RTL Support (Optional)

If your app needs right-to-left support, wrap Base UI components with `DirectionProvider`:

```tsx
import { DirectionProvider } from '@base-ui/react/direction-provider'
import { ThemeProvider } from '@/theme/useTheme'

function App() {
  return (
    <DirectionProvider direction="rtl">
      <ThemeProvider>
        <YourApp />
      </ThemeProvider>
    </DirectionProvider>
  )
}
```

---

## Summary

1. **Import theme styles** in your entry point: `@use '@/theme/main.scss'`
2. **Wrap your app** with `<ThemeProvider>`
3. **Read theme state** with `useTheme()` and toggle with `setTheme()`
4. **Customize colors** by editing `src/theme/colors.scss` (OKLCH format)
5. Dark mode is applied via `data-theme="dark"` on the root element; all CSS custom properties automatically adjust

That's it! The theme persists to localStorage and respects system preferences by default.
