# Base UI Component System (`src/components/`)

Base UI (`@base-ui/react`) components are wrapped in a two-layer pattern before use.

## Layer 1 — `primitives.ts`: styled sub-components

Each UI widget has a `primitives.ts` file that:

1. Imports the Base UI namespace (aliased as `Base<Name>`)
2. Uses `styled(Component, baseClass)` to bind a CSS module class to each sub-component — or passes the component through unstyled where no class is needed
3. Exports a single **default object** whose keys are short, unprefixed slot names

```ts
// src/components/Select/primitives.ts
import { Select as BaseSelect } from '@base-ui/react/select'
import { styled } from '@/lib/styled'
import styles from './Select.module.scss'

export default {
  Root: BaseSelect.Root,
  Portal: BaseSelect.Portal,
  Trigger: styled(BaseSelect.Trigger, styles.trigger),
  Value: styled(BaseSelect.Value, styles.value),
  Icon: styled(BaseSelect.Icon, styles.icon),
  Positioner: styled(BaseSelect.Positioner, styles.positioner),
  Popup: styled(BaseSelect.Popup, styles.popup),
  List: styled(BaseSelect.List, styles.list),
  Item: styled(BaseSelect.Item, styles.item),
  ItemText: styled(BaseSelect.ItemText, styles.itemText),
  ItemIndicator: styled(BaseSelect.ItemIndicator, styles.itemIndicator),
  Group: BaseSelect.Group,
  GroupLabel: styled(BaseSelect.GroupLabel, styles.groupLabel),
  ScrollUpArrow: styled(BaseSelect.ScrollUpArrow, styles.scrollArrow),
  ScrollDownArrow: styled(BaseSelect.ScrollDownArrow, styles.scrollArrow),
}
```

There are **no named exports** in `primitives.ts`. The default object is consumed internally by the component file and never imported directly by consumers.

## Layer 2 — `ComponentName.tsx`: public API

`ComponentName.tsx` is the only public module for consumers. It:

1. Imports `Primitives` as the default from `./primitives`
2. Assigns simple slot pass-throughs to plain `const`s
3. Defines composite functions as regular `function` declarations
4. Collects **all** public names in a single `export { … }` at the bottom of the file

```tsx
// src/components/Select/Select.tsx
import Primitives from './primitives'

const SelectRoot = Primitives.Root

function SelectTrigger({
  placeholder,
  size = 'md',
  children,
  valueProps,
  iconProps,
  ...props
}: SelectTriggerProps) {
  return (
    <Primitives.Trigger data-size={size} {...props}>
      <Primitives.Value placeholder={placeholder} {...valueProps}>
        {children}
      </Primitives.Value>
      <Primitives.Icon {...iconProps}>
        <ChevronDown size={16} aria-hidden />
      </Primitives.Icon>
    </Primitives.Trigger>
  )
}

// … more composites …

export { SelectRoot, SelectTrigger, SelectList, SelectItem, SelectGroup }
```

There is **no default export** and **no compound namespace object**. There are no `index.ts` barrel files.

### Usage

```tsx
import { SelectRoot, SelectTrigger, SelectList, SelectItem } from '@/components/Select/Select'
;<SelectRoot>
  <SelectTrigger placeholder='Choose…' />
  <SelectList>
    <SelectItem value='a'>Option A</SelectItem>
  </SelectList>
</SelectRoot>
```

## `SlotProps<Namespace, IncludedSlots>` — flat slot prop forwarding

Defined in `src/lib/slotProps.ts`. Extracts props for specific internal slots from a Base UI component namespace and surfaces them as flat `*Props` keys on the composite's interface.

```ts
interface SelectTriggerProps
  extends
    Omit<BaseSelect.Trigger.Props, 'children'>,
    SlotProps<typeof BaseSelect, 'value' | 'icon'> {
  placeholder?: string
}
// → adds: valueProps?: Partial<BaseSelect.Value.Props>
//         iconProps?: Partial<BaseSelect.Icon.Props>
```

`IncludedSlots` accepts unprefixed slot names (e.g. `'value'`); the generated prop key gets a `Props` suffix (`valueProps`).

## `styled(Component, baseClass)`

Defined in `src/lib/styled.tsx`. Wraps any `ComponentType`, merges `baseClass` with any additional `className` via `clsx`, and preserves the original type signature exactly.

```ts
export function styled<C extends React.ComponentType<any>>(Component: C, baseClass: string): C
```

## CSS layers

All primitive styles live in `@layer primitives`. Component/composite styles live in `@layer components`. Layer order is declared in `main.scss`:

```scss
@layer theme, reset, primitives, components;
```

## Existing widgets

| Widget         | Slot re-exports                                                                       | Composite exports                                                                |
| -------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `accordion`    | `AccordionRoot`, `AccordionItem`                                                      | `AccordionTrigger`, `AccordionPanel`                                             |
| `combobox`     | `ComboboxRoot`, `ComboboxChipRemove`                                                  | `ComboboxInput`, `ComboboxList`, `ComboboxItem`, `ComboboxGroup`, `ComboboxChip` |
| `popover`      | `PopoverRoot`, `PopoverTrigger`, `PopoverTitle`, `PopoverDescription`, `PopoverClose` | `PopoverContent`                                                                 |
| `select`       | `SelectRoot`                                                                          | `SelectTrigger`, `SelectList`, `SelectItem`, `SelectGroup`                       |
| `tooltip`      | `TooltipRoot`, `TooltipViewport`                                                      | `TooltipProvider`, `TooltipTrigger`, `TooltipContent`                            |
| `number-field` | —                                                                                     | `NumberField`                                                                    |
| `input`        | —                                                                                     | `Input`                                                                          |
| `button`       | —                                                                                     | `Button` (variant: `primary` \| `secondary` \| `danger` \| `ghost`)              |

## Rules

- **Never** import directly from `@base-ui/react/*` in feature code — always go through `src/components/`.
- **Never** import from `primitives.ts` directly — it is internal to the component file.
- There are no `index.ts` barrel files. Import from the component file: `import { SelectRoot } from './Select/Select'`.
- When adding a new Base UI widget, follow the same `primitives.ts` + `ComponentName.tsx` pattern.
- `primitives.ts` only has `export default { … }` — no named exports.
- All public exports are collected in a single `export { … }` at the bottom of `ComponentName.tsx`.
- Import SCSS modules as `styles`: `import styles from './foo.module.scss'`
- Use CSS custom properties (`var(--...)`) for theming; avoid SCSS variables.
