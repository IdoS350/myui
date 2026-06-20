## [1.0.0] - 2026-06-16

### Added

- Initial release — `Text` component with `variant` (`body | label | heading | caption | code`, each a fixed font-size + line-height pairing), `color` (`default | muted | subtle | primary | danger | success | warning`), `weight` (`normal | medium | semibold | bold`, overrides the variant's default weight), `align` (`start | center | end | justify`), and `wrap` (`wrap | nowrap | balance | pretty`, maps to CSS `text-wrap`) props in `Text.tsx`
- Polymorphic `as` prop for rendering any HTML element, defaulting to `p`
- `truncate` boolean prop, applied via `data-truncate` attribute selector with the `@include truncate` mixin in `Text.module.scss`
- Storybook stories: `Primary`, `Heading`, `Label`, `Caption`, `Code`, `AllVariants`, `Align`, `Wrap`, `Weights`, `Colors`
