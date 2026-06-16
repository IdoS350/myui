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

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant
  size?: TextSize
  color?: TextColor
  as?: React.ElementType
  truncate?: boolean
}

export function Text({
  variant = 'body',
  size = 'base',
  color = 'default',
  as: Tag = 'p',
  truncate,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={clsx(styles.text, truncate && styles.truncate, className)}
      data-variant={variant}
      data-size={size}
      data-color={color}
      {...props}
    >
      {children}
    </Tag>
  )
}
