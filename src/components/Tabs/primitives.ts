import { styled } from '@/lib/styled'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import styles from './Tabs.module.scss'

export default {
  Root: styled(BaseTabs.Root, styles.root),
  List: styled(BaseTabs.List, styles.list),
  Tab: styled(BaseTabs.Tab, styles.tab),
  Indicator: styled(BaseTabs.Indicator, styles.indicator),
  Panel: styled(BaseTabs.Panel, styles.panel),
  PanelAnimated: styled(BaseTabs.Panel, styles.panelAnimated),
}
