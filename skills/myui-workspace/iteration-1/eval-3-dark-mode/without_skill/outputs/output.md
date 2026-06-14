# Setting Up Dark/Light Mode Toggle in MyUI

Great news! Your myui app **already has a complete theme system in place**. You just need to wrap your app with the `ThemeProvider` and create a toggle button. Here's how to do it:

## 1. Wrap Your App with ThemeProvider

Edit your `src/main.tsx` to wrap your app with the `ThemeProvider`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './theme/useTheme'
import './theme/main.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

The `ThemeProvider` accepts an optional `defaultTheme` prop:
- `'light'` - Always light mode
- `'dark'` - Always dark mode
- `'system'` (default) - Respects the OS preference

## 2. Create a Theme Toggle Button Component

Create a new component at `src/components/ThemeToggle/ThemeToggle.tsx`:

```tsx
import { useTheme } from '@/theme/useTheme'
import { Button } from '@/components/Button/Button'

export function ThemeToggle() {
  const { theme, setTheme, resolved } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        // Cycle through: system → light → dark → system
        if (theme === 'system') {
          setTheme(resolved === 'dark' ? 'light' : 'dark')
        } else if (theme === 'light') {
          setTheme('dark')
        } else {
          setTheme('system')
        }
      }}
      title={`Theme: ${theme}${theme === 'system' ? ` (${resolved})` : ''}`}
    >
      {resolved === 'dark' ? '🌙' : '☀️'}
    </Button>
  )
}
```

Or, if you prefer a simpler toggle that just switches light/dark:

```tsx
import { useTheme } from '@/theme/useTheme'
import { Button } from '@/components/Button/Button'

export function ThemeToggle() {
  const { resolved, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}
      title={`Switch to ${resolved === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolved === 'dark' ? '🌙' : '☀️'}
    </Button>
  )
}
```

## 3. Use the Toggle in Your App

Add the `ThemeToggle` to your app layout (header, navbar, etc.):

```tsx
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'

export function App() {
  return (
    <div>
      <header>
        <h1>My App</h1>
        <ThemeToggle />
      </header>
      {/* Your app content */}
    </div>
  )
}
```

## How It Works

### The Theme System (Already in Place)

Your `src/theme/useTheme.tsx` provides:

- **`ThemeProvider`**: Wraps your app and manages theme state
  - Persists theme preference to `localStorage` (key: `'sp-theme'`)
  - Listens for OS theme preference changes
  - Sets `data-theme` attribute on `<html>` element

- **`useTheme()` hook**: Returns:
  - `theme` - Current setting (`'light'`, `'dark'`, or `'system'`)
  - `setTheme(theme)` - Updates the theme setting
  - `resolved` - The actual theme being applied (`'light'` or `'dark'`)

### CSS Custom Properties

Your theme colors automatically switch based on `[data-theme='dark']` on the `<html>` element. All colors are defined in `src/theme/colors.scss` using OKLCH color space:

- Light mode (default): Bright backgrounds, dark text
- Dark mode: Dark backgrounds, bright text

The system is already fully implemented — colors, spacing, typography, all respond to the theme.

## 4. (Optional) Create a Stories File

If you want to develop the toggle component in Storybook, create `src/components/ThemeToggle/ThemeToggle.stories.tsx`:

```tsx
import { Meta, StoryObj } from '@ladle/react'
import { ThemeToggle } from './ThemeToggle'
import { ThemeProvider } from '@/theme/useTheme'

const meta = {
  title: 'Inputs/ThemeToggle',
  component: ThemeToggle,
  decorators: [(Story) => <ThemeProvider>{<Story />}</ThemeProvider>],
} satisfies Meta<typeof ThemeToggle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
```

Then run `pnpm storybook` to see it in action.

## 5. Styling (Optional)

If you want to customize the toggle button's appearance, create `src/components/ThemeToggle/ThemeToggle.module.scss`:

```scss
@layer components {
  .toggle {
    transition: background-color var(--transition-duration-fast);
  }
}
```

Then import and apply it:

```tsx
import styles from './ThemeToggle.module.scss'

// In the Button:
<Button className={styles.toggle} ...>
```

## Complete Working Example

Here's a minimal working setup:

**src/main.tsx:**
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './theme/useTheme'
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle'
import './theme/main.scss'

function App() {
  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <h1>MyUI App</h1>
        <ThemeToggle />
      </header>
      <main style={{ padding: '2rem' }}>
        {/* Your app content */}
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

## Key Files to Know

- **`src/theme/useTheme.tsx`** - The `ThemeProvider` and `useTheme()` hook (already implemented)
- **`src/theme/colors.scss`** - All color tokens with light/dark variants
- **`src/theme/main.scss`** - CSS layers and global styles that apply the theme
- **`src/components/Button/Button.tsx`** - Button component (good for your toggle)

## Tips

1. **Use the `resolved` value** when you want to know the actual applied theme (accounts for 'system' preference)
2. **Use the `theme` value** when you want to know what the user explicitly selected
3. **Theme preference persists** — it's saved to `localStorage` and restored on page reload
4. **System preference changes** are detected and applied in real-time
5. **All CSS custom properties** are theme-aware, so just use `var(--color-bg)`, `var(--color-fg)`, etc.

That's it! You now have a complete dark/light mode system with persistence and system preference support.
