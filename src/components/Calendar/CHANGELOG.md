## [1.0.2] - 2026-06-14

### Fixed

- RTL chevrons now point the correct direction — removed manual orientation swap from `Calendar.tsx`; `navLayout='around'` already passes RTL-aware orientations (`right`/`left`) from DayPicker, so the swap was double-flipping them
- Removed dead CSS rule targeting `.nav .chevron` in `Calendar.module.scss`; with `navLayout='around'` the `<nav>` element is never rendered

## [1.0.1] - 2026-06-12

### Fixed

- Typed `classNames` as `Partial<ClassNames>` so only mapped keys are required — `Calendar.tsx`

## [1.0.0] - 2026-06-12

### Added

- Initial release
