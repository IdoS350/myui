import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import {
  ComboboxChip,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxMultiInput,
  ComboboxRoot,
  createComboboxItems,
} from './Combobox'

export default {
  title: 'Inputs/Combobox',
  component: ComboboxRoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ComboboxRoot>

type Story = StoryObj<typeof ComboboxRoot>

// ─── Team members (shared, no localization needed) ────────────────────────────

interface TeamMember {
  id: number
  name: string
  role: string
}

const teamMembers: TeamMember[] = [
  { id: 1, name: 'Alice Johnson', role: 'Engineering' },
  { id: 2, name: 'Bob Smith', role: 'Design' },
  { id: 3, name: 'Carol White', role: 'Product' },
  { id: 4, name: 'Dan Brown', role: 'Engineering' },
  { id: 5, name: 'Eva Green', role: 'Marketing' },
  { id: 6, name: 'Frank Lee', role: 'Design' },
  { id: 7, name: 'Grace Kim', role: 'Engineering' },
  { id: 8, name: 'Henry Park', role: 'Product' },
]

const teamMemberItems = createComboboxItems(teamMembers, {
  getValue: (member) => member.id,
  getLabel: (member) => member.name,
})

function MemberItem({ member }: { member: TeamMember }) {
  return (
    <span
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        gap: 'var(--space-2)',
      }}
    >
      <span>{member.name}</span>
      <span
        style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-fg-subtle)',
          flexShrink: 0,
        }}
      >
        {member.role}
      </span>
    </span>
  )
}

// ─── Countries (no localization — internationally recognized names) ───────────

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Argentina',
  'Australia',
  'Austria',
  'Belgium',
  'Bolivia',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Croatia',
  'Czech Republic',
  'Denmark',
  'Egypt',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'India',
  'Indonesia',
  'Iran',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Jordan',
  'Kenya',
  'South Korea',
  'Malaysia',
  'Mexico',
  'Morocco',
  'Netherlands',
  'New Zealand',
  'Nigeria',
  'Norway',
  'Pakistan',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Romania',
  'Russia',
  'Saudi Arabia',
  'South Africa',
  'Spain',
  'Sweden',
  'Switzerland',
  'Thailand',
  'Turkey',
  'Ukraine',
  'United Kingdom',
  'United States',
  'Venezuela',
  'Vietnam',
]

