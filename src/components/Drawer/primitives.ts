import { styled } from '@/utilities/styled'
import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import styles from './Drawer.module.scss'

export default {
  Root: BaseDrawer.Root,
  Provider: BaseDrawer.Provider,
  VirtualKeyboardProvider: BaseDrawer.VirtualKeyboardProvider,
  Portal: BaseDrawer.Portal,
  Backdrop: styled(BaseDrawer.Backdrop, styles.backdrop),
  Viewport: styled(BaseDrawer.Viewport, styles.viewport),
  Popup: styled(BaseDrawer.Popup, styles.popup),
  Content: styled(BaseDrawer.Content, styles.content),
  Title: styled(BaseDrawer.Title, styles.title),
  Description: styled(BaseDrawer.Description, styles.description),
  Trigger: BaseDrawer.Trigger,
  Close: BaseDrawer.Close,
  SwipeArea: styled(BaseDrawer.SwipeArea, styles.swipeArea),
  Indent: styled(BaseDrawer.Indent, styles.indent),
  IndentBackground: styled(BaseDrawer.IndentBackground, styles.indentBackground),
}
