import { type SlotProps } from '@/lib/slotProps'
import { Meter as BaseMeter } from '@base-ui/react/meter'
import styles from './Meter.module.scss'
import { MeterIndicator, MeterLabel, MeterRoot, MeterTrack, MeterValue } from './primitives'

export type MeterColor = 'default' | 'success' | 'warning' | 'danger'

export interface MeterProps extends BaseMeter.Root.Props {
  color?: MeterColor
}

export function Meter({ color = 'default', children, ...props }: MeterProps) {
  return (
    <MeterRoot data-color={color} {...props}>
      {children}
    </MeterRoot>
  )
}

function MeterTrackWithIndicator({
  indicatorProps,
  ...props
}: BaseMeter.Track.Props & SlotProps<typeof BaseMeter, 'indicator'>) {
  return (
    <MeterTrack {...props}>
      <MeterIndicator {...indicatorProps} />
    </MeterTrack>
  )
}

Meter.Track = MeterTrackWithIndicator
Meter.Label = MeterLabel
Meter.Value = MeterValue
Meter.Header = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.header}>{children}</div>
)
