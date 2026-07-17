import { styled } from '@/lib/styled'
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field'
import styles from './OTPField.module.scss'

export default {
  Root: styled(BaseOTPField.Root, styles.root),
  Input: styled(BaseOTPField.Input, styles.input),
  Separator: styled(BaseOTPField.Separator, styles.separator),
}
