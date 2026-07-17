import { styled } from '@/lib/styled'
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import styles from './Autocomplete.module.scss'

export default {
  Root: BaseAutocomplete.Root,
  Portal: BaseAutocomplete.Portal,
  Collection: BaseAutocomplete.Collection,
  InputGroup: styled(BaseAutocomplete.InputGroup, styles.inputGroup),
  Input: styled(BaseAutocomplete.Input, styles.input),
  Trigger: styled(BaseAutocomplete.Trigger, styles.trigger),
  Clear: styled(BaseAutocomplete.Clear, styles.clear),
  Icon: styled(BaseAutocomplete.Icon, styles.icon),
  Positioner: styled(BaseAutocomplete.Positioner, styles.positioner),
  Popup: styled(BaseAutocomplete.Popup, styles.popup),
  Empty: styled(BaseAutocomplete.Empty, styles.empty),
  List: styled(BaseAutocomplete.List, styles.list),
  Item: styled(BaseAutocomplete.Item, styles.item),
  Group: BaseAutocomplete.Group,
  GroupLabel: styled(BaseAutocomplete.GroupLabel, styles.groupLabel),
  Status: styled(BaseAutocomplete.Status, styles.status),
}
