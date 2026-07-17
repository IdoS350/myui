import { type SlotProps } from '@/lib/slotProps'
import { useDirection } from '@base-ui/react/direction-provider'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { Check, ChevronRight } from 'lucide-react'
import React from 'react'
import styles from './Menu.module.scss'
import Primitives from './primitives'

const MenuRoot = Primitives.Root
const MenuTrigger = Primitives.Trigger
const MenuSeparator = Primitives.Separator
const MenuGroup = Primitives.Group
const MenuGroupLabel = Primitives.GroupLabel
const MenuRadioGroup = Primitives.RadioGroup
const MenuSubmenuRoot = Primitives.SubmenuRoot
const MenuItem = Primitives.Item
const MenuLinkItem = Primitives.LinkItem

export interface MenuContentProps
  extends
    BaseMenu.Popup.Props,
    Pick<BaseMenu.Positioner.Props, 'side' | 'sideOffset' | 'align' | 'alignOffset'>,
    SlotProps<typeof BaseMenu, 'positioner'> {
  children: React.ReactNode
}

function MenuContent({
  children,
  side = 'bottom',
  sideOffset = 8,
  align,
  alignOffset,
  positionerProps,
  ...popupProps
}: MenuContentProps) {
  const dir = useDirection()
  const resolvedSide =
    dir === 'rtl' && side === 'right' ? 'left' : dir === 'rtl' && side === 'left' ? 'right' : side

  return (
    <Primitives.Portal>
      <Primitives.Positioner
        side={resolvedSide}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        {...positionerProps}
      >
        <Primitives.Popup {...popupProps}>{children}</Primitives.Popup>
      </Primitives.Positioner>
    </Primitives.Portal>
  )
}

export interface MenuCheckboxItemProps
  extends
    Omit<BaseMenu.CheckboxItem.Props, 'children'>,
    SlotProps<typeof BaseMenu, 'checkboxItemIndicator'> {
  children: React.ReactNode
}

function MenuCheckboxItem({
  children,
  checkboxItemIndicatorProps,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <Primitives.CheckboxItem {...props}>
      <Primitives.CheckboxItemIndicator {...checkboxItemIndicatorProps}>
        <Check size={12} aria-hidden />
      </Primitives.CheckboxItemIndicator>
      <span className={styles.itemText}>{children}</span>
    </Primitives.CheckboxItem>
  )
}

export interface MenuRadioItemProps
  extends
    Omit<BaseMenu.RadioItem.Props, 'children'>,
    SlotProps<typeof BaseMenu, 'radioItemIndicator'> {
  children: React.ReactNode
}

function MenuRadioItem({ children, radioItemIndicatorProps, ...props }: MenuRadioItemProps) {
  return (
    <Primitives.RadioItem {...props}>
      <Primitives.RadioItemIndicator {...radioItemIndicatorProps}>
        <Check size={12} aria-hidden />
      </Primitives.RadioItemIndicator>
      <span className={styles.itemText}>{children}</span>
    </Primitives.RadioItem>
  )
}

export interface MenuSubmenuTriggerProps extends Omit<BaseMenu.SubmenuTrigger.Props, 'children'> {
  children: React.ReactNode
}

function MenuSubmenuTrigger({ children, ...props }: MenuSubmenuTriggerProps) {
  return (
    <Primitives.SubmenuTrigger {...props}>
      {children}
      <ChevronRight size={14} aria-hidden />
    </Primitives.SubmenuTrigger>
  )
}

export {
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuLinkItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuTrigger,
}
