import { styled } from '@/lib/styled'
import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import styles from './Accordion.module.scss'

export default {
  Root: styled(BaseAccordion.Root, styles.root),
  Item: styled(BaseAccordion.Item, styles.item),
  Header: styled(BaseAccordion.Header, styles.header),
  TriggerBase: styled(BaseAccordion.Trigger, styles.trigger),
  Panel: styled(BaseAccordion.Panel, styles.panel),
}
