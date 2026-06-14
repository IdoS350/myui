# Updating myui Components Without Losing Your Changes

Since myui components are **copy-owned** (installed into your project via the shadcn CLI), you can update them while preserving your customizations. Here's how:

## The Update Process

Re-run the add command for the component:

```bash
pnpm dlx shadcn@latest add @myui/button
```

The shadcn CLI will warn you that the component files already exist and will show you what would be overwritten. **Review the diff carefully** — this is where you decide which changes to keep.

## Handling Your Customizations

When you run the update command, you have a few options:

### Option 1: Accept the Update and Re-apply Your Changes
If you accept the overwrite, your customizations will be lost temporarily. You can then re-apply them manually:

1. Accept the update from the CLI
2. Open `src/components/Button/Button.module.scss`
3. Re-add your rounded corners and padding customizations:
   ```scss
   .root {
     border-radius: var(--radius-lg); /* Or your custom value */
     padding: var(--space-3) var(--space-4); /* Your custom padding */
   }
   ```

### Option 2: Manual Merge
If you want more control, decline the overwrite and manually merge the changes:

1. Decline the overwrite when prompted
2. Compare the old version with the new one (you can use `git diff` or a visual diff tool)
3. Apply the relevant updates from the new version while keeping your customizations
4. Pay special attention to any behavior changes in `Button.tsx` that might affect your app

### Option 3: Use CSS Overrides Instead
If you haven't already, consider moving your Button customizations to CSS overrides instead of editing the component directly:

```css
/* In your app stylesheet */
.myCustomButton {
  border-radius: 16px;
  padding: 12px 16px;
}
```

Then import and apply the class to your Button:

```tsx
import { ButtonRoot } from '@/components/Button/Button'
import styles from './MyComponent.module.scss'

export function MyComponent() {
  return <ButtonRoot className={styles.myCustomButton}>Click me</ButtonRoot>
}
```

This approach makes future updates seamless — the component source stays pristine, and your customizations live in your own CSS layer.

## Key Principles

- **You own the source files** — feel free to modify them directly in `src/components/`
- **Updates are optional** — you don't have to update immediately; stay on the version that works for you
- **Always review diffs** — the CLI warning is there to help you spot breaking changes or behavioral updates
- **CSS tokens over inline styles** — use the design system tokens (like `--radius-lg`, `--space-3`) so future theme changes still apply to your customizations

For more details on customizing components, see the full guide on modifying installed components in the myui reference.
