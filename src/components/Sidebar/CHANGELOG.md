## [1.0.3] - 2026-06-26

### Fixed

- Offcanvas content no longer disappears instantly when collapsing — it now stays mounted through the slide-out transition and unmounts only once it finishes, driven by `onTransitionEnd` instead of synchronously with the collapsed state — `Sidebar.tsx`
- Icon-collapsible and offcanvas resize/slide transitions (`.gap`, `.container`, `.groupLabel`) now use `var(--ease-in-out-quart)` instead of `linear`, since they animate an on-screen size/position change rather than constant motion — `Sidebar.module.scss`

## [1.0.2] - 2026-06-26

### Changed

- Replaced the local `isRtl()` helper (read `document.documentElement.dir`) with Base UI's `useDirection` hook from `@base-ui/react/direction-provider` — `Sidebar.tsx`

### Fixed

- Icon in the icon-collapsed menu button is now perfectly centered — the hidden label `<span>` was still occupying flex layout space and skewing the icon off-center, now hidden via `display: none` in that state — `Sidebar.module.scss`
- Offcanvas sidebar content is no longer rendered while off-screen, so any internal state (inputs, etc.) resets on reopen instead of persisting — `Sidebar.tsx`

## [1.0.1] - 2026-06-26

### Fixed

- Removed redundant `.content` padding that starved the icon-collapsed menu button of width, causing labels to bleed past the button bounds — `Sidebar.module.scss`
- Icon-collapsed menu button now uses `padding: var(--space-2)` instead of `0` so the icon fills the available space and the label is fully clipped instead of leaving a sliver of text visible — `Sidebar.module.scss`
- Desktop sidebar (`position: fixed`) no longer misaligns with page content when a story/page wrapper applies padding — Storybook's theme/dir decorator now skips its outer padding for `layout: 'fullscreen'` stories — `.storybook/preview.tsx`

## [1.0.0] - 2026-06-26

### Added

- Initial release
