import { OTPField as BaseOTPField } from '@base-ui/react/otp-field'
import Primitives from './primitives'

export type { OTPFieldInputProps, OTPFieldRootProps } from '@base-ui/react/otp-field'

const OTPFieldRoot = Primitives.Root
const OTPFieldInput = Primitives.Input
const OTPFieldSeparator = Primitives.Separator

export type OTPFieldSize = 'sm' | 'md' | 'lg'

export interface OTPFieldProps extends Omit<BaseOTPField.Root.Props, 'children'> {
  size?: OTPFieldSize
}

function OTPField({ length, size = 'md', ...props }: OTPFieldProps) {
  return (
    <OTPFieldRoot data-size={size} length={length} {...props}>
      {Array.from({ length }, (_, i) => (
        <OTPFieldInput key={i} />
      ))}
    </OTPFieldRoot>
  )
}

export { OTPField, OTPFieldInput, OTPFieldRoot, OTPFieldSeparator }
