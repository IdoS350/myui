import { AlertDescription, AlertRoot, type AlertVariant } from '@/components/Alert/Alert'
import { Button, type ButtonProps, type ButtonVariant } from '@/components/Button/Button'
import { type SlotProps } from '@/lib/slotProps'
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import clsx from 'clsx'
import { AlertCircle, CheckCircle, Info, TriangleAlert } from 'lucide-react'
import React from 'react'
import styles from './AlertDialog.module.scss'
import Primitives from './primitives'

export type AlertDialogVariant = Exclude<AlertVariant, 'neutral'>

const VARIANT_ICONS = {
  info: Info,
  warning: TriangleAlert,
  danger: AlertCircle,
  success: CheckCircle,
} as const

const AlertDialogRoot = Primitives.Root
const AlertDialogTitle = Primitives.Title
const AlertDialogDescription = Primitives.Description

type AlertDialogTriggerProps = Omit<BaseAlertDialog.Trigger.Props, 'render'> &
  Pick<ButtonProps, 'variant' | 'size'>

function AlertDialogTrigger({
  variant = 'secondary',
  size,
  children,
  ...props
}: AlertDialogTriggerProps) {
  return (
    <BaseAlertDialog.Trigger render={<Button variant={variant} size={size} />} {...props}>
      {children}
    </BaseAlertDialog.Trigger>
  )
}

type AlertDialogCloseProps = Omit<BaseAlertDialog.Close.Props, 'render'> &
  Pick<ButtonProps, 'variant' | 'size'>

function AlertDialogClose({
  variant = 'secondary',
  size,
  children,
  ...props
}: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close render={<Button variant={variant} size={size} />} {...props}>
      {children}
    </BaseAlertDialog.Close>
  )
}

const VARIANT_SEVERITY: Record<AlertDialogVariant, number> = {
  danger: 3,
  warning: 2,
  info: 1,
  success: 0,
}

function dominantVariant(messages: AlertDialogMessageItem[]): AlertDialogVariant {
  return messages.reduce<AlertDialogVariant>(
    (acc, msg) => (VARIANT_SEVERITY[msg.variant] > VARIANT_SEVERITY[acc] ? msg.variant : acc),
    'success',
  )
}

export interface AlertDialogContentProps
  extends BaseAlertDialog.Popup.Props, SlotProps<typeof BaseAlertDialog, 'backdrop'> {
  children: React.ReactNode
  variant?: AlertDialogVariant
}

