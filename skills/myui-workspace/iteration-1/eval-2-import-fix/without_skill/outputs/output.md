# Import Fix for Select Component

## Problem

Your linter is flagging a relative import issue because you're using relative paths (`../Select/Select`) instead of the `@/` alias for cross-directory imports. Additionally, if you were importing directly from the `primitives.ts` file (which is an internal implementation detail), that would also violate the project conventions.

## Root Cause

According to your project's `CLAUDE.md` guidelines:

1. **Never import from `primitives.ts`** — The `primitives.ts` file is an internal implementation detail. You should only import the public component from `ComponentName.tsx`.

2. **Always use `@/` alias for cross-directory imports** — Relative imports like `../Select/Select` are banned by ESLint and break shadcn installs. The `@/` alias is a standard shadcn requirement that maps to `src/*`.

## Solution

### For the Toolbar.stories.tsx file (line 21):

**Before:**
```ts
import { SelectItem, SelectList, SelectRoot, SelectTrigger } from '../Select/Select'
```

**After:**
```ts
import { SelectItem, SelectList, SelectRoot, SelectTrigger } from '@/components/Select/Select'
```

### Import Guidelines Summary

- ✅ **Correct:** `import { SelectRoot } from '@/components/Select/Select'`
- ✅ **Correct (same directory):** `import Primitives from './primitives'`
- ❌ **Wrong:** `import { SelectRoot } from '../Select/Select'`
- ❌ **Wrong:** `import Primitives from '@/components/Select/primitives'`

## Why This Matters

1. **Consistency** — The `@/` alias is used throughout the codebase for cross-directory imports
2. **Tooling** — ESLint is configured to ban relative `../` imports to maintain consistency
3. **Architecture** — Exposing `primitives.ts` would allow consumers to misuse internal implementation details; the public API is the component file only

## Additional Notes

I found that your project has multiple story files using relative imports in the same way. While this task focuses on the Select import, you may want to systematically update all relative imports in your components directory to use the `@/` alias for full consistency. The affected files are:

- `Toolbar.stories.tsx` — line 19-23
- `Kbd.stories.tsx` — multiple imports
- `Drawer.stories.tsx` — multiple imports
- `Empty.stories.tsx` — multiple imports
- `ToggleGroup.stories.tsx` — line with Toggle import
- `Toast.stories.tsx` — line with Button import
- `Dialog.stories.tsx` — multiple imports
- `Steps.stories.tsx` — line with Button import
- `Fieldset.stories.tsx` — line with Field imports
- `AlertDialog.stories.tsx` — line with Button import

Consider running a global find-and-replace to update all `from '../` imports to use `@/components/` instead.
