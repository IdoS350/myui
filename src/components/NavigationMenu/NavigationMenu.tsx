import { type SlotProps } from '@/types/styleUtilities'
import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import { ChevronDown } from 'lucide-react'
import React from 'react'
import Primitives from './primitives'

const NavigationMenuRoot = Primitives.Root
const NavigationMenuList = Primitives.List
const NavigationMenuItem = Primitives.Item
const NavigationMenuContent = Primitives.Content
const NavigationMenuLink = Primitives.Link
const NavigationMenuArrow = Primitives.Arrow

export interface NavigationMenuTriggerProps
  extends
    Omit<BaseNavigationMenu.Trigger.Props, 'children'>,
    SlotProps<typeof BaseNavigationMenu, 'icon'> {
  children: React.ReactNode
}

function NavigationMenuTrigger({ children, iconProps, ...props }: NavigationMenuTriggerProps) {
  return (
    <Primitives.Trigger {...props}>
      {children}
      <Primitives.Icon {...iconProps}>
        <ChevronDown size={14} aria-hidden />
      </Primitives.Icon>
    </Primitives.Trigger>
  )
}

export interface NavigationMenuViewportProps
  extends
    BaseNavigationMenu.Viewport.Props,
    Pick<BaseNavigationMenu.Positioner.Props, 'side' | 'sideOffset' | 'align' | 'alignOffset'>,
    SlotProps<typeof BaseNavigationMenu, 'positioner' | 'popup' | 'arrow'> {
  arrow?: boolean
}

function NavigationMenuViewport({
  side = 'bottom',
  sideOffset = 8,
  align = 'center',
  alignOffset,
  arrow: showArrow = false,
  positionerProps,
  popupProps,
  arrowProps,
  ...viewportProps
}: NavigationMenuViewportProps) {
  return (
    <Primitives.Portal>
      <Primitives.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        {...positionerProps}
      >
        <Primitives.Popup {...popupProps}>
          {showArrow && <Primitives.Arrow {...arrowProps} />}
          <Primitives.Viewport {...viewportProps} />
        </Primitives.Popup>
      </Primitives.Positioner>
    </Primitives.Portal>
  )
}

export {
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
}
