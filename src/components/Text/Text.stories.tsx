import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

export default {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['body', 'label', 'heading', 'caption', 'code'],
      description: 'Typographic role',
      table: { defaultValue: { summary: 'body' } },
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'subtle', 'primary', 'danger', 'success', 'warning'],
      description: 'Text color token',
      table: { defaultValue: { summary: 'default' } },
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight override',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'justify'],
      description: 'Text alignment',
    },
    wrap: {
      control: 'select',
      options: ['wrap', 'nowrap', 'balance', 'pretty'],
      description: 'CSS text-wrap behavior',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate with ellipsis',
    },
    as: {
      control: 'text',
      description: 'HTML element to render',
      table: { defaultValue: { summary: 'p' } },
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
  },
} satisfies Meta<typeof Text>

type Story = StoryObj<typeof Text>

export const Primary: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
  },
}

export const Heading: Story = {
  args: {
    variant: 'heading',
    children: 'Page title',
    as: 'h1',
  },
}

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Input label',
    as: 'span',
  },
}

export const Caption: Story = {
  args: {
    variant: 'caption',
    color: 'muted',
    children: 'Helper text beneath a field.',
  },
}

export const Code: Story = {
  args: {
    variant: 'code',
    children: 'const answer = 42',
    as: 'code',
  },
}

export const AllVariants: Story = {
  render: function AllVariants() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Text variant='heading' as='h2'>
          Heading
        </Text>
        <Text variant='body'>Body — The quick brown fox jumps over the lazy dog.</Text>
        <Text variant='label' as='span'>
          Label
        </Text>
        <Text variant='caption' color='muted'>
          Caption — additional context
        </Text>
        <Text variant='code' as='code'>
          const x = 1
        </Text>
      </div>
    )
  },
}

export const Align: Story = {
  render: function Align() {
    const aligns = ['start', 'center', 'end', 'justify'] as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: 280 }}>
        {aligns.map((align) => (
          <Text key={align} align={align}>
            {align} — The quick brown fox jumps over the lazy dog.
          </Text>
        ))}
      </div>
    )
  },
}

export const Weights: Story = {
  render: function Weights() {
    const weights = ['normal', 'medium', 'semibold', 'bold'] as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {weights.map((weight) => (
          <Text key={weight} weight={weight}>
            {weight} — The quick brown fox
          </Text>
        ))}
      </div>
    )
  },
}

export const Wrap: Story = {
  render: function Wrap() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: 240 }}>
        <Text variant='heading' as='h2' wrap='balance'>
          A heading that balances across multiple lines
        </Text>
        <Text wrap='pretty'>
          Body text using pretty wrapping to avoid a lonely orphan word on the last line.
        </Text>
        <Text wrap='nowrap'>This line never wraps, no matter how long it gets.</Text>
      </div>
    )
  },
}

export const Colors: Story = {
  render: function Colors() {
    const colors = [
      'default',
      'muted',
      'subtle',
      'primary',
      'danger',
      'success',
      'warning',
    ] as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {colors.map((color) => (
          <Text key={color} color={color}>
            {color} — The quick brown fox
          </Text>
        ))}
      </div>
    )
  },
}
