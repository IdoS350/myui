import { type SlotProps } from '@/lib/slotProps'
import { Switch as BaseSwitch } from '@base-ui/react/switch'
import clsx from 'clsx'
import React from 'react'
import { SwitchRoot, SwitchThumb } from './primitives'
import styles from './Switch.module.scss'

export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps
  extends Omit<BaseSwitch.Root.Props, 'children'>, SlotProps<typeof BaseSwitch, 'thumb'> {
  size?: SwitchSize
  label?: React.ReactNode
  wrapperProps?: React.ComponentProps<'label'>
}

export function Switch({ size = 'md', label, wrapperProps, thumbProps, ...props }: SwitchProps) {
  return (
    <label {...wrapperProps} className={clsx(styles.wrapper, wrapperProps?.className)}>
      <SwitchRoot data-size={size} {...props}>
        <SwitchThumb {...thumbProps} />
      </SwitchRoot>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
