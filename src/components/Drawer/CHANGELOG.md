## [1.0.1] - 2026-06-17

### Fixed

- Drawer no longer gets covered by the on-screen keyboard on mobile. `position: fixed` + `dvh`/`vh` are sized against the layout viewport, which browsers deliberately keep static when the keyboard opens — fixing this requires the consuming app to opt into `interactive-widget=resizes-content` on its viewport `<meta>` tag (documented at the top of `Drawer.tsx`), which makes the layout viewport itself shrink so the existing CSS adapts with no component changes

## [1.0.0] - 2026-06-12

### Added

- Initial release
