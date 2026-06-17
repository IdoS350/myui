import { Button, type ButtonProps } from '@/components/Button/Button'
import { type SlotProps } from '@/types/styleUtilities'
import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { clsx } from 'clsx'
import React from 'react'
import styles from './Drawer.module.scss'
import Primitives from './primitives'

// For the drawer to move clear of the on-screen keyboard on mobile, the
// consuming app's viewport <meta> tag needs interactive-widget=resizes-content
// (e.g. <meta name="viewport" content="width=device-width, initial-scale=1, interactive-widget=resizes-content" />).
// Without it, browsers keep the layout viewport static when the keyboard opens, so
// the position: fixed + dvh/vh sizing below won't react to it.

export type DrawerSide = 'bottom' | 'top' | 'left' | 'right'
export type DrawerSnapPoint = BaseDrawer.Root.SnapPoint
export type DrawerVariant = 'default' | 'flat'

type DrawerContextValue = {
  hasSnapPoints: boolean
  variant: DrawerVariant
  side: DrawerSide
}

const DrawerContext = React.createContext<DrawerContextValue>({
  hasSnapPoints: false,
  variant: 'default',
  side: 'bottom',
})

type DrawerRootProps = BaseDrawer.Root.Props & {
  side?: DrawerSide
  variant?: DrawerVariant
}

function DrawerRoot({
  snapPoints,
  side = 'bottom',
  variant = 'default',
  ...props
}: DrawerRootProps) {
  return (
    <DrawerContext.Provider
      value={{
        hasSnapPoints: !!snapPoints?.length,
        variant,
        side,
      }}
    >
      <Primitives.Root snapPoints={snapPoints} {...props} />
    </DrawerContext.Provider>
  )
}

const DrawerProvider = Primitives.Provider
const DrawerIndent = Primitives.Indent
const DrawerIndentBackground = Primitives.IndentBackground
const DrawerSwipeArea = Primitives.SwipeArea

const DrawerTitle = Primitives.Title
const DrawerDescription = Primitives.Description

type DrawerTriggerProps = Omit<BaseDrawer.Trigger.Props, 'render'> &
  Pick<ButtonProps, 'variant' | 'size'>

function DrawerTrigger({ variant = 'secondary', size, children, ...props }: DrawerTriggerProps) {
  return (
    <BaseDrawer.Trigger render={<Button variant={variant} size={size} />} {...props}>
      {children}
    </BaseDrawer.Trigger>
  )
}

type DrawerCloseProps = Omit<BaseDrawer.Close.Props, 'render'> &
  Pick<ButtonProps, 'variant' | 'size'>

function DrawerClose({ variant = 'secondary', size, children, ...props }: DrawerCloseProps) {
  return (
    <BaseDrawer.Close render={<Button variant={variant} size={size} />} {...props}>
      {children}
    </BaseDrawer.Close>
  )
}

function DrawerActions({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx(styles.actions, className)} {...props}>
      {children}
    </div>
  )
}

export interface DrawerContentProps
  extends BaseDrawer.Popup.Props, SlotProps<typeof BaseDrawer, 'backdrop' | 'viewport'> {
  children: React.ReactNode
}

function DrawerContent({
  children,
  backdropProps,
  viewportProps,
  ...popupProps
}: DrawerContentProps) {
  const { hasSnapPoints, side, variant } = React.use(DrawerContext)

  return (
    <Primitives.Portal>
      <Primitives.Backdrop {...backdropProps} />
      <Primitives.Viewport data-side={side} {...viewportProps}>
        <Primitives.Popup
          className={clsx(hasSnapPoints && styles.snapPopup)}
          data-variant={variant}
          {...popupProps}
        >
          {children}
        </Primitives.Popup>
      </Primitives.Viewport>
    </Primitives.Portal>
  )
}

function DrawerBody({ children, className, ...props }: BaseDrawer.Content.Props) {
  return (
    <Primitives.Content className={clsx(styles.scrollBody, className)} {...props}>
      {children}
    </Primitives.Content>
  )
}

function DrawerHeader({
  children,
  className,
  showHandle: showHandleProp,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { showHandle?: boolean }) {
  const { variant, side } = React.use(DrawerContext)
  const showHandle =
    showHandleProp ?? (variant === 'default' && (side === 'bottom' || side === 'top'))
  return (
    <div className={clsx(styles.header, className)} data-variant={variant} {...props}>
      {showHandle && <div className={styles.handle} aria-hidden='true' />}
      {children}
    </div>
  )
}

export {
  DrawerActions,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerProvider,
  DrawerRoot,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
}
