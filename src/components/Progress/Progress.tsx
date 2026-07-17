import { type SlotProps } from '@/lib/slotProps'
import { Progress as BaseProgress } from '@base-ui/react/progress'
import {
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressTrack,
  ProgressValue,
} from './primitives'
import styles from './Progress.module.scss'

export type ProgressProps = BaseProgress.Root.Props

export function Progress({ children, ...props }: ProgressProps) {
  return <ProgressRoot {...props}>{children}</ProgressRoot>
}

function ProgressTrackWithIndicator({
  indicatorProps,
  ...props
}: BaseProgress.Track.Props & SlotProps<typeof BaseProgress, 'indicator'>) {
  return (
    <ProgressTrack {...props}>
      <ProgressIndicator {...indicatorProps} />
    </ProgressTrack>
  )
}

Progress.Track = ProgressTrackWithIndicator
Progress.Label = ProgressLabel
Progress.Value = ProgressValue
Progress.Header = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.header}>{children}</div>
)
