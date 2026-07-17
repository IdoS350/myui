import { styled } from '@/lib/styled'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import styles from './Collapsible.module.scss'

export const CollapsibleRoot = styled(BaseCollapsible.Root, styles.root)
export const CollapsibleTriggerBase = styled(BaseCollapsible.Trigger, styles.trigger)
export const CollapsiblePanel = styled(BaseCollapsible.Panel, styles.panel)
