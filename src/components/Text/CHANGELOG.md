## [1.0.0] - 2026-06-16

### Added

- Initial release — `Text` component with `variant` (`body | label | heading | caption | code`), `size` (`xs | sm | base | lg | xl | 2xl | 3xl | 4xl`), `color` (`default | muted | subtle | primary | danger | success | warning`), and `weight` (`normal | medium | semibold | bold`) props in `Text.tsx`
- Polymorphic `as` prop for rendering any HTML element, defaulting to `p`
- `truncate` boolean prop, applied via `data-truncate` attribute selector with the `@include truncate` mixin in `Text.module.scss`
- Storybook stories: `Primary`, `Heading`, `Label`, `Caption`, `Code`, `Sizes`, `AllVariants`, `Colors`, `Weights`
