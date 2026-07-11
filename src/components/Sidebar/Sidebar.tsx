import { Button, type ButtonProps } from '@/components/Button/Button'
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from '@/components/Drawer/Drawer'
import { Input, type InputProps } from '@/components/Input/Input'
import { Separator, type SeparatorProps } from '@/components/Separator/Separator'
import { Skeleton } from '@/components/Skeleton/Skeleton'
import {
  TooltipContent,
  type TooltipContentProps,
  TooltipRoot,
  TooltipTrigger,
} from '@/components/Tooltip/Tooltip'
import { useControllableState } from '@/hooks/useControllableState'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useDirection } from '@base-ui/react/direction-provider'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'
import { PanelLeft } from 'lucide-react'
import React from 'react'
import styles from './Sidebar.module.scss'

const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const MOBILE_MEDIA_QUERY = '(max-width: 767px)'

export type SidebarSide = 'left' | 'right'
export type SidebarVariant = 'sidebar' | 'floating' | 'inset'
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none'
export type SidebarState = 'expanded' | 'collapsed'

interface SidebarContextValue {
  state: SidebarState
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.use(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }
  return context
}

export interface SidebarProviderProps extends React.ComponentProps<'div'> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY)
  const [openMobile, setOpenMobile] = React.useState(false)
  const [openState, setOpen] = useControllableState<boolean>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const open = openState ?? defaultOpen

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((value) => !value)
    } else {
      setOpen(!open)
    }
  }, [isMobile, open, setOpen])

  const state: SidebarState = open ? 'expanded' : 'collapsed'

  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={clsx(styles.wrapper, className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export interface SidebarProps extends React.ComponentProps<'div'> {
  side?: SidebarSide
  variant?: SidebarVariant
  collapsible?: SidebarCollapsible
  rail?: React.ReactNode
}

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  rail,
  className,
  style,
  children,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
  const rtl = useDirection() === 'rtl'
  const collapsedAs = state === 'collapsed' ? collapsible : undefined
  const isOffscreen = collapsedAs === 'offcanvas'
  const [renderChildren, setRenderChildren] = React.useState(!isOffscreen)
  const [prevIsOffscreen, setPrevIsOffscreen] = React.useState(isOffscreen)

  if (isOffscreen !== prevIsOffscreen) {
    setPrevIsOffscreen(isOffscreen)
    if (!isOffscreen) {
      setRenderChildren(true)
    }
  }

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && isOffscreen) {
      setRenderChildren(false)
    }
  }

  if (collapsible === 'none') {
    return (
      <div className={clsx(styles.staticSidebar, className)} style={style} {...props}>
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <DrawerRoot
        open={openMobile}
        onOpenChange={setOpenMobile}
        side={side}
        variant='flat'
        swipeDirection={side}
      >
        <DrawerContent
          className={className}
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
              inlineSize: 'var(--sidebar-width)',
              maxInlineSize: 'var(--sidebar-width)',
              ...style,
            } as React.CSSProperties
          }
          {...props}
        >
          <DrawerHeader className={styles.mobileHeader}>
            <DrawerTitle>{rtl ? 'סרגל צד' : 'Sidebar'}</DrawerTitle>
            <DrawerDescription>
              {rtl ? 'מציג את סרגל הצד הנייד.' : 'Displays the mobile sidebar.'}
            </DrawerDescription>
          </DrawerHeader>
          <div className={styles.mobileInner}>{children}</div>
        </DrawerContent>
      </DrawerRoot>
    )
  }

  return (
    <div
      className={styles.root}
      data-state={state}
      data-collapsible={collapsedAs}
      data-variant={variant}
      data-side={side}
    >
      <div className={styles.gap} data-variant={variant} data-collapsible={collapsedAs} />
      <div
        className={clsx(styles.container, className)}
        data-side={side}
        data-variant={variant}
        data-collapsible={collapsedAs}
        style={style}
        onTransitionEnd={handleTransitionEnd}
        {...props}
      >
        <div className={styles.inner}>{renderChildren && children}</div>
        {rail}
      </div>
    </div>
  )
}

export type SidebarTriggerProps = ButtonProps

