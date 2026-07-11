## [1.1.1] - 2026-07-01

### Fixed

- Bottom-sheet drawer now smoothly animates around the on-screen keyboard instead of jumping — added `padding-block-end`/`max-block-size`/`block-size` transitions driven by `--drawer-keyboard-inset`, and constrained `max-block-size` to `100dvh` minus the keyboard inset so the drawer no longer extends underneath the keyboard — `Drawer.module.scss`

## [1.1.0] - 2026-06-19

### Added

- Wrapped drawer content in Base UI's `Drawer.VirtualKeyboardProvider` (v1.6) so focused form fields scroll into view above the on-screen keyboard — `Drawer.tsx`, `primitives.ts`. No `.scrollBody` changes needed: the provider already manages padding/scroll slack for the scroll container internally; `--drawer-keyboard-inset` is only relevant for content outside the scroll flow (e.g. a sticky footer), per Base UI's virtual-keyboard-aware demo

### Changed

- Removed the bottom border from the flat variant's header — `Drawer.module.scss`
- Flat variant's header horizontal padding now matches `.scrollBody` (`var(--space-6)`, was `var(--space-5)`) — `Drawer.module.scss`

## [1.0.0] - 2026-06-12

### Added

- Initial release
