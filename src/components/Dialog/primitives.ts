import { styled } from '@/lib/styled'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import styles from './Dialog.module.scss'

export default {
  Root: BaseDialog.Root,
  Portal: BaseDialog.Portal,
  Backdrop: styled(BaseDialog.Backdrop, styles.backdrop),
  Viewport: styled(BaseDialog.Viewport, styles.viewport),
  Popup: styled(BaseDialog.Popup, styles.popup),
  Title: styled(BaseDialog.Title, styles.title),
  Description: styled(BaseDialog.Description, styles.description),
  Trigger: styled(BaseDialog.Trigger, styles.trigger),
  Close: styled(BaseDialog.Close, styles.close),
}
