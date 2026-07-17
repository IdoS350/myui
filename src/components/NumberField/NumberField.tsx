import { type SlotProps } from '@/lib/slotProps'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { Minus, Plus } from 'lucide-react'
import {
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from './primitives'

export type NumberFieldSize = 'sm' | 'md' | 'lg'

export interface NumberFieldProps
  extends
    BaseNumberField.Root.Props,
    SlotProps<typeof BaseNumberField, 'group' | 'input' | 'decrement' | 'increment'> {
  size?: NumberFieldSize
  hideSteppers?: boolean
}

export { NumberFieldInput, NumberFieldRoot } from './primitives'

export function NumberField({
  size = 'md',
  hideSteppers = false,
  groupProps,
  inputProps,
  decrementProps,
  incrementProps,
  ...props
}: NumberFieldProps) {
  return (
    <NumberFieldRoot {...props}>
      <NumberFieldGroup data-size={size} {...groupProps}>
        {!hideSteppers && (
          <NumberFieldDecrement aria-label='Decrease' {...decrementProps}>
            <Minus size={12} aria-hidden />
          </NumberFieldDecrement>
        )}
        <NumberFieldInput autoComplete='off' {...inputProps} />
        {!hideSteppers && (
          <NumberFieldIncrement aria-label='Increase' {...incrementProps}>
            <Plus size={12} aria-hidden />
          </NumberFieldIncrement>
        )}
      </NumberFieldGroup>
    </NumberFieldRoot>
  )
}
