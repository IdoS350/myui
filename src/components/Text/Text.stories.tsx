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
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'Font size',
      table: { defaultValue: { summary: 'base' } },
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'subtle', 'primary', 'danger', 'success', 'warning'],
      description: 'Text color token',
      table: { defaultValue: { summary: 'default' } },
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
    size: '3xl',
    children: 'Page title',
    as: 'h1',
  },
}

export const Label: Story = {
  args: {
    variant: 'label',
    size: 'sm',
    children: 'Input label',
    as: 'span',
  },
}

export const Caption: Story = {
  args: {
    variant: 'caption',
    size: 'xs',
    color: 'muted',
    children: 'Helper text beneath a field.',
  },
}

export const Code: Story = {
  args: {
    variant: 'code',
    size: 'sm',
    children: 'const answer = 42',
    as: 'code',
  },
}

export const Sizes: Story = {
  render: function Sizes() {
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'] as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {sizes.map((size) => (
          <Text key={size} size={size}>
            {size} — The quick brown fox
          </Text>
        ))}
      </div>
    )
  },
}

export const AllVariants: Story = {
  render: function AllVariants() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Text variant='heading' size='2xl' as='h2'>
          Heading
        </Text>
        <Text variant='body'>Body — The quick brown fox jumps over the lazy dog.</Text>
        <Text variant='label' size='sm' as='span'>
          Label
        </Text>
        <Text variant='caption' size='xs' color='muted'>
          Caption — additional context
        </Text>
        <Text variant='code' size='sm' as='code'>
          const x = 1
        </Text>
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
