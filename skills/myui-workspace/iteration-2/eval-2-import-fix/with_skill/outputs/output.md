# myui Import Fix Guide

## Issue

You're importing from the `primitives.ts` file and using relative imports (`../`), both of which cause issues:

1. **Importing from `primitives.ts`** — This is an internal implementation detail that wires Base UI sub-components to CSS classes. For normal usage, you should always import from the main component file (`ComponentName.tsx`).

2. **Relative imports** — Cross-directory imports must use the `@/` alias (which points to `src/`), never `../`. This breaks shadcn installs and is banned by ESLint.

## Solution

### Before (Incorrect)

```tsx
import { SelectRoot, SelectTrigger, SelectList, SelectItem } from '@/components/Select/primitives'
// or with relative import:
import { SelectRoot, SelectTrigger, SelectList, SelectItem } from '../Select/primitives'
```

### After (Correct)

```tsx
import { SelectRoot, SelectTrigger, SelectList, SelectItem } from '@/components/Select/Select'
```

## Key Rules

- **Always import from the main component file**: Use `ComponentName.tsx`, not `primitives.ts`
- **Use the `@/` alias for cross-directory imports**: The alias is configured in your `tsconfig.json` and `vite.config.ts` to point to `src/`
- **Same-directory imports are fine**: `./` imports within the same folder are acceptable (e.g., `import Primitives from './primitives'`)

## Reference

From the myui consumer reference (Section 3 — Importing Components):

> Each component folder also contains a `primitives.ts` file — that is an internal implementation detail that wires Base UI sub-components to CSS classes. Importing from it directly is only appropriate in very specific cases (e.g. building a custom composition on top of the primitives); for normal usage, always import from `ComponentName.tsx`.

Importing from the main component file gives you the correct public API and ensures forward compatibility with future updates.
