## [1.0.1] - 2026-06-19

### Changed

- Updated to Base UI v1.6.0 — internal import renamed from `OTPFieldPreview` to `OTPField` (`@base-ui/react/otp-field`); no public API change

## [1.0.0] - 2026-06-16

### Added

- Initial release — `OTPField` composite, `OTPFieldRoot`, `OTPFieldInput`, `OTPFieldSeparator` primitives
- Size variants `sm`, `md` (default), `lg` via `data-size` CSS custom property cascade
- Filled, complete (success), invalid, and disabled visual states via Base UI data attributes
- Monospace font rendering with `tabular-nums` for consistent digit widths
- Masked mode via `mask` prop (password-style character hiding)
- Separator support for grouped layouts (e.g. 3–3 digit groups)
- Validation types: `numeric` (default), `alpha`, `alphanumeric`, `none`
