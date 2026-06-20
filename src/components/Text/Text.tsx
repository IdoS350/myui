import clsx from 'clsx'
import styles from './Text.module.scss'

export type TextVariant = 'body' | 'label' | 'heading' | 'caption' | 'code'
export type TextColor =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'primary'
  | 'danger'
  | 'success'
  | 'warning'
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'
export type TextAlign = 'start' | 'center' | 'end' | 'justify'
export type TextWrap = 'wrap' | 'nowrap' | 'balance' | 'pretty'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant
  color?: TextColor
  weight?: TextWeight
  align?: TextAlign
  wrap?: TextWrap
  as?: React.ElementType
  truncate?: boolean
}

export function Text({
  variant = 'body',
  color = 'default',
  weight,
  align,
  wrap,
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
      data-color={color}
      data-weight={weight}
      data-align={align}
      data-wrap={wrap}
      data-truncate={truncate || undefined}
      {...props}
    >
      {children}
    </Tag>
  )
}
