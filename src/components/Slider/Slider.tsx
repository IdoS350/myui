import { type SlotProps } from '@/lib/slotProps'
import { Slider as BaseSlider } from '@base-ui/react/slider'
import React from 'react'
import {
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from './primitives'
import styles from './Slider.module.scss'

export interface SliderProps
  extends
    BaseSlider.Root.Props,
    SlotProps<typeof BaseSlider, 'label' | 'value' | 'control' | 'track' | 'indicator' | 'thumb'> {
  label?: React.ReactNode
  showValue?: boolean
}

export function Slider({
  label,
  showValue = true,
  labelProps,
  valueProps,
  controlProps,
  trackProps,
  indicatorProps,
  thumbProps,
  ...props
}: SliderProps) {
  const numThumbs = Array.isArray(props.defaultValue)
    ? props.defaultValue.length
    : Array.isArray(props.value)
      ? props.value.length
      : 1

  return (
    <SliderRoot {...props}>
      {(label || showValue) && (
        <div className={styles.header}>
          {label && <SliderLabel {...labelProps}>{label}</SliderLabel>}
          {showValue && <SliderValue {...valueProps} />}
        </div>
      )}
      <SliderControl {...controlProps}>
        <SliderTrack {...trackProps}>
          <SliderIndicator {...indicatorProps} />
          {Array.from({ length: numThumbs }, (_, i) => (
            <SliderThumb key={i} index={i} {...thumbProps} />
          ))}
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  )
}
