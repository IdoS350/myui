# Changing the Brand Color in myui from Blue to Orange

Great question! You can absolutely change the brand color without touching any component source files. Here's the right way to do it.

## The Solution

Override the **CSS custom properties** in your app. The myui library uses OKLCH color space for its design tokens, which you can override at runtime in your consumer application.

### Step 1: Override the Primary Color Token

In your app's CSS or SCSS file (typically your root stylesheet), add:

```scss
:root {
  --color-primary: oklch(65% 60% 50deg);
  --color-primary-hover: oklch(58% 60% 50deg);
}

[data-theme='dark'] {
  --color-primary: oklch(72% 55% 50deg);
  --color-primary-hover: oklch(77% 48% 50deg);
}
```

### Understanding the Values

The OKLCH format is: `oklch(lightness% chroma hue)`

For a **warm orange**, you want:
- **Hue: 50-60 degrees** (orange range)
- **Lightness: 52-72%** (depending on mode)
- **Chroma: 55-60** (saturation)

The values above are examples. To fine-tune to your exact brand orange, you can:

1. **Use an OKLCH converter** to convert your brand color (hex or RGB) to OKLCH
2. **Match the lightness levels**: Keep light mode (~65%) and dark mode (~72%) for proper contrast
3. **Adjust chroma**: Higher values = more saturated; 50-65 is typical for brand colors

### Step 2: (Optional) Ensure Proper Setup

Make sure your app:

1. **Imports myui's theme stylesheet** once at your app root:
   ```tsx
   import '@/theme/main.scss'
   ```

2. **Wraps the app in ThemeProvider** to enable light/dark mode:
   ```tsx
   import { ThemeProvider } from '@/theme/useTheme'
   
   export function App() {
     return (
       <ThemeProvider>
         <YourApp />
       </ThemeProvider>
     )
   }
   ```

## Complete Example

Create a file `src/theme-overrides.scss` in your consumer app:

```scss
// Override primary color to warm orange
:root {
  --color-primary: oklch(65% 60% 52deg);      // Warm orange (light mode)
  --color-primary-hover: oklch(58% 60% 52deg);
}

[data-theme='dark'] {
  --color-primary: oklch(72% 55% 52deg);      // Warm orange (dark mode)
  --color-primary-hover: oklch(77% 48% 52deg);
}
```

Then import it **after** myui's theme:

```tsx
import '@myui/theme/main.scss'
import './theme-overrides.scss'

// ... rest of your app
```

## What Gets Updated Automatically

Once you override `--color-primary` and `--color-primary-hover`, all myui components using these tokens will immediately reflect your brand color:

- Primary buttons
- Links and focus states
- Form inputs (focus rings)
- Badges and highlights
- Any component using `var(--color-primary)`

## Why This Approach?

✅ **No component modifications needed** — your override happens purely through CSS  
✅ **Respects both light and dark modes** — separate values for each  
✅ **Future-proof** — if myui updates components, your override persists  
✅ **OKLCH color space** — provides better perceptual consistency across lightness levels  

## Helpful Resources

- **myui Theming Docs**: See `docs/Theming.mdx` in the library for the complete color token reference
- **Available Tokens**: `--color-primary`, `--color-danger`, `--color-success`, `--color-warning` (all customizable the same way)
- **OKLCH Reference**: https://oklch.evilmartians.io/ — visual tool for OKLCH colors

---

**Note**: The current myui theme uses blue (`oklch(52% 55% 255deg)`) for primary. By changing the hue to 50-60 degrees, you get your warm orange while maintaining the same lightness and saturation logic.
