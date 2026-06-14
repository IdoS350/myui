# Updating shadcn Components While Preserving Customizations

When you've customized a shadcn component and a new version is released, you have several strategies to update without losing your changes:

## 1. Preview Changes First (Recommended Starting Point)

Use the `--diff` flag to see exactly what changed:

```bash
pnpm dlx shadcn@latest add @myui/button --diff
```

This shows you the differences between your current version and the new release before applying them. Review what's changed to understand if the update conflicts with your customizations.

## 2. Three Update Strategies

### Strategy A: Manual Merge (Most Control)

If you have significant customizations:

1. Keep your current customized `Button.tsx` and `Button.module.scss`
2. Run the update command without overwriting:
   ```bash
   pnpm dlx shadcn@latest add @myui/button
   ```
   When prompted about overwriting, choose **"No"** or skip the overwrite
3. Open both versions side-by-side (your version + the new release)
4. Manually cherry-pick bug fixes and new features from the update into your customized version
5. Test thoroughly to ensure your customizations still work with any underlying API changes

### Strategy B: Accept Update + Re-apply Customizations

If the changes are substantial and you want the latest features:

1. Run the update command and allow it to overwrite:
   ```bash
   pnpm dlx shadcn@latest add @myui/button
   ```
   Answer "Yes" to overwrite
2. The new version replaces your files
3. Re-apply your customizations:
   - For CSS: Add your padding and border-radius changes back to `Button.module.scss`
   - For component logic: Re-apply any prop or rendering changes to `Button.tsx`
4. Test the component in Storybook to verify everything works

### Strategy C: Create a Custom Wrapper Component

For minimal friction on future updates:

1. Keep the shadcn Button unmodified (let updates work smoothly)
2. Create a wrapper component at a different path:
   ```
   src/components/CustomButton/
     CustomButton.tsx      # Wraps Button with your customizations
     CustomButton.module.scss
     CustomButton.stories.tsx
   ```
3. In `CustomButton.tsx`:
   ```tsx
   import { Button, type ButtonProps } from '@/components/Button/Button'
   
   export function CustomButton({ className, ...props }: ButtonProps) {
     return (
       <Button 
         {...props} 
         className={`${className} my-custom-class`}
       />
     )
   }
   ```
4. Your customizations live in CSS/wrapper logic, separate from the base component
5. Future updates to Button don't affect your customizations at all

## 3. Check the CHANGELOG Before Updating

Review `src/components/Button/CHANGELOG.md` to understand:

- What changed in the new version
- If there are breaking API changes
- If the changes conflict with your customizations
- Migration notes if needed

Example sections to look for:
- **Breaking Changes** (major version): API changes you must handle
- **Fixed**: Bug fixes that might affect your styling
- **Added**: New props/features you might want to use
- **Changed**: Behavioral or structural changes

## 4. Version Control Best Practices

Before updating:

```bash
git add .
git commit -m "chore: save current button customizations before update"
```

After updating (whether manual merge or re-apply):

```bash
git diff src/components/Button/
# Review changes
git add src/components/Button/
git commit -m "chore: update Button to v2.1.0"
```

This gives you a clear history of what changed and makes it easy to revert if needed.

## 5. Common Customization Preservation Scenarios

| Customization Type | Best Strategy | Why |
|---|---|---|
| Padding, border-radius, colors | Re-apply to CSS | Easy to re-add, isolated |
| New props or composition | Wrapper component | Decouples from base updates |
| Event handlers or logic | Wrapper component or manual merge | Protects business logic |
| Theme integration | Wrapper component | Survives theming changes |
| Variant additions | Manual merge | Requires understanding base structure |

## Summary

**For your situation (rounded corners + different padding):**

1. **First**: Run `pnpm dlx shadcn@latest add @myui/button --diff` to see what changed
2. **Then choose**:
   - If changes are minimal: **Strategy A** (manual merge keeps your CSS intact)
   - If changes are substantial: **Strategy B** (re-apply your customizations after)
   - If you want zero friction on future updates: **Strategy C** (create a wrapper)
3. **Always**: Review the CHANGELOG.md first to understand the update
4. **Always**: Use git commits to track before/after states

The wrapper component approach (Strategy C) is most maintainable long-term if you expect multiple future updates.
