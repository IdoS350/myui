import { styled } from '@/lib/styled'
import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import styles from './Avatar.module.scss'

export default {
  Root: styled(BaseAvatar.Root, styles.root),
  Image: styled(BaseAvatar.Image, styles.image),
  Fallback: styled(BaseAvatar.Fallback, styles.fallback),
}
