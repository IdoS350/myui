import { Spinner } from '@/components/Spinner/Spinner'
import type { Meta, StoryObj } from '@storybook/react'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDelayedLoading } from './useDelayedLoading'

export default {
  title: 'Hooks/useDelayedLoading',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '```ts',
          'function useDelayedLoading(',
          '  isLoading: boolean,',
          '  delayBeforeLoading?: number,',
          '  minLoadingDuration?: number,',
          '): boolean',
          '```',
          '',
          '| Name | Type | Description |',
          '|---|---|---|',
          '| `isLoading` | `boolean` | The raw loading state to smooth out. |',
          '| `delayBeforeLoading` | `number` | Milliseconds `isLoading` must stay `true` before the delayed state flips on (default `200`). Avoids a spinner flash for very fast requests. |',
          '| `minLoadingDuration` | `number` | Once the delayed state turns on, the minimum milliseconds it stays `true` even if `isLoading` turns `false` sooner (default `400`). Avoids a jarring instant flip-off. |',
          '| **Returns** | `boolean` | The delayed loading state — drive spinners/skeletons off this instead of the raw flag. |',
        ].join('\n'),
      },
    },
  },
} satisfies Meta

type Story = StoryObj

const demoStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--font-size-sm)',
  minWidth: 260,
}
const labelStyle: React.CSSProperties = { color: 'var(--color-fg-subtle)' }
const valueStyle: React.CSSProperties = {
  fontWeight: 600,
  color: 'var(--color-fg)',
}
const buttonRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--space-2)',
}
const buttonStyle: React.CSSProperties = {
  padding: 'var(--space-2) var(--space-4)',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-border)',
  cursor: 'pointer',
}
const statusRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  height: 24,
}

export const Default: Story = {
  name: 'useDelayedLoading',
  render: function Default() {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const delayedIsLoading = useDelayedLoading(isLoading)

    const simulateFetch = (duration: number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setIsLoading(true)
      timeoutRef.current = setTimeout(() => setIsLoading(false), duration)
    }

    return (
      <div style={demoStyle}>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={() => simulateFetch(100)}>
            {t('hooks.quickFetch')}
          </button>
          <button style={buttonStyle} onClick={() => simulateFetch(1200)}>
            {t('hooks.slowFetch')}
          </button>
        </div>
        <span style={labelStyle}>
          {t('hooks.rawIsLoading')}{' '}
          <span
            style={{ ...valueStyle, color: isLoading ? 'var(--color-accent)' : 'var(--color-fg)' }}
          >
            {isLoading ? t('hooks.true') : t('hooks.false')}
          </span>
        </span>
        <span style={labelStyle}>
          {t('hooks.delayedIsLoading')}{' '}
          <span
            style={{
              ...valueStyle,
              color: delayedIsLoading ? 'var(--color-accent)' : 'var(--color-fg)',
            }}
          >
            {delayedIsLoading ? t('hooks.true') : t('hooks.false')}
          </span>
        </span>
        <div style={statusRowStyle}>
          {delayedIsLoading ? (
            <Spinner size='sm' />
          ) : (
            <span style={labelStyle}>{t('hooks.idle')}</span>
          )}
        </div>
      </div>
    )
  },
}

export const QuickFetchNoFlash: Story = {
  name: 'Quick fetch — no spinner flash',
  parameters: {
    docs: {
      description: {
        story:
          'A request that resolves before `delayBeforeLoading` (200 ms) never flips the delayed state on, so no spinner flashes for near-instant loads.',
      },
    },
  },
  render: function QuickFetchNoFlash() {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const delayedIsLoading = useDelayedLoading(isLoading)

    const simulateFetch = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setIsLoading(true)
      timeoutRef.current = setTimeout(() => setIsLoading(false), 100)
    }

    return (
      <div style={demoStyle}>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={simulateFetch}>
            {t('hooks.quickFetch')}
          </button>
        </div>
        <span style={labelStyle}>
          {t('hooks.delayedIsLoading')}{' '}
          <span
            style={{
              ...valueStyle,
              color: delayedIsLoading ? 'var(--color-accent)' : 'var(--color-fg)',
            }}
          >
            {delayedIsLoading ? t('hooks.true') : t('hooks.false')}
          </span>
        </span>
        <div style={statusRowStyle}>
          {delayedIsLoading ? (
            <Spinner size='sm' />
          ) : (
            <span style={labelStyle}>{t('hooks.idle')}</span>
          )}
        </div>
      </div>
    )
  },
}

export const SlowFetchMinimumDuration: Story = {
  name: 'Slow fetch — minimum spinner duration',
  parameters: {
    docs: {
      description: {
        story:
          'Once the spinner appears it stays visible for at least `minLoadingDuration` (400 ms), even if `isLoading` turns `false` sooner, avoiding an instant flicker-off.',
      },
    },
  },
  render: function SlowFetchMinimumDuration() {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const delayedIsLoading = useDelayedLoading(isLoading)

    const simulateFetch = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setIsLoading(true)
      timeoutRef.current = setTimeout(() => setIsLoading(false), 250)
    }

    return (
      <div style={demoStyle}>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={simulateFetch}>
            {t('hooks.shortFetch')}
          </button>
        </div>
        <span style={labelStyle}>
          {t('hooks.rawIsLoading')}{' '}
          <span
            style={{
              ...valueStyle,
              color: isLoading ? 'var(--color-accent)' : 'var(--color-fg)',
            }}
          >
            {isLoading ? t('hooks.true') : t('hooks.false')}
          </span>
        </span>
        <span style={labelStyle}>
          {t('hooks.delayedIsLoading')}{' '}
          <span
            style={{
              ...valueStyle,
              color: delayedIsLoading ? 'var(--color-accent)' : 'var(--color-fg)',
            }}
          >
            {delayedIsLoading ? t('hooks.true') : t('hooks.false')}
          </span>
        </span>
        <div style={statusRowStyle}>
          {delayedIsLoading ? (
            <Spinner size='sm' />
          ) : (
            <span style={labelStyle}>{t('hooks.idle')}</span>
          )}
        </div>
      </div>
    )
  },
}
