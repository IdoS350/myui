# Updating myui Button Without Losing Customizations

## Quick Answer

Since myui components are copy-owned (you own the source files), updating requires merging your customizations with the new version. Follow this three-step process:

1. **Preview the diff** to see what changed
2. **Check the CHANGELOG** to understand why
3. **Apply the update** and manually re-apply your customizations

---

## The Full Process

### Step 1: Preview the Update

Before overwriting anything, see what changed in the new Button version:

```bash
pnpm dlx shadcn@latest add @myui/button --diff
```

This prints the changes without touching your files. You'll see exactly what was modified in:
- `src/components/Button/Button.tsx` (props/behavior changes)
- `src/components/Button/Button.module.scss` (style changes)
- Other related files

### Step 2: Check the Button CHANGELOG

Open `src/components/Button/CHANGELOG.md` and read the entries since your current version. This tells you:
- What bugs were fixed
- What new features were added
- What styles changed and why

Example:
```markdown
## [1.1.0] - YYYY-MM-DD

### Fixed
- Focus ring no longer bleeds outside border-radius on Safari

### Added
- New `size="lg"` variant

## [1.0.0] - YYYY-MM-DD

### Added
- Initial release
```

Understanding the "why" helps you decide which changes to keep and which to override.

### Step 3: Apply the Update

Run the add command again — the CLI will warn before overwriting:

```bash
pnpm dlx shadcn@latest add @myui/button
```

The warning gives you a chance to back out. If you proceed, the registry version overwrites your local files.

### Step 4: Re-apply Your Customizations

After the update, your custom styles (rounded corners, different padding) are gone. Re-apply them:

**In `src/components/Button/Button.module.scss`:**
```scss
.root {
  border-radius: 12px; /* your custom value */
  padding: 8px 16px;   /* your custom padding */
}
```

**In `src/components/Button/Button.tsx`:**
- If you changed props or behavior, edit that file directly

---

## Why This Works (and Why You Own the Files)

myui uses the **shadcn registry**, not npm. When you run `pnpm dlx shadcn@latest add @myui/button`, the CLI copies the component source into your `src/components/Button/` folder. From that moment, **you own the files**. There is no `npm install myui` dependency — it's a one-time copy.

This means:
- Updates are explicit, not automatic
- You preview changes before applying them
- You can always hand-merge if needed
- Your customizations are preserved until you explicitly run the update command

---

## Best Practices to Avoid Losing Work

1. **Commit before updating**: Make sure your Button customizations are in git before running `pnpm dlx shadcn@latest add @myui/button`. Then you can easily `git diff` to see what the update changed.

2. **Use the CHANGELOG**: Always read the CHANGELOG before and after updating. It tells you what to expect and helps you decide if the new version's changes conflict with yours.

3. **Keep customizations minimal and documented**: If you've heavily customized Button, consider:
   - Using CSS custom properties (`--radius-md`, `--space-3`) instead of hard-coded values
   - Adding a comment in your customizations so you remember why they exist
   - Creating a separate `.override.scss` for non-standard changes

4. **Test after updating**: After re-applying customizations, run `pnpm storybook` and check that Button looks and behaves as expected.

---

## Conflict Resolution Example

Suppose the update adds a new focus-ring style that conflicts with your rounded corners:

```bash
# 1. Preview first
pnpm dlx shadcn@latest add @myui/button --diff

# 2. Read CHANGELOG.md — see that focus-ring was improved
# 3. Apply the update
pnpm dlx shadcn@latest add @myui/button

# 4. Reapply your customizations, and also adopt the new focus-ring
# In Button.module.scss:
.root {
  border-radius: 12px;      /* your custom value */
  padding: 8px 16px;        /* your custom padding */
  /* keep the new focus-ring style from myui */
}

# 5. Test in Storybook
pnpm storybook
```

The key: you **control the merge**, not the registry.
