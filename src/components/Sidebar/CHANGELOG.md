## [1.0.1] - 2026-06-26

### Fixed

- Removed redundant `.content` padding that starved the icon-collapsed menu button of width, causing labels to bleed past the button bounds — `Sidebar.module.scss`
- Icon-collapsed menu button now uses `padding: var(--space-2)` instead of `0` so the icon fills the available space and the label is fully clipped instead of leaving a sliver of text visible — `Sidebar.module.scss`
- Desktop sidebar (`position: fixed`) no longer misaligns with page content when a story/page wrapper applies padding — Storybook's theme/dir decorator now skips its outer padding for `layout: 'fullscreen'` stories — `.storybook/preview.tsx`

## [1.0.0] - 2026-06-26

### Added

- Initial release
