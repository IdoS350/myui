## [1.1.0] - 2026-07-17

### Changed

- Moved `styled` and `slotProps` (formerly `styleUtilities`) from `src/utilities`/`src/types` to `src/lib` so imports use the shadcn-recognized `@/lib` alias segment. This prevents consumers from getting a duplicate `utilities/styled.tsx` on install.
- Renamed `styleUtilities.ts` to `slotProps.ts` to match its sole export (`SlotProps`) and avoid confusion with the styling-related `styled.tsx`.

## [1.0.0] - 2026-06-12

### Added

- Initial release