// ─── Localized fruit hook ──────────────────────────────────────────────────────

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

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: function Default() {
    const { t } = useTranslation()
    const fruits = useFruits()
    return (
      <div style={{ width: 240 }}>
        <ComboboxRoot items={fruits}>
          <ComboboxInput placeholder={t('combobox.chooseAFruit')} />
          <ComboboxList>
            {(fruit: string) => (
              <ComboboxItem key={fruit} value={fruit}>
                {fruit}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── With default value ───────────────────────────────────────────────────────

export const WithDefaultValue: Story = {
  render: function WithDefaultValue() {
    const { t } = useTranslation()
    const fruits = useFruits()
    const mango = t('fruits.mango')
    return (
      <div style={{ width: 240 }}>
        <ComboboxRoot items={fruits} defaultValue={mango}>
          <ComboboxInput placeholder={t('combobox.chooseAFruit')} />
          <ComboboxList>
            {(fruit: string) => (
              <ComboboxItem key={fruit} value={fruit}>
                {fruit}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

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
          <ComboboxRoot key={size} items={fruits}>
            <ComboboxInput
              size={size}
              placeholder={t('combobox.placeholderSize', {
                size: size.toUpperCase(),
              })}
            />
            <ComboboxList>
              {(fruit: string) => (
                <ComboboxItem key={fruit} value={fruit}>
                  {fruit}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxRoot>
        ))}
      </div>
    )
  },
}

// ─── Grouped ─────────────────────────────────────────────────────────────────

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
        <ComboboxRoot items={produce}>
          <ComboboxInput placeholder={t('combobox.searchProduce')} />
          <ComboboxList>
            {(group: (typeof produce)[0]) => (
              <ComboboxGroup key={group.value} label={group.value} items={group.items}>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── Multiple select ──────────────────────────────────────────────────────────

export const Multiple: Story = {
  render: function Multiple() {
    const { t } = useTranslation()
    const fruits = useFruits()
    const apple = t('fruits.apple')
    const mango = t('fruits.mango')
    return (
      <div style={{ width: 300 }}>
        <ComboboxRoot multiple items={fruits} defaultValue={[apple, mango]}>
          <ComboboxMultiInput<string> placeholder={t('combobox.addFruits')}>
            {(item) => (
              <ComboboxChip
                key={item}
                chipRemoveProps={{
                  'aria-label': t('combobox.removeItem', { item }),
                }}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {item}
              </ComboboxChip>
            )}
          </ComboboxMultiInput>
          <ComboboxList>
            {(fruit: string) => (
              <ComboboxItem key={fruit} value={fruit}>
                {fruit}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── Multiple select (default chips) ─────────────────────────────────────────

export const MultipleDefault: Story = {
  render: function MultipleDefault() {
    const { t } = useTranslation()
    const fruits = useFruits()
    const apple = t('fruits.apple')
    const mango = t('fruits.mango')
    return (
      <div style={{ width: 300 }}>
        <ComboboxRoot multiple items={fruits} defaultValue={[apple, mango]}>
          <ComboboxMultiInput placeholder={t('combobox.addFruits')} />
          <ComboboxList>
            {(fruit: string) => (
              <ComboboxItem key={fruit} value={fruit}>
                {fruit}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: function Disabled() {
    const { t } = useTranslation()
    const fruits = useFruits()
    const cherry = t('fruits.cherry')
    return (
      <div style={{ width: 240 }}>
        <ComboboxRoot items={fruits} defaultValue={cherry} disabled>
          <ComboboxInput placeholder={t('combobox.chooseAFruit')} />
          <ComboboxList>
            {(fruit: string) => (
              <ComboboxItem key={fruit} value={fruit}>
                {fruit}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── With label ───────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  render: function WithLabel() {
    const { t } = useTranslation()
    const fruits = useFruits()
    return (
      <div style={{ width: 240 }}>
        <label
          htmlFor='favorite-fruit'
          style={{
            display: 'block',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-fg)',
            marginBlockEnd: 'var(--space-1)',
          }}
        >
          {t('combobox.favouriteFruit')}
        </label>
        <ComboboxRoot items={fruits}>
          <ComboboxInput inputId='favorite-fruit' placeholder={t('combobox.chooseAFruit')} />
          <ComboboxList>
            {(fruit: string) => (
              <ComboboxItem key={fruit} value={fruit}>
                {fruit}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── Object values ────────────────────────────────────────────────────────────

export const ObjectValues: Story = {
  render: function ObjectValues() {
    const { t } = useTranslation()
    return (
      <div style={{ width: 300 }}>
        <ComboboxRoot
          items={teamMembers}
          isItemEqualToValue={(item: TeamMember, value: TeamMember) => item.id === value.id}
          itemToStringLabel={(item: TeamMember) => item.name}
        >
          <ComboboxInput placeholder={t('combobox.assignTo')} />
          <ComboboxList>
            {(member: TeamMember) => (
              <ComboboxItem key={member.id} value={member}>
                <MemberItem member={member} />
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

export const IDValues: Story = {
  render: function IDValues() {
    const { t } = useTranslation()
    const [selectedId, setSelectedId] = React.useState<number | null>(null)

    return (
      <div style={{ width: 300 }}>
        <ComboboxRoot<number, false, TeamMember>
          items={teamMemberItems}
          value={selectedId}
          onValueChange={setSelectedId}
        >
          <ComboboxInput placeholder={t('combobox.assignTo')} />
          <ComboboxList<TeamMember>>
            {(member) => (
              <ComboboxItem key={member.id} value={member.id}>
                <MemberItem member={member} />
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
        <p>Selected ID: {selectedId ?? 'None'}</p>
      </div>
    )
  },
}

// ─── Object values (multiple) ─────────────────────────────────────────────────

export const ObjectValuesMultiple: Story = {
  render: function ObjectValuesMultiple() {
    const { t } = useTranslation()
    return (
      <div style={{ width: 340 }}>
        <ComboboxRoot
          multiple
          items={teamMembers}
          defaultValue={[teamMembers[0]!, teamMembers[2]!]}
          isItemEqualToValue={(item: TeamMember, value: TeamMember) => item.id === value.id}
          itemToStringLabel={(item: TeamMember) => item.name}
        >
          <ComboboxMultiInput<TeamMember> placeholder={t('combobox.assignReviewers')}>
            {(member) => (
              <ComboboxChip
                key={member.id}
                chipRemoveProps={{
                  'aria-label': t('combobox.removeItem', { item: member.name }),
                }}
              >
                {member.name}
              </ComboboxChip>
            )}
          </ComboboxMultiInput>
          <ComboboxList>
            {(member: TeamMember) => (
              <ComboboxItem key={member.id} value={member}>
                <MemberItem member={member} />
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── Object values (multiple, default chips) ──────────────────────────────────

export const ObjectValuesMultipleDefault: Story = {
  render: function ObjectValuesMultipleDefault() {
    const { t } = useTranslation()
    return (
      <div style={{ width: 340 }}>
        <ComboboxRoot
          multiple
          items={teamMembers}
          defaultValue={[teamMembers[0]!, teamMembers[2]!]}
          isItemEqualToValue={(item: TeamMember, value: TeamMember) => item.id === value.id}
          itemToStringLabel={(item: TeamMember) => item.name}
        >
          <ComboboxMultiInput<TeamMember> placeholder={t('combobox.assignReviewers')} />
          <ComboboxList>
            {(member: TeamMember) => (
              <ComboboxItem key={member.id} value={member}>
                <MemberItem member={member} />
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── Value + label objects ────────────────────────────────────────────────────

interface LabeledOption {
  value: string
  label: string
}

const labeledOptions: LabeledOption[] = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'py', label: 'Python' },
  { value: 'rs', label: 'Rust' },
  { value: 'go', label: 'Go' },
]

export const ValueLabelObjects: Story = {
  render: function ValueLabelObjects() {
    const { t } = useTranslation()
    return (
      <div style={{ width: 340 }}>
        <ComboboxRoot
          multiple
          items={labeledOptions}
          defaultValue={[labeledOptions[0]!, labeledOptions[1]!]}
          isItemEqualToValue={(a: LabeledOption, b: LabeledOption) => a.value === b.value}
        >
          <ComboboxMultiInput<LabeledOption> placeholder={t('combobox.pickLanguages')} />
          <ComboboxList>
            {(opt: LabeledOption) => (
              <ComboboxItem key={opt.value} value={opt}>
                {opt.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── Custom filter ────────────────────────────────────────────────────────────

export const CustomFilter: Story = {
  render: function CustomFilter() {
    const { t } = useTranslation()
    const fruits = useFruits()
    return (
      <div style={{ width: 240 }}>
        <ComboboxRoot
          items={fruits}
          filter={(item: string, query) => item.toLowerCase().startsWith(query.toLowerCase())}
        >
          <ComboboxInput placeholder={t('combobox.customFilterPlaceholder')} />
          <ComboboxList emptyMessage={t('combobox.noFruitsStart')}>
            {(fruit: string) => (
              <ComboboxItem key={fruit} value={fruit}>
                {fruit}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: function ControlledStory() {
    const { t } = useTranslation()
    const fruits = useFruits()
    const [value, setValue] = React.useState<string | null>(t('fruits.mango'))
    const presets = [
      t('fruits.apple'),
      t('fruits.banana'),
      t('fruits.mango'),
      t('fruits.strawberry'),
    ]

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          width: 240,
        }}
      >
        <ComboboxRoot items={fruits} value={value} onValueChange={(v) => setValue(v)}>
          <ComboboxInput placeholder={t('combobox.chooseAFruit')} />
          <ComboboxList>
            {(fruit: string) => (
              <ComboboxItem key={fruit} value={fruit}>
                {fruit}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-fg-subtle)',
            margin: 0,
          }}
        >
          {t('combobox.selectedLabel')}{' '}
          <strong style={{ color: 'var(--color-fg)' }}>{value ?? '—'}</strong>
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {presets.map((fruit) => (
            <button
              key={fruit}
              type='button'
              onClick={() => setValue(fruit)}
              style={{
                fontSize: 'var(--font-size-xs)',
                padding: '3px var(--space-2)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                background: value === fruit ? 'var(--color-primary)' : 'transparent',
                color: value === fruit ? '#fff' : 'var(--color-fg)',
                cursor: 'pointer',
              }}
            >
              {fruit}
            </button>
          ))}
          <button
            type='button'
            onClick={() => setValue(null)}
            style={{
              fontSize: 'var(--font-size-xs)',
              padding: '3px var(--space-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              color: 'var(--color-fg-subtle)',
              cursor: 'pointer',
            }}
          >
            {t('common.clear')}
          </button>
        </div>
      </div>
    )
  },
}

// ─── With disabled items ──────────────────────────────────────────────────────

export const WithDisabledItems: Story = {
  render: function WithDisabledItems() {
    const { t } = useTranslation()
    const fruits = useFruits()
    const outOfStock = new Set([t('fruits.durian'), t('fruits.elderberry'), t('fruits.papaya')])
    return (
      <div style={{ width: 240 }}>
        <ComboboxRoot items={fruits}>
          <ComboboxInput placeholder={t('combobox.chooseAFruit')} />
          <ComboboxList>
            {(fruit: string) => (
              <ComboboxItem key={fruit} value={fruit} disabled={outOfStock.has(fruit)}>
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: 'var(--space-2)',
                  }}
                >
                  <span>{fruit}</span>
                  {outOfStock.has(fruit) && (
                    <span
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        flexShrink: 0,
                      }}
                    >
                      {t('combobox.outOfStock')}
                    </span>
                  )}
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── Async search ─────────────────────────────────────────────────────────────

export const AsyncSearch: Story = {
  render: function AsyncSearchStory() {
    const { t } = useTranslation()
    const [filteredItems, setFilteredItems] = React.useState<string[]>([])
    const [inputValue, setInputValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
      if (!inputValue.trim()) {
        setFilteredItems([])
        setLoading(false)
        return
      }
      setLoading(true)
      const timer = setTimeout(() => {
        setFilteredItems(
          countries.filter((c) => c.toLowerCase().includes(inputValue.toLowerCase())),
        )
        setLoading(false)
      }, 350)
      return () => clearTimeout(timer)
    }, [inputValue])

    return (
      <div style={{ width: 260 }}>
        <ComboboxRoot
          items={filteredItems}
          filteredItems={filteredItems}
          inputValue={inputValue}
          onInputValueChange={(v) => setInputValue(v)}
        >
          <ComboboxInput placeholder={t('combobox.searchCountries')} clearable={false} />
          <ComboboxList
            statusMessage={
              loading ? t('common.loading') : !inputValue.trim() ? t('combobox.startTyping') : null
            }
            emptyMessage={t('combobox.noCountriesFound')}
          >
            {(country: string) => (
              <ComboboxItem key={country} value={country}>
                {country}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}

// ─── Async + controlled ───────────────────────────────────────────────────────

export const AsyncControlled: Story = {
  render: function AsyncControlledStory() {
    const { t } = useTranslation()
    const [value, setValue] = React.useState<string | null>('France')
    const [filteredItems, setFilteredItems] = React.useState<string[]>([])
    const [inputValue, setInputValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
      if (!inputValue.trim()) {
        setFilteredItems([])
        setLoading(false)
        return
      }
      setLoading(true)
      const timer = setTimeout(() => {
        setFilteredItems(
          countries.filter((c) => c.toLowerCase().includes(inputValue.toLowerCase())),
        )
        setLoading(false)
      }, 350)
      return () => clearTimeout(timer)
    }, [inputValue])

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          width: 260,
        }}
      >
        <ComboboxRoot
          items={filteredItems}
          filteredItems={filteredItems}
          value={value}
          onValueChange={(v) => setValue(v)}
          inputValue={inputValue}
          onInputValueChange={(v) => setInputValue(v)}
        >
          <ComboboxInput placeholder={t('combobox.searchCountries')} clearable={false} />
          <ComboboxList
            statusMessage={
              loading ? t('common.loading') : !inputValue.trim() ? t('combobox.startTyping') : null
            }
            emptyMessage={t('combobox.noCountriesFound')}
          >
            {(country: string) => (
              <ComboboxItem key={country} value={country}>
                {country}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-fg-subtle)',
            margin: 0,
          }}
        >
          {t('combobox.selectedLabel')}{' '}
          <strong style={{ color: 'var(--color-fg)' }}>{value ?? '—'}</strong>
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {(['France', 'Germany', 'Japan', 'Brazil'] as const).map((country) => (
            <button
              key={country}
              type='button'
              onClick={() => setValue(country)}
              style={{
                fontSize: 'var(--font-size-xs)',
                padding: '3px var(--space-2)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                background: value === country ? 'var(--color-primary)' : 'transparent',
                color: value === country ? '#fff' : 'var(--color-fg)',
                cursor: 'pointer',
              }}
            >
              {country}
            </button>
          ))}
          <button
            type='button'
            onClick={() => setValue(null)}
            style={{
              fontSize: 'var(--font-size-xs)',
              padding: '3px var(--space-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              color: 'var(--color-fg-subtle)',
              cursor: 'pointer',
            }}
          >
            {t('common.clear')}
          </button>
        </div>
      </div>
    )
  },
}

// ─── Async multiple ───────────────────────────────────────────────────────────

export const AsyncMultiple: Story = {
  render: function AsyncMultipleStory() {
    const { t } = useTranslation()
    const [value, setValue] = React.useState<TeamMember[]>([])
    const [filteredItems, setFilteredItems] = React.useState<TeamMember[]>([])
    const [inputValue, setInputValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
      if (!inputValue.trim()) {
        setFilteredItems(value)
        setLoading(false)
        return
      }
      setLoading(true)
      const timer = setTimeout(() => {
        const results = teamMembers.filter((m) =>
          m.name.toLowerCase().includes(inputValue.toLowerCase()),
        )
        const selectedIds = new Set(value.map((m) => m.id))
        const merged = [...value, ...results.filter((r) => !selectedIds.has(r.id))]
        setFilteredItems(merged)
        setLoading(false)
      }, 350)
      return () => clearTimeout(timer)
    }, [inputValue, value])

    return (
      <div style={{ width: 340 }}>
        <ComboboxRoot
          multiple
          items={filteredItems}
          filteredItems={filteredItems}
          value={value}
          onValueChange={(v) => setValue(v ?? [])}
          inputValue={inputValue}
          onInputValueChange={(v) => setInputValue(v)}
          isItemEqualToValue={(item, val) => item.id === val.id}
          itemToStringLabel={(item) => item.name}
        >
          <ComboboxMultiInput<TeamMember> placeholder={t('combobox.searchTeamMembers')}>
            {(member) => (
              <ComboboxChip
                key={member.id}
                chipRemoveProps={{
                  'aria-label': t('combobox.removeItem', { item: member.name }),
                }}
              >
                {member.name}
              </ComboboxChip>
            )}
          </ComboboxMultiInput>
          <ComboboxList
            statusMessage={
              loading
                ? t('common.loading')
                : !inputValue.trim() && value.length === 0
                  ? t('combobox.teamMembersToAdd')
                  : null
            }
            emptyMessage={t('combobox.noTeamMembersFound')}
          >
            {(member: TeamMember) => (
              <ComboboxItem key={member.id} value={member}>
                <MemberItem member={member} />
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </div>
    )
  },
}
