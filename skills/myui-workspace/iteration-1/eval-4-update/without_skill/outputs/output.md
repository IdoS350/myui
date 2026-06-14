# Updating Button Component While Preserving Customizations

Great question! The good news is that **your customizations and myui's updates are designed to coexist**. Here's how:

## Understanding the Architecture

Your Button component is split into two layers:

1. **`Button.tsx`** — The public API (what consumers import and use)
2. **`Button.module.scss`** — Your styling layer where customizations live

The underlying `@base-ui/react/button` (the upstream library) handles the HTML structure and behaviors, while your `.module.scss` file contains your design decisions (rounded corners, padding, colors, etc.).

## The Key Principle

When myui releases a new version of Button, the update affects:
- The TypeScript component structure (`Button.tsx`)
- Possibly new props, variants, or slots
- New base styles or interactions

But **your custom styles in `Button.module.scss` are completely separate**. They're scoped to your `.button` class and override base defaults through CSS specificity and the `@layer components` rule.

## How to Update Safely

### Step 1: Check What Changed
When you hear about a new Button version, review the myui changelog or diff to see what's new. Common updates include:
- New variants (e.g., `variant="outline"`)
- New sizes
- New props or accessibility features
- Bug fixes to base behaviors

### Step 2: Update Button.tsx
Pull the latest changes into `src/components/Button/Button.tsx`:

```bash
# If myui is a git submodule or separate repo:
git pull origin main  # or whatever your update method is

# Or manually merge in the new Button.tsx, keeping your custom props
```

The changes are usually additive (new props, new variants). If there's a breaking change, myui should document it.

**Your customizations survive because:**
- You're wrapping the Base UI component with your own exported `Button` function
- You control the `className` — you pass `styles.button` which applies your scoped styles
- CSS cascade means your rules in `.module.scss` override Base UI's default theming

### Step 3: Review Your Styles
After updating `Button.tsx`, check if any new variants or sizes need custom styling:

1. **Run Storybook** to see the new variants:
   ```bash
   pnpm storybook
   ```

2. **Add rules for new variants/sizes** to `Button.module.scss` if needed. For example, if a new `outline` variant was added:
   ```scss
   &[data-variant='outline'] {
     background: transparent;
     color: var(--color-primary);
     border-color: var(--color-primary);
     
     &:hover:not(:disabled) {
       background: var(--color-primary-light);
     }
   }
   ```

3. **Verify your customizations still apply** — rounded corners and padding come from the `.button` class rules, which are inherited by all variants.

### Step 4: Update the Changelog
Before running `pnpm registry:generate`, update `src/components/Button/CHANGELOG.md`:

```markdown
## [1.1.0] - 2025-06-12

### Changed

- Updated to latest Base UI Button version — supports new `outline` variant in `Button.tsx`
- Added custom styles for `outline` variant in `Button.module.scss`

## [1.0.0] - 2025-01-01

### Added

- Initial Button component with custom rounded corners and padding
```

### Step 5: Test & Format
```bash
pnpm format    # Auto-format your changes
pnpm storybook # Visually verify all variants still look correct
```

## What If There's a Breaking Change?

If myui's update includes a breaking change (e.g., changing how props work):

1. The change will be in `Button.tsx` — you'll need to update your component's TypeScript interface
2. Your SCSS styles are **unaffected** — CSS doesn't care about the breaking change
3. You may need to add new CSS rules if the DOM structure changed (new slots, different data attributes)

Example: If the variant system changed from `data-variant` to `className`:
```tsx
// Old
<BaseButton data-variant={variant} className={clsx(styles.button, className)} />

// New
<BaseButton className={clsx(styles.button, styles[variant], className)} />
```

Then update your SCSS to use class selectors instead:
```scss
// Old
&[data-variant='primary'] { }

// New
.button.primary { }
```

## Quick Checklist for Updates

- [ ] Pull latest Button.tsx from myui
- [ ] Check myui's CHANGELOG for breaking changes
- [ ] Run Storybook to see all variants
- [ ] If new variants exist, add corresponding styles to Button.module.scss
- [ ] Verify rounded corners and padding still apply
- [ ] Update src/components/Button/CHANGELOG.md with changes
- [ ] Run `pnpm format`
- [ ] Run `pnpm registry:generate`
- [ ] Test in your app to confirm everything works

## The Bottom Line

Your customizations live in CSS, not in the component logic. As long as you keep your styles in `Button.module.scss` and only update the TypeScript layer, **your design changes persist across updates**. This separation of concerns is exactly why the myui architecture uses the primitives + component pattern — it lets you customize without fighting upstream changes.