function SidebarTrigger({ className, onClick, ...props }: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar()
  const rtl = useDirection() === 'rtl'

  return (
    <Button
      variant='ghost'
      size='icon-sm'
      className={clsx(styles.trigger, className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft size={16} className={styles.triggerIcon} aria-hidden />
      <span className={styles.srOnly}>{rtl ? 'הצג/הסתר סרגל צד' : 'Toggle Sidebar'}</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar()
  const rtl = useDirection() === 'rtl'
  const label = rtl ? 'הצג/הסתר סרגל צד' : 'Toggle Sidebar'

  return (
    <button
      type='button'
      aria-label={label}
      title={label}
      tabIndex={-1}
      onClick={toggleSidebar}
      className={clsx(styles.rail, className)}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return <main className={clsx(styles.inset, className)} {...props} />
}

export type SidebarInputProps = InputProps

function SidebarInput({ size = 'sm', className, ...props }: SidebarInputProps) {
  return <Input size={size} className={clsx(styles.input, className)} {...props} />
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={clsx(styles.header, className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={clsx(styles.footer, className)} {...props} />
}

export type SidebarSeparatorProps = SeparatorProps

function SidebarSeparator({ className, ...props }: SidebarSeparatorProps) {
  return <Separator className={clsx(styles.separator, className)} {...props} />
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={clsx(styles.content, className)} {...props} />
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={clsx(styles.group, className)} {...props} />
}

export type SidebarGroupLabelProps = useRender.ComponentProps<'div'>

function SidebarGroupLabel({ className, render, ...props }: SidebarGroupLabelProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>({ className: clsx(styles.groupLabel, className) }, props),
  })
}

export type SidebarGroupActionProps = useRender.ComponentProps<'button'>

function SidebarGroupAction({ className, render, ...props }: SidebarGroupActionProps) {
  return useRender({
    defaultTagName: 'button',
    render,
    props: mergeProps<'button'>({ className: clsx(styles.groupAction, className) }, props),
  })
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={clsx(styles.groupContent, className)} {...props} />
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={clsx(styles.menu, className)} {...props} />
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li className={clsx(styles.menuItem, className)} {...props} />
}

export type SidebarMenuButtonVariant = 'default' | 'outline'
export type SidebarMenuButtonSize = 'default' | 'sm' | 'lg'

export type SidebarMenuButtonProps = useRender.ComponentProps<'button'> & {
  isActive?: boolean
  variant?: SidebarMenuButtonVariant
  size?: SidebarMenuButtonSize
  tooltip?: string | TooltipContentProps
}

function SidebarMenuButton({
  render,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state } = useSidebar()

  const button = useRender({
    defaultTagName: 'button',
    render: !tooltip ? render : <TooltipTrigger render={render} />,
    props: mergeProps<'button'>({ className: clsx(styles.menuButton, className) }, props),
    state: { active: isActive, size, variant },
  })

  if (!tooltip) {
    return button
  }

  const tooltipProps: TooltipContentProps =
    typeof tooltip === 'string' ? { children: tooltip } : tooltip

  return (
    <TooltipRoot>
      {button}
      <TooltipContent
        side='right'
        align='center'
        hidden={state !== 'collapsed' || isMobile}
        {...tooltipProps}
      />
    </TooltipRoot>
  )
}

export type SidebarMenuActionProps = useRender.ComponentProps<'button'> & {
  showOnHover?: boolean
}

function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: SidebarMenuActionProps) {
  return useRender({
    defaultTagName: 'button',
    render,
    props: mergeProps<'button'>({ className: clsx(styles.menuAction, className) }, props),
    state: { showonhover: showOnHover },
  })
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={clsx(styles.menuBadge, className)} {...props} />
}

export interface SidebarMenuSkeletonProps extends React.ComponentProps<'div'> {
  showIcon?: boolean
}

function SidebarMenuSkeleton({ className, showIcon = false, ...props }: SidebarMenuSkeletonProps) {
  const [width] = React.useState(() => `${Math.floor(Math.random() * 40) + 50}%`)

  return (
    <div className={clsx(styles.menuSkeleton, className)} {...props}>
      {showIcon && <Skeleton shape='circle' className={styles.menuSkeletonIcon} />}
      <Skeleton
        shape='text'
        className={styles.menuSkeletonText}
        style={{ '--skeleton-width': width } as React.CSSProperties}
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={clsx(styles.menuSub, className)} {...props} />
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li className={clsx(styles.menuSubItem, className)} {...props} />
}

export type SidebarMenuSubButtonProps = useRender.ComponentProps<'a'> & {
  size?: 'sm' | 'md'
  isActive?: boolean
}

function SidebarMenuSubButton({
  render,
  size = 'md',
  isActive = false,
  className,
  ...props
}: SidebarMenuSubButtonProps) {
  return useRender({
    defaultTagName: 'a',
    render,
    props: mergeProps<'a'>({ className: clsx(styles.menuSubButton, className) }, props),
    state: { size, active: isActive },
  })
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  // eslint-disable-next-line react-refresh/only-export-components
  useSidebar,
}
