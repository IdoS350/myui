import { styled } from '@/lib/styled'
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import styles from './AlertDialog.module.scss'

export default {
  Root: BaseAlertDialog.Root,
  Portal: BaseAlertDialog.Portal,
  Backdrop: styled(BaseAlertDialog.Backdrop, styles.backdrop),
  Popup: styled(BaseAlertDialog.Popup, styles.popup),
  Title: styled(BaseAlertDialog.Title, styles.title),
  Description: styled(BaseAlertDialog.Description, styles.description),
  Trigger: BaseAlertDialog.Trigger,
  Close: BaseAlertDialog.Close,
}
