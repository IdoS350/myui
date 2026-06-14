# Changing Brand Color in myui: Blue to Warm Orange

## Overview

Since myui uses OKLCH color space for theming and your consumer project has theme files in `src/theme/`, changing the brand color from blue to warm orange involves updating the CSS custom properties that define your accent/primary color.

## Step-by-Step Process

### 1. Open the Colors File

Navigate to your consumer project's theme file:
```
src/theme/colors.scss
```

This file contains your semantic color tokens defined as CSS custom properties.

### 2. Identify the Current Blue Color

Look for the primary/accent color definition. It will look something like:
```scss
--color-accent: oklch(/* lightness% saturation hue */);
```

For blue, the hue is typically around 250-270°. You need to find the exact OKLCH values being used.

### 3. Convert Warm Orange to OKLCH

A warm orange in OKLCH space uses:
- **Hue**: 30-50° (orange range; 40° is a good warm orange)
- **Saturation (Chroma)**: 0.15-0.20 (vibrant but not oversaturated)
- **Lightness**: 65-75% (depends on your current blue's lightness)

**Example warm orange values:**
```scss
--color-accent: oklch(70% 0.18 40);  // Warm, vibrant orange
```

### 4. Update All Color Variants

If your theme defines related colors (hover, focus, disabled states), update them proportionally:

```scss
// Original blue system
--color-accent: oklch(70% 0.18 250);        // Primary blue
--color-accent-hover: oklch(60% 0.18 250);  // Darker blue
--color-accent-light: oklch(85% 0.12 250);  // Light blue background

// New orange system
--color-accent: oklch(70% 0.18 40);         // Warm orange
--color-accent-hover: oklch(60% 0.18 40);   // Darker orange
--color-accent-light: oklch(85% 0.12 40);   // Light orange background
```

### 5. Consider Light and Dark Mode

If your theme has separate light/dark mode definitions, update both:

```scss
// Light mode
@include light {
  --color-accent: oklch(70% 0.18 40);
  --color-accent-hover: oklch(60% 0.18 40);
}

// Dark mode
@include dark {
  --color-accent: oklch(75% 0.20 40);       // Slightly brighter for dark mode
  --color-accent-hover: oklch(65% 0.20 40);
}
```

### 6. Verify Contrast Ratios

Ensure your new orange meets WCAG AA contrast requirements (4.5:1 for text):
- Test against your background colors
- Use an OKLCH contrast checker tool if needed
- Adjust lightness if necessary

### 7. Format and Test

After making changes:
```bash
pnpm format
```

Then start your dev server and verify:
```bash
pnpm dev
```

Check that:
- All components using `--color-accent` now display orange
- Interactive states (hover, focus) work correctly
- Both light and dark modes show proper contrast
- No color-related components are broken

## Alternative Approach: Component-Level Overrides

If you only want to change specific components' colors (not globally), you can override the CSS custom property on individual components:

```scss
.myCustomComponent {
  --color-accent: oklch(70% 0.18 40);
  // All child components now use this orange
}
```

## OKLCH Warm Orange Reference Values

If you need to fine-tune, here are common warm orange stops:

| Name | OKLCH | Use Case |
|------|------|----------|
| Soft Orange | `oklch(75% 0.12 40)` | Light backgrounds, disabled states |
| Standard Orange | `oklch(70% 0.18 40)` | Primary brand color |
| Deep Orange | `oklch(55% 0.18 40)` | Hover, active states |
| Vibrant Orange | `oklch(68% 0.22 38)` | High-contrast accents |

## Troubleshooting

**Orange looks too yellow?**
- Decrease hue to 30-35°
- Increase saturation (chroma) to 0.20-0.22

**Orange looks too red?**
- Increase hue to 45-50°
- Decrease saturation slightly

**Text contrast is too low?**
- Increase lightness by 5-10%
- Test with actual text colors

**Dark mode looks washed out?**
- Increase chroma to 0.20-0.22 in dark mode variants
- Keep lightness slightly higher (75%+)

## Summary

The correct way to change brand colors in myui is to:
1. Locate `src/theme/colors.scss`
2. Update CSS custom properties (e.g., `--color-accent`) with new OKLCH values
3. Keep hue ~40° for warm orange, adjust chroma (0.18-0.20) and lightness (65-75%) as needed
4. Update light/dark mode variants
5. Test contrast compliance
6. Run `pnpm format` and verify in dev server
