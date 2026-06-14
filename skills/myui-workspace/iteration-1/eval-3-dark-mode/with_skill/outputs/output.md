# Setting Up Dark/Light Mode Toggle in Your myui App

Great question! Setting up dark mode in myui is straightforward. Here's how to do it:

## Step 1: Bootstrap the Theme Tokens

First, import the main theme file at your app's entry point. This loads all CSS tokens and the reset:

```tsx
// src/main.tsx (or src/index.tsx)
import '@/theme/main.scss'
```

## Step 2: Wrap Your App with ThemeProvider

The `ThemeProvider` component enables dark mode and tracks system preferences. Wrap your entire app with it:

```tsx
import { ThemeProvider } from '@/theme/useTheme'

function App() {
  return (
    <ThemeProvider>
      {/* Your app content goes here */}
    </ThemeProvider>
  )
}

export default App
```

## Step 3: Create a Toggle Button Component

Use the `useTheme()` hook to read the current theme and toggle between light and dark mode:

```tsx
import { useTheme } from '@/theme/useTheme'

export function ThemeToggle() {
  const { theme, setTheme, resolved } = useTheme()
  
  // theme: 'light' | 'dark' | 'system' (stored preference)
  // resolved: 'light' | 'dark' (actual applied value)
  // setTheme: (value: 'light' | 'dark' | 'system') => void

  return (
    <button onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}>
      {resolved === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
```

## How It Works

- **Dark mode** is applied by setting `data-theme="dark"` on `document.documentElement`
- The user's **preference is persisted** to `localStorage` under the key `sp-theme`
- The `resolved` value tells you what's actually applied (accounting for system preferences if set to `'system'`)
- The `theme` value tells you what was explicitly set

## Optional: Support System Preference

If you want to let users choose "Follow system", you can extend the toggle:

```tsx
<button onClick={() => setTheme('system')}>
  Use System Preference
</button>
```

That's it! The ThemeProvider handles all the setup—CSS tokens automatically adjust based on the `data-theme` attribute, so all myui components will automatically respond to theme changes.
