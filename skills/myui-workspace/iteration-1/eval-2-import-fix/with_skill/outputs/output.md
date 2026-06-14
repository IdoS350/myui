# Import Fix for myui Select

I found the issue! According to myui conventions, you should **never import directly from `primitives.ts`** — that file is internal to the component. Instead, always import from the component file itself.

## The Fix

Change your import from:
```tsx
import { SelectRoot } from '@/components/Select/primitives'
```

To:
```tsx
import { SelectRoot, SelectTrigger, SelectList, SelectItem } from '@/components/Select/Select'
```

## Why This Matters

1. **Correct encapsulation** — `primitives.ts` is an internal implementation detail that wires Base UI components to CSS modules. It's not part of the public API.

2. **Relative import linting** — If your linter is flagging a relative import like `../../components/Select/primitives`, that's a second issue. The `@/` alias is **required** for all cross-directory imports in myui projects (it's a shadcn prerequisite). Never use `../` — use `@/components/Select/Select` instead.

3. **Stability** — The component file (`Select.tsx`) is your public API and is safe to depend on. The internal structure of `primitives.ts` may change without notice.

## Full Example

Here's how to properly use Select:

```tsx
import { SelectRoot, SelectTrigger, SelectList, SelectItem } from '@/components/Select/Select'

export function MyComponent() {
  return (
    <SelectRoot>
      <SelectTrigger placeholder="Choose an option…" />
      <SelectList>
        <SelectItem value="option-a">Option A</SelectItem>
        <SelectItem value="option-b">Option B</SelectItem>
      </SelectList>
    </SelectRoot>
  )
}
```

That's it! Your linter should be happy now, and you're following myui import conventions correctly.
