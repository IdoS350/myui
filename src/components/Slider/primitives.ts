import { styled } from '@/lib/styled'
import { Slider as BaseSlider } from '@base-ui/react/slider'
import styles from './Slider.module.scss'

export const SliderRoot = styled(BaseSlider.Root, styles.root)
export const SliderLabel = styled(BaseSlider.Label, styles.label)
export const SliderValue = styled(BaseSlider.Value, styles.value)
export const SliderControl = styled(BaseSlider.Control, styles.control)
export const SliderTrack = styled(BaseSlider.Track, styles.track)
export const SliderIndicator = styled(BaseSlider.Indicator, styles.indicator)
export const SliderThumb = styled(BaseSlider.Thumb, styles.thumb)
