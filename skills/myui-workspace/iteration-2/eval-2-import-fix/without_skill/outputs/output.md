# Fixing your myui Select Import

There are two issues to fix: importing from `primitives.ts` instead of the public component file, and using a relative path instead of the `@/` alias.

## The Fix

Change your import from:
```tsx
// ❌ Wrong — primitives is internal, relative path banned by ESLint
import { SelectRoot } from '../components/Select/primitives'
```

To:
```tsx
// ✅ Correct — public API, @/ alias
import { SelectRoot, SelectTrigger, SelectList, SelectItem } from '@/components/Select/Select'
```

## Why

The `primitives.ts` file is an internal implementation file that wires Base UI sub-components to CSS class names. It's not meant to be part of the public API and its exports may change without warning.

The `@/` alias is required for all cross-directory imports in myui (and shadcn projects in general). Relative `../` paths are banned by ESLint because they break when components are installed into different directory depths.

## Full Usage Example

```tsx
import { SelectRoot, SelectTrigger, SelectList, SelectItem } from '@/components/Select/Select'

function MyComponent() {
  return (
    <SelectRoot>
      <SelectTrigger placeholder="Choose an option" />
      <SelectList>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectList>
    </SelectRoot>
  )
}
```

Always import from `ComponentName.tsx` (e.g., `Select/Select`, `Button/Button`) — that's the stable public API surface.
