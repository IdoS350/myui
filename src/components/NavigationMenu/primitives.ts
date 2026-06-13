import { styled } from '@/utilities/styled'
import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import styles from './NavigationMenu.module.scss'

export default {
  Root: styled(BaseNavigationMenu.Root, styles.root),
  Portal: BaseNavigationMenu.Portal,
  Backdrop: BaseNavigationMenu.Backdrop,
  List: styled(BaseNavigationMenu.List, styles.list),
  Item: styled(BaseNavigationMenu.Item, styles.item),
  Trigger: styled(BaseNavigationMenu.Trigger, styles.trigger),
  Icon: styled(BaseNavigationMenu.Icon, styles.icon),
  Content: styled(BaseNavigationMenu.Content, styles.content),
  Viewport: styled(BaseNavigationMenu.Viewport, styles.viewport),
  Positioner: styled(BaseNavigationMenu.Positioner, styles.positioner),
  Popup: styled(BaseNavigationMenu.Popup, styles.popup),
  Arrow: styled(BaseNavigationMenu.Arrow, styles.arrow),
  Link: styled(BaseNavigationMenu.Link, styles.link),
}
