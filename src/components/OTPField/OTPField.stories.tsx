import type { Meta, StoryObj } from '@storybook/react'
import { useTranslation } from 'react-i18next'
import { OTPField, OTPFieldInput, OTPFieldRoot, OTPFieldSeparator } from './OTPField'

export default {
  title: 'Inputs/OTPField',
  component: OTPField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof OTPField>

type Story = StoryObj<typeof OTPField>

export const Default: Story = {
  render: function Default() {
    return <OTPField length={6} />
  },
}

export const Masked: Story = {
  render: function Masked() {
    return <OTPField length={6} mask />
  },
}

export const WithSeparator: Story = {
  render: function WithSeparator() {
    return (
      <OTPFieldRoot data-size='md' length={6}>
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldSeparator>—</OTPFieldSeparator>
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
      </OTPFieldRoot>
    )
  },
}

export const Alphanumeric: Story = {
  render: function Alphanumeric() {
    return <OTPField length={4} validationType='alphanumeric' />
  },
}

export const Disabled: Story = {
  render: function Disabled() {
    return <OTPField length={6} disabled defaultValue='1234' />
  },
}

export const Sizes: Story = {
  render: function Sizes() {
    const { t } = useTranslation()
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-fg-subtle)' }}>
            {t('common.small')}
          </span>
          <OTPField length={4} size='sm' />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-fg-subtle)' }}>
            {t('common.medium')}
          </span>
          <OTPField length={4} size='md' />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-fg-subtle)' }}>
            {t('common.large')}
          </span>
          <OTPField length={4} size='lg' />
        </div>
      </div>
    )
  },
}

export const AllVariants: Story = {
  render: function AllVariants() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <OTPField length={6} />
        <OTPField length={6} mask />
        <OTPFieldRoot data-size='md' length={6}>
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldSeparator>—</OTPFieldSeparator>
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
        </OTPFieldRoot>
        <OTPField length={4} validationType='alphanumeric' />
        <OTPField length={6} disabled defaultValue='1234' />
      </div>
    )
  },
}
