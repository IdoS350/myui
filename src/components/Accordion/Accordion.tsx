import { type SlotProps } from '@/lib/slotProps'
import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import styles from './Accordion.module.scss'
import Primitives from './primitives'

const AccordionRoot = Primitives.Root
const AccordionItem = Primitives.Item

export interface AccordionTriggerProps
  extends BaseAccordion.Trigger.Props, SlotProps<typeof BaseAccordion, 'header'> {
  children: React.ReactNode
}

function AccordionTrigger({ children, headerProps, ...props }: AccordionTriggerProps) {
  return (
    <Primitives.Header {...headerProps}>
      <Primitives.TriggerBase {...props}>
        <span>{children}</span>
        <ChevronRight size={16} className={styles.icon} aria-hidden />
      </Primitives.TriggerBase>
    </Primitives.Header>
  )
}

export interface AccordionPanelProps extends BaseAccordion.Panel.Props {
  children: React.ReactNode
}

function AccordionPanel({ children, ...props }: AccordionPanelProps) {
  return (
    <Primitives.Panel {...props}>
      <div style={{ padding: 'var(--space-2) var(--space-3)' }}>{children}</div>
    </Primitives.Panel>
  )
}

export { AccordionItem, AccordionPanel, AccordionRoot, AccordionTrigger }