function AlertDialogContent({
  children,
  variant,
  className,
  backdropProps,
  ...popupProps
}: AlertDialogContentProps) {
  const Icon = variant ? VARIANT_ICONS[variant] : null
  return (
    <Primitives.Portal>
      <Primitives.Backdrop {...backdropProps} />
      <Primitives.Popup className={className} {...popupProps}>
        {Icon && (
          <div className={styles.iconWrapper} data-variant={variant}>
            <Icon size={18} aria-hidden />
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </Primitives.Popup>
    </Primitives.Portal>
  )
}

function AlertDialogActions({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx(styles.actions, className)} {...props}>
      {children}
    </div>
  )
}

export interface AlertDialogMessageItem {
  variant: AlertDialogVariant
  text: string
}

function AlertDialogMessageList({
  messages,
  className,
}: {
  messages: AlertDialogMessageItem[]
  className?: string
}) {
  return (
    <div className={clsx(styles.messageList, className)}>
      {messages.map((msg, i) => (
        <AlertRoot key={i} variant={msg.variant} className={styles.messageItem} role='none'>
          <AlertDescription>{msg.text}</AlertDescription>
        </AlertRoot>
      ))}
    </div>
  )
}

// --- Imperative API ---

export interface AlertDialogAlertOptions {
  title: string
  description?: string
  variant?: AlertDialogVariant
  okLabel?: string
}

export interface AlertDialogConfirmOptions {
  title: string
  description?: string
  variant?: AlertDialogVariant
  confirmLabel?: string
  cancelLabel?: string
}

export interface AlertDialogMessagesOptions {
  title: string
  description?: string
  messages: AlertDialogMessageItem[]
  okLabel?: string
  cancelLabel?: string
}

interface AlertDialogContextValue {
  alert: (options: AlertDialogAlertOptions) => Promise<void>
  confirm: (options: AlertDialogConfirmOptions) => Promise<boolean>
  messages: (options: AlertDialogMessagesOptions) => Promise<boolean>
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null)

function variantToButtonVariant(variant?: AlertDialogVariant): ButtonVariant {
  return variant === 'danger' ? 'danger' : 'primary'
}

type CurrentItem =
  | ({ kind: 'alert' } & AlertDialogAlertOptions)
  | ({ kind: 'confirm' } & AlertDialogConfirmOptions)
  | ({ kind: 'messages' } & AlertDialogMessagesOptions)

interface PendingItem {
  item: CurrentItem
  resolve: (val: boolean) => void
}

function AlertDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [current, setCurrent] = React.useState<CurrentItem>({
    kind: 'confirm',
    title: '',
  })
  const queueRef = React.useRef<PendingItem[]>([])
  const resolveRef = React.useRef<((val: boolean) => void) | null>(null)
  const openRef = React.useRef(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const next = React.useCallback(() => {
    const pending = queueRef.current.shift()
    if (!pending) return
    resolveRef.current = pending.resolve
    setCurrent(pending.item)
    openRef.current = true
    setOpen(true)
  }, [])

  const alert = React.useCallback(
    (opts: AlertDialogAlertOptions) => {
      return new Promise<void>((resolve) => {
        queueRef.current.push({
          item: { kind: 'alert', ...opts },
          resolve: () => resolve(),
        })
        if (!openRef.current) next()
      })
    },
    [next],
  )

  const confirm = React.useCallback(
    (opts: AlertDialogConfirmOptions) => {
      return new Promise<boolean>((resolve) => {
        queueRef.current.push({ item: { kind: 'confirm', ...opts }, resolve })
        if (!openRef.current) next()
      })
    },
    [next],
  )

  const messages = React.useCallback(
    (opts: AlertDialogMessagesOptions) => {
      return new Promise<boolean>((resolve) => {
        queueRef.current.push({ item: { kind: 'messages', ...opts }, resolve })
        if (!openRef.current) next()
      })
    },
    [next],
  )

  const settle = React.useCallback(
    (result: boolean) => {
      if (!openRef.current) return
      resolveRef.current?.(result)
      resolveRef.current = null
      openRef.current = false
      setOpen(false)
      if (queueRef.current.length > 0) {
        timeoutRef.current = setTimeout(next, 120)
      }
    },
    [next],
  )

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) settle(false)
    },
    [settle],
  )

  const variant = current.kind === 'messages' ? dominantVariant(current.messages) : current.variant
  const okLabel =
    current.kind !== 'confirm' ? (current.okLabel ?? 'OK') : (current.confirmLabel ?? 'Confirm')

  return (
    <AlertDialogContext.Provider value={{ alert, confirm, messages }}>
      {children}
      <AlertDialogRoot open={open} onOpenChange={handleOpenChange}>
        <AlertDialogContent variant={current.kind !== 'messages' ? variant : undefined}>
          {current.title && <AlertDialogTitle>{current.title}</AlertDialogTitle>}
          {current.description && (
            <AlertDialogDescription>{current.description}</AlertDialogDescription>
          )}
          {current.kind === 'messages' && <AlertDialogMessageList messages={current.messages} />}
          <AlertDialogActions>
            {current.kind === 'confirm' && (
              <AlertDialogClose onClick={() => settle(false)}>
                {current.cancelLabel ?? 'Cancel'}
              </AlertDialogClose>
            )}
            {current.kind === 'messages' && current.cancelLabel && (
              <AlertDialogClose onClick={() => settle(false)}>
                {current.cancelLabel}
              </AlertDialogClose>
            )}
            <AlertDialogClose
              variant={variantToButtonVariant(variant)}
              onClick={() => settle(true)}
            >
              {okLabel}
            </AlertDialogClose>
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialogRoot>
    </AlertDialogContext.Provider>
  )
}

function useAlertDialog(): AlertDialogContextValue {
  const ctx = React.use(AlertDialogContext)
  if (!ctx) throw new Error('useAlertDialog must be used within AlertDialogProvider')
  return ctx
}

export {
  AlertDialogActions,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogMessageList,
  AlertDialogProvider,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  // eslint-disable-next-line react-refresh/only-export-components
  useAlertDialog,
}
