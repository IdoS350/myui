import { styled } from '@/lib/styled'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import styles from './Menu.module.scss'

export default {
  Root: BaseMenu.Root,
  Portal: BaseMenu.Portal,
  Backdrop: BaseMenu.Backdrop,
  Trigger: styled(BaseMenu.Trigger, styles.trigger),
  Positioner: styled(BaseMenu.Positioner, styles.positioner),
  Popup: styled(BaseMenu.Popup, styles.popup),
  Arrow: styled(BaseMenu.Arrow, styles.arrow),
  Item: styled(BaseMenu.Item, styles.item),
  LinkItem: styled(BaseMenu.LinkItem, styles.item),
  Separator: styled(BaseMenu.Separator, styles.separator),
  SubmenuRoot: BaseMenu.SubmenuRoot,
  SubmenuTrigger: styled(BaseMenu.SubmenuTrigger, styles.submenuTrigger),
  Group: BaseMenu.Group,
  GroupLabel: styled(BaseMenu.GroupLabel, styles.groupLabel),
  RadioGroup: BaseMenu.RadioGroup,
  RadioItem: styled(BaseMenu.RadioItem, styles.selectionItem),
  RadioItemIndicator: styled(BaseMenu.RadioItemIndicator, styles.itemIndicator),
  CheckboxItem: styled(BaseMenu.CheckboxItem, styles.selectionItem),
  CheckboxItemIndicator: styled(BaseMenu.CheckboxItemIndicator, styles.itemIndicator),
  Viewport: BaseMenu.Viewport,
}
