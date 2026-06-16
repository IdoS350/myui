import type { Meta, StoryObj } from '@storybook/react'
import { useTranslation } from 'react-i18next'
import {
  AutocompleteGroup,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteRoot,
} from './Autocomplete'

export default {
  title: 'Inputs/Autocomplete',
  component: AutocompleteRoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AutocompleteRoot>

type Story = StoryObj<typeof AutocompleteRoot>

function useFruits() {
  const { t } = useTranslation()
  return [
    t('fruits.apple'),
    t('fruits.apricot'),
    t('fruits.banana'),
    t('fruits.blueberry'),
    t('fruits.cherry'),
    t('fruits.durian'),
    t('fruits.elderberry'),
    t('fruits.fig'),
    t('fruits.grape'),
    t('fruits.kiwi'),
    t('fruits.lemon'),
    t('fruits.mango'),
    t('fruits.orange'),
    t('fruits.papaya'),
    t('fruits.peach'),
    t('fruits.pear'),
    t('fruits.pineapple'),
    t('fruits.plum'),
    t('fruits.raspberry'),
    t('fruits.strawberry'),
  ]
}

export const Default: Story = {
  render: function Default() {
    const { t } = useTranslation()
    const fruits = useFruits()
    return (
      <div style={{ width: 240 }}>
        <AutocompleteRoot items={fruits}>
          <AutocompleteInputGroup placeholder={t('autocomplete.searchFruits')} />
          <AutocompleteList>
            {(fruit: string) => (
              <AutocompleteItem key={fruit} value={fruit}>
                {fruit}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteRoot>
      </div>
    )
  },
}

export const WithDefaultValue: Story = {
  render: function WithDefaultValue() {
    const { t } = useTranslation()
    const fruits = useFruits()
    const mango = t('fruits.mango')
    return (
      <div style={{ width: 240 }}>
        <AutocompleteRoot items={fruits} defaultValue={mango}>
          <AutocompleteInputGroup placeholder={t('autocomplete.searchFruits')} />
          <AutocompleteList>
            {(fruit: string) => (
              <AutocompleteItem key={fruit} value={fruit}>
                {fruit}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteRoot>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: function Sizes() {
    const { t } = useTranslation()
    const fruits = useFruits()
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          width: 240,
        }}
      >
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <AutocompleteRoot key={size} items={fruits}>
            <AutocompleteInputGroup
              size={size}
              placeholder={t('autocomplete.placeholderSize', { size: size.toUpperCase() })}
            />
            <AutocompleteList>
              {(fruit: string) => (
                <AutocompleteItem key={fruit} value={fruit}>
                  {fruit}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompleteRoot>
        ))}
      </div>
    )
  },
}

export const Grouped: Story = {
  render: function Grouped() {
    const { t } = useTranslation()
    const produce = [
      {
        value: t('produce.fruits'),
        items: [
          t('fruits.apple'),
          t('fruits.banana'),
          t('fruits.cherry'),
          t('fruits.grape'),
          t('fruits.mango'),
          t('fruits.orange'),
        ],
      },
      {
        value: t('produce.vegetables'),
        items: [
          t('produce.broccoli'),
          t('produce.carrot'),
          t('produce.cucumber'),
          t('produce.lettuce'),
          t('produce.spinach'),
          t('produce.tomato'),
        ],
      },
      {
        value: t('produce.herbs'),
        items: [
          t('produce.basil'),
          t('produce.chive'),
          t('produce.cilantro'),
          t('produce.dill'),
          t('produce.mint'),
          t('produce.thyme'),
        ],
      },
    ]
    return (
      <div style={{ width: 240 }}>
        <AutocompleteRoot items={produce}>
          <AutocompleteInputGroup placeholder={t('autocomplete.searchProduce')} />
          <AutocompleteList>
            {(group: (typeof produce)[0]) => (
              <AutocompleteGroup key={group.value} label={group.value} items={group.items}>
                {(item: string) => (
                  <AutocompleteItem key={item} value={item}>
                    {item}
                  </AutocompleteItem>
                )}
              </AutocompleteGroup>
            )}
          </AutocompleteList>
        </AutocompleteRoot>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: function Disabled() {
    const { t } = useTranslation()
    const fruits = useFruits()
    const cherry = t('fruits.cherry')
    return (
      <div style={{ width: 240 }}>
        <AutocompleteRoot items={fruits} defaultValue={cherry} disabled>
          <AutocompleteInputGroup placeholder={t('autocomplete.searchFruits')} />
          <AutocompleteList>
            {(fruit: string) => (
              <AutocompleteItem key={fruit} value={fruit}>
                {fruit}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteRoot>
      </div>
    )
  },
}
