# myui

Personal component library built with React, TypeScript, and [Base UI](https://base-ui.com).

**[Documentation](https://idos350.github.io/myui)**

## Development

```bash
pnpm storybook   # component development & preview
pnpm build       # production build
```

## Stack

- **React 19** + **TypeScript**
- **[Base UI](https://base-ui.com)** — unstyled, accessible headless primitives
- **Vite** — build tooling
- **Storybook** — component development environment
- **SCSS modules** — scoped styles; CSS custom properties for theming

## Conventions

See [docs/base-ui-conventions.md](docs/base-ui-conventions.md) for:

- The `primitives.ts` + compound object component pattern
- Slot prop forwarding with `SlotProps<Namespace, IncludedSlots>`
- CSS layer order and theming rules
