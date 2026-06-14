# Dark/Light Mode Toggle Setup Guide

## Overview

The myui app uses a ThemeProvider component with the `useTheme()` hook to manage dark/light mode. Dark mode is applied by setting `data-theme="dark"` on the document root, and user preference is persisted to localStorage under the `sp-theme` key.

## Step 1: Wrap Your App with ThemeProvider

The `ThemeProvider` component should wrap your entire application at the root level. This ensures the theme context is available throughout your app.

```tsx
import { ThemeProvider } from '@/theme/useTheme'

export default function App() {
  return (
    <ThemeProvider>
      {/* Your app content here */}
    </ThemeProvider>
  )
}
```

Typically, this goes in your root layout or main app file (e.g., `src/App.tsx` or `src/layout/RootLayout.tsx`).

## Step 2: Create a Theme Toggle Button Component

Use the `useTheme()` hook in a toggle button component to read and update the theme:

```tsx
import { useTheme } from '@/theme/useTheme'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
```

## Step 3: Place the Toggle in Your UI

Add the toggle button to a visible location, such as a header or settings panel:

```tsx
import { ThemeToggle } from '@/components/ThemeToggle'

export function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle />
    </header>
  )
}
```

## How It Works

1. **ThemeProvider**: Initializes the theme context and manages state
   - Reads the stored preference from localStorage (`sp-theme`)
   - Falls back to system preference if no stored preference exists
   - Sets `data-theme` attribute on `document.documentElement`

2. **useTheme Hook**: Provides access to theme state and controls
   - `theme`: Current theme ('light' or 'dark')
   - `setTheme(value)`: Updates theme and persists to localStorage
   - `resolved`: The resolved theme value (useful if you need the actual computed value)

3. **localStorage Persistence**: Theme preference is automatically saved and restored across sessions

4. **CSS Integration**: Your theme tokens (colors, spacing, etc.) should use `[data-theme='dark']` selectors to apply dark mode styles:
   ```scss
   // src/theme/_variables.scss or similar
   :root {
     --color-bg: #ffffff;
     --color-fg: #000000;
   }

   [data-theme='dark'] {
     --color-bg: #1a1a1a;
     --color-fg: #ffffff;
   }
   ```

## Advanced: useTheme Return Values

The `useTheme()` hook returns an object with:

```ts
{
  theme: 'light' | 'dark',      // Current user-selected theme
  setTheme: (value: string) => void,  // Function to change theme
  resolved: 'light' | 'dark'    // The computed theme (accounts for system preference if theme is 'system')
}
```

## Best Practices

1. **Accessibility**: Always include `aria-label` on toggle buttons to describe the action
2. **Visual Feedback**: Show the current theme state clearly (e.g., with icons or text)
3. **System Preference**: Consider respecting system preference as a default before the user manually toggles
4. **Loading State**: If your app has async initialization, ensure ThemeProvider is ready before rendering content
5. **CSS Variables**: Use CSS custom properties (`var(--...)`) for all theme-dependent styles, not hardcoded colors

## Example: Complete Setup

Here's a complete minimal example:

**App.tsx**
```tsx
import { ThemeProvider } from '@/theme/useTheme'
import { Header } from './Header'
import { MainContent } from './MainContent'

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
    </ThemeProvider>
  )
}
```

**Header.tsx**
```tsx
import { useTheme } from '@/theme/useTheme'

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header>
      <h1>My App</h1>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  )
}
```

## Troubleshooting

- **Theme not persisting**: Check that localStorage is accessible and not disabled
- **Flash of wrong theme**: Ensure ThemeProvider wraps your entire app and initializes before rendering
- **Styles not updating**: Verify that your CSS uses `[data-theme='dark']` selectors or CSS variables that are updated by the theme system
- **Hook returning undefined**: Make sure the component using `useTheme()` is rendered inside the `ThemeProvider`
