import clsx from 'clsx'
import styles from './Text.module.scss'

export type TextVariant = 'body' | 'label' | 'heading' | 'caption' | 'code'
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
export type TextColor =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'primary'
  | 'danger'
  | 'success'
  | 'warning'
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant
  size?: TextSize
  color?: TextColor
  weight?: TextWeight
  as?: React.ElementType
  truncate?: boolean
}

export function Text({
  variant = 'body',
  size = 'base',
  color = 'default',
  weight,
  as: Tag = 'p',
  truncate,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={clsx(styles.text, className)}
      data-variant={variant}
      data-size={size}
      data-color={color}
      data-weight={weight}
      data-truncate={truncate || undefined}
      {...props}
    >
      {children}
    </Tag>
  )
}
