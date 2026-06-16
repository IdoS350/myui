## [1.0.0] - 2026-06-16

### Added

- Initial release of `NavigationMenuRoot`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuViewport`, and `NavigationMenuArrow` — wrapping Base UI `NavigationMenu` with project theming
- `NavigationMenuTrigger` composite includes a `ChevronDown` icon (via `NavigationMenu.Icon`) that rotates when the popup is open
- `NavigationMenuViewport` composite wraps `Portal → Positioner → Popup → Viewport` with configurable `side`, `sideOffset`, `align`, and optional `arrow` prop
- Content panel slide animations keyed on `data-activation-direction` (`left`, `right`, `up`, `down`) in `NavigationMenu.module.scss`
- Viewport width/height transition for smooth resizing between content panels
- Popup enter/exit via `[data-starting-style]` / `[data-ending-style]` scale + opacity
- Stories: `Primary` (dropdown menus), `WithLinks` (all-link variant), `Vertical` (sidebar orientation)
