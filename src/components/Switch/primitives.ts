import { styled } from '@/lib/styled'
import { Switch as BaseSwitch } from '@base-ui/react/switch'
import styles from './Switch.module.scss'

export const SwitchRoot = styled(BaseSwitch.Root, styles.root)
export const SwitchThumb = styled(BaseSwitch.Thumb, styles.thumb)
