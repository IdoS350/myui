import { styled } from '@/lib/styled'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import styles from './NumberField.module.scss'

export const NumberFieldRoot = BaseNumberField.Root
export const NumberFieldGroup = styled(BaseNumberField.Group, styles.group)
export const NumberFieldInput = styled(BaseNumberField.Input, styles.input)
export const NumberFieldDecrement = styled(BaseNumberField.Decrement, styles.stepper)
export const NumberFieldIncrement = styled(BaseNumberField.Increment, styles.stepper)
export const NumberFieldScrubArea = BaseNumberField.ScrubArea
export const NumberFieldScrubAreaCursor = BaseNumberField.ScrubAreaCursor
