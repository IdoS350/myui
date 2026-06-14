# Setting Up myui in Your Vite + React + TypeScript App

Great choice! Here's the complete walkthrough to get myui up and running, from path aliases to your first component.

---

## Step 1: Configure Path Aliases

myui components rely on the `@/` path alias for imports, and it's a standard shadcn prerequisite. You need to wire this up in both TypeScript and Vite.

### 1.1 Update `tsconfig.json`

Add the `paths` compiler option:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 1.2 Update `vite.config.ts`

Add the alias resolver:

```ts
import path from 'path'

export default {
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
}
```

---

## Step 2: Register the myui Registry

The shadcn CLI uses registries to fetch component definitions. Add the myui registry to your `components.json`:

```json
{
  "registries": {
    "@myui": "https://idos350.github.io/myui/r/{name}.json"
  }
}
```

If you don't have a `components.json` yet, create one at your project root with at least this content.

---

## Step 3: Install the Select Component

Now you're ready to install components. Use the shadcn CLI with the `@myui/` prefix:

```bash
pnpm dlx shadcn@latest add @myui/select
```

The CLI will:
- Fetch the component definition from the myui registry
- Copy the source files into your `src/components/Select/` folder
- You now own these files and can edit them freely

---

## Step 4: Import and Use Select

Import directly from the component file—there are no barrel `index.ts` files. Always use the `@/` alias for cross-directory imports:

```tsx
import { SelectRoot, SelectTrigger, SelectList, SelectItem } from '@/components/Select/Select'

export function MyComponent() {
  return (
    <SelectRoot>
      <SelectTrigger placeholder="Choose an option…" />
      <SelectList>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectList>
    </SelectRoot>
  )
}
```

---

## Step 5: Set Up Theming (Optional but Recommended)

### 5.1 Bootstrap the Theme

Import the main theme file at your app entry point. This pulls in all tokens and the CSS reset:

```scss
// src/main.scss or wherever you import styles
@use '@/theme/main.scss';
```

Then import this in your app's JavaScript entry point (e.g., `src/main.tsx`):

```tsx
import './main.scss'
import App from './App'
```

### 5.2 Wrap with ThemeProvider

Wrap your app to enable dark mode and system preference detection:

```tsx
import { ThemeProvider } from '@/theme/useTheme'

function App() {
  return (
    <ThemeProvider>
      {/* Your app here */}
    </ThemeProvider>
  )
}
```

That's it! Your components will now respond to system dark mode and respect the `data-theme` attribute on `document.documentElement`.

---

## Available Components

myui ships with a comprehensive set of components built on [@base-ui/react](https://base-ui.com):

Accordion, Alert, AlertDialog, Avatar, Badge, Button, Calendar, Checkbox, CheckboxGroup, Chip, Collapsible, Combobox, CommandCopy, DataTable, DateInput, DatePicker, Dialog, Drawer, Empty, Field, Fieldset, Input, Kbd, Menu, Meter, NumberField, Pagination, Popover, Progress, Radio, ScrollArea, **Select**, Separator, Skeleton, Slider, Spinner, Steps, Switch, Tabs, Textarea, Toast, Toggle, ToggleGroup, Toolbar, Tooltip

Install any of them the same way:

```bash
pnpm dlx shadcn@latest add @myui/<component-name>
```

---

## Key Points to Remember

- **Never import from `primitives.ts`** — that file is internal to each component
- **Always use `@/` for cross-directory imports** — never `../` (breaks shadcn installs)
- **Same-directory imports with `./` are fine** — and preferred when possible
- **You own the source files** — copy them into `src/components/` and edit them freely
- **All styling uses CSS custom properties** — override tokens in your own CSS for custom theming

Happy building!
