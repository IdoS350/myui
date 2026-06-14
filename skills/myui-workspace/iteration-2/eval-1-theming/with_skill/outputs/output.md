# How to Change myui Brand Color from Blue to Warm Orange

## Overview

myui uses **semantic color tokens** defined in `src/theme/colors.scss`. To change your brand color from blue to warm orange, you'll edit the color token file directly—no component-by-component changes needed. All installed components will automatically pick up the new color.

---

## Step-by-Step Process

### 1. Locate Your Theme Colors File

The installed theme lives at:
```
src/theme/colors.scss
```

This file is where all semantic color tokens are defined for both light and dark modes.

### 2. Identify the Primary Color Token

The brand color is controlled by the `--color-primary` token (and its related states). In your current file, you'll see something like:

```scss
:root {
  --color-primary: oklch(55% 60% 30deg);       /* your brand color */
  --color-primary-hover: oklch(49% 60% 30deg);
  /* ... other tokens ... */
  
  &[data-theme='dark'] {
    --color-primary: oklch(62% 55% 30deg);
    --color-primary-hover: oklch(56% 55% 30deg);
  }
}
```

### 3. Replace Blue Values with Warm Orange OKLCH Values

myui uses **OKLCH color format**—a perceptually uniform color space. For warm orange, you'll replace the hue angle (currently `30deg` in the example, which is yellow-orange) with an orange hue around `20-30deg` or adjust the chroma and lightness.

**Example warm orange values** (adjust to your preference):

**Light mode:**
```scss
--color-primary: oklch(55% 70% 20deg);        /* warm orange */
--color-primary-hover: oklch(49% 70% 20deg);  /* darker warm orange */
```

**Dark mode:**
```scss
--color-primary: oklch(62% 65% 20deg);        /* lighter warm orange */
--color-primary-hover: oklch(56% 65% 20deg);  /* slightly darker */
```

### 4. Update Both Light and Dark Theme Variants

Edit `src/theme/colors.scss` to replace your primary colors in both the root (light mode) and the `[data-theme='dark']` sections:

```scss
:root {
  --color-primary: oklch(55% 70% 20deg);       /* warm orange light */
  --color-primary-hover: oklch(49% 70% 20deg);

  &[data-theme='dark'] {
    --color-primary: oklch(62% 65% 20deg);     /* warm orange dark */
    --color-primary-hover: oklch(56% 65% 20deg);
  }
}
```

### 5. Optional: Update Related Semantic Tokens

If your design system has other primary-dependent tokens, update them consistently:

- `--color-primary-fg` — text/icons on primary backgrounds (usually white or very light)
- `--color-danger`, `--color-success`, `--color-warning` — if these should coordinate with your new primary

### 6. Apply and Test

1. **No rebuild needed** — CSS tokens update in real-time in the browser.
2. **Open your app** — all components using `--color-primary` (buttons, links, focus rings, etc.) will immediately reflect the warm orange.
3. **Test dark mode** — toggle dark mode via `useTheme()` to verify the dark variant looks correct.
4. **Verify scoped overrides** — if you have any inline overrides (e.g., `.marketing-section { --color-primary: ... }`), update those too.

---

## Understanding OKLCH

myui uses OKLCH (Oklch color space) because it's **perceptually uniform**—equal changes in the numbers produce equal perceived color changes, making themes cohesive.

**OKLCH syntax:** `oklch(lightness% chroma hue)`

- **Lightness (0–100%)** — how bright the color is. 50% is mid-tone, lower = darker, higher = lighter.
- **Chroma (0–0.4)** — how saturated the color is. Higher = more vibrant, lower = more muted. For most UIs, keep between 0.1–0.2.
- **Hue (0–360deg)** — the color angle. Orange is roughly **0–45deg** (red is ~0deg, yellow is ~100deg).

**Warm orange hue examples:**
- `20deg` — deep burnt orange
- `25deg` — standard warm orange
- `35deg` — yellow-orange

Adjust the values to match your design system's shade of orange.

---

## Key Takeaways

1. **One file to edit** — `src/theme/colors.scss` controls all brand colors globally.
2. **OKLCH format** — use `oklch(lightness% chroma hue)` for warm orange.
3. **Light + dark variants** — update both `:root` and `&[data-theme='dark']` sections.
4. **Automatic propagation** — all myui components instantly reflect the new color.
5. **No component edits needed** — semantic tokens handle the change everywhere.

Edit the file, save, and watch your entire UI rebrand to warm orange!
