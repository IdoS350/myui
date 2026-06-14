# Changing Brand Color in myui from Blue to Warm Orange

The right way to change your brand color without modifying component source files is to **override the CSS custom properties** in your own stylesheet.

## Solution

All myui tokens are CSS custom properties, so you can override them globally by setting the `--color-primary` tokens in your CSS:

```css
/* In your app's global stylesheet (e.g., src/styles/theme.css or src/main.scss) */
:root {
  --color-primary: oklch(55% 60% 30deg);        /* orange instead of blue */
  --color-primary-hover: oklch(49% 60% 30deg);  /* darker orange for hover state */
}
```

These tokens control the brand/primary action color used throughout all myui components. The `--color-primary` token is used for:
- Button backgrounds
- Links and active states
- Focus rings
- Selected items
- Other accent/brand elements

## Optional: Scoped Overrides

If you want to apply the orange color only to a specific section of your app, use a CSS class:

```css
.orange-theme {
  --color-primary: oklch(55% 60% 30deg);
  --color-primary-hover: oklch(49% 60% 30deg);
}
```

Then wrap that section in your React component:

```tsx
<div className="orange-theme">
  {/* Components rendered here will use the orange color */}
</div>
```

## Color Format

myui uses **OKLCH color space** for all colors. If you have a hex color for your warm orange, you can convert it to OKLCH. For example:
- `#FF8C42` (warm orange) → approximately `oklch(60% 55% 40deg)`

The OKLCH format is `oklch(lightness saturation hue)` where:
- **Lightness**: 0-100% (brightness)
- **Saturation**: 0-100% (color intensity)
- **Hue**: 0-360deg (color angle)

## Why This Approach Works

- **No source file changes**: Component files stay untouched
- **Easy to maintain**: All brand color logic is in one place
- **Easy to extend**: You can override any of the 20+ semantic tokens
- **Supports dark mode**: Both light and dark themes can have different primary colors

## Other Overridable Tokens

If you need to adjust other aspects beyond primary color, myui provides tokens for:
- Text colors (`--color-fg`, `--color-fg-muted`)
- Backgrounds (`--color-bg`, `--color-bg-elevated`)
- Status colors (`--color-danger`, `--color-success`, `--color-warning`)
- Spacing, typography, radius, shadows, and transitions

See the myui reference guide for the complete [Design Token Reference](https://idos350.github.io/myui) to explore all available tokens.
