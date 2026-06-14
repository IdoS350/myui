## [1.0.1] - 2026-06-14

### Fixed

- Swipe-to-dismiss gesture direction now matches toast side in RTL — `DefaultViewportToast` passes `swipeDirection={['down', 'left']}` when `dir='rtl'` so the gesture and exit animation both go toward `inset-inline-end` (`Toast.tsx`)
- Exit animation slides toward `inset-inline-end` in RTL via `--toast-exit-dir` CSS variable (`Toast.module.scss`)

## [1.0.0] - 2026-06-12

### Added

- Initial release
