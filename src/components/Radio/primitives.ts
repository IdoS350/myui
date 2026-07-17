import { styled } from '@/lib/styled'
import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'
import React from 'react'
import styles from './Radio.module.scss'

export const RadioGroupRoot = styled(RadioGroup, styles.group)
// Radio.Root has a required generic `value` prop, so we cast to satisfy `styled`'s
// AnyComponent constraint, then cast the result back to preserve the full type.
export const RadioItemRoot = styled(
  BaseRadio.Root as React.ComponentType<{ className?: string }>,
  styles.radio,
) as typeof BaseRadio.Root
export const RadioIndicator = styled(BaseRadio.Indicator, styles.indicator)
