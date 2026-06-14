## [1.0.2] - 2026-06-14

### Fixed

- RTL chevrons no longer double-flip — removed redundant `rotate(180deg)` CSS rule from `Calendar.module.scss` (JS component swap in `Calendar.tsx` already handles the direction)

## [1.0.1] - 2026-06-12

### Fixed

- Typed `classNames` as `Partial<ClassNames>` so only mapped keys are required — `Calendar.tsx`

## [1.0.0] - 2026-06-12

### Added

- Initial release
