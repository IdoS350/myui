## [1.0.1] - 2026-06-14

### Fixed

- Swipe-to-dismiss no longer snaps back to origin before exiting — replaced the CSS transition on `[data-ending-style][data-swipe-direction]` with a `@keyframes toast-swipe-exit` animation whose `from` reads `--toast-swipe-movement-x` directly, starting the exit from where the finger left off rather than from the element's resting translate of `0` (`Toast.module.scss`)
- Swipe gesture direction now matches toast side in RTL — `DefaultViewportToast` passes `swipeDirection={['down', 'left']}` when `dir='rtl'` (`Toast.tsx`)
- Exit direction variable `--toast-exit-x` moved from `.viewport` (multiplier pattern) onto `.root` with `:dir(rtl)` override, so `100%` resolves to the toast's own width not the viewport's (`Toast.module.scss`)

## [1.0.0] - 2026-06-12

### Added

- Initial release
