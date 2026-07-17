import { styled } from '@/lib/styled'
import { Meter as BaseMeter } from '@base-ui/react/meter'
import styles from './Meter.module.scss'

export const MeterRoot = styled(BaseMeter.Root, styles.root)
export const MeterTrack = styled(BaseMeter.Track, styles.track)
export const MeterIndicator = styled(BaseMeter.Indicator, styles.indicator)
export const MeterLabel = styled(BaseMeter.Label, styles.label)
export const MeterValue = styled(BaseMeter.Value, styles.value)
