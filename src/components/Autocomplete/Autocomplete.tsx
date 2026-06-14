import { type SlotProps } from '@/types/styleUtilities'
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { ChevronDown, X } from 'lucide-react'
import styles from './Autocomplete.module.scss'
import Primitives from './primitives'

const AutocompleteRoot = Primitives.Root

export type AutocompleteSize = 'sm' | 'md' | 'lg'

export interface AutocompleteInputGroupProps
  extends
    Omit<BaseAutocomplete.InputGroup.Props, 'children'>,
    SlotProps<typeof BaseAutocomplete, 'input' | 'clear' | 'trigger'> {
  placeholder?: string
  size?: AutocompleteSize
  clearable?: boolean
}

function AutocompleteInputGroup({
  placeholder,
  size = 'md',
  clearable = true,
  inputProps,
  clearProps,
  triggerProps,
  ...props
}: AutocompleteInputGroupProps) {
  return (
    <Primitives.InputGroup data-size={size} {...props}>
      <Primitives.Input placeholder={placeholder} {...inputProps} />
      <div className={styles.actionButtons}>
        {clearable && (
          <Primitives.Clear keepMounted aria-label='Clear' {...clearProps}>
            <X size={14} aria-hidden />
          </Primitives.Clear>
        )}
        <Primitives.Trigger aria-label='Open list' {...triggerProps}>
          <ChevronDown size={16} aria-hidden />
        </Primitives.Trigger>
      </div>
    </Primitives.InputGroup>
  )
}

export interface AutocompleteListProps<T = unknown> extends SlotProps<
  typeof BaseAutocomplete,
  'positioner' | 'popup' | 'empty' | 'list' | 'status'
> {
  emptyMessage?: React.ReactNode
  statusMessage?: React.ReactNode
  children: React.ReactNode | ((item: T, index: number) => React.ReactNode)
}

function AutocompleteList<T = unknown>({
  emptyMessage = 'No results found.',
  statusMessage,
  children,
  positionerProps,
  popupProps,
  emptyProps,
  listProps,
  statusProps,
}: AutocompleteListProps<T>) {
  const resolvedEmpty = statusMessage != null ? null : emptyMessage

  return (
    <Primitives.Portal>
      <Primitives.Positioner sideOffset={4} {...positionerProps}>
        <Primitives.Popup {...popupProps}>
          <Primitives.Status {...statusProps}>{statusMessage ?? null}</Primitives.Status>
          <Primitives.Empty {...emptyProps}>{resolvedEmpty}</Primitives.Empty>
          <Primitives.List {...listProps}>{children}</Primitives.List>
        </Primitives.Popup>
      </Primitives.Positioner>
    </Primitives.Portal>
  )
}

export interface AutocompleteItemProps extends BaseAutocomplete.Item.Props {
  children?: React.ReactNode
}

function AutocompleteItem({ children, ...props }: AutocompleteItemProps) {
  return (
    <Primitives.Item {...props}>
      <span className={styles.itemText}>{children}</span>
    </Primitives.Item>
  )
}

export interface AutocompleteGroupProps<T = unknown> extends SlotProps<
  typeof BaseAutocomplete,
  'group' | 'groupLabel'
> {
  label: string
  items?: T[]
  children: ((item: T, index: number) => React.ReactNode) | React.ReactNode
}

function AutocompleteGroup<T = unknown>({
  label,
  items,
  children,
  groupProps,
  groupLabelProps,
}: AutocompleteGroupProps<T>) {
  return (
    <Primitives.Group items={items} {...groupProps}>
      <Primitives.GroupLabel {...groupLabelProps}>{label}</Primitives.GroupLabel>
      <Primitives.Collection>
        {children as (item: T, index: number) => React.ReactNode}
      </Primitives.Collection>
    </Primitives.Group>
  )
}

export {
  AutocompleteGroup,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteRoot,
}
