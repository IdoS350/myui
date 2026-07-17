import { styled } from '@/lib/styled'
import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar'
import styles from './Toolbar.module.scss'

export default {
  Root: styled(BaseToolbar.Root, styles.root),
  Button: styled(BaseToolbar.Button, styles.button),
  Group: styled(BaseToolbar.Group, styles.group),
  Separator: styled(BaseToolbar.Separator, styles.separator),
  Link: styled(BaseToolbar.Link, styles.link),
  Input: styled(BaseToolbar.Input, styles.input),
}
