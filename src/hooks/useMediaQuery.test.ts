import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useMediaQuery } from './useMediaQuery'

type Listener = (event: MediaQueryListEvent) => void

class MockMediaQueryList {
  matches: boolean
  media: string
  listeners = new Set<Listener>()

  constructor(media: string, matches: boolean) {
    this.media = media
    this.matches = matches
  }

  addEventListener = vi.fn((_: 'change', listener: Listener) => {
    this.listeners.add(listener)
  })

  removeEventListener = vi.fn((_: 'change', listener: Listener) => {
    this.listeners.delete(listener)
  })

  emit(matches: boolean) {
    this.matches = matches
    for (const listener of this.listeners) listener({ matches } as MediaQueryListEvent)
  }
}

describe('useMediaQuery', () => {
  let mediaQueryLists: Map<string, MockMediaQueryList>

  beforeEach(() => {
    mediaQueryLists = new Map()
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => {
        const existing = mediaQueryLists.get(query)
        if (existing) return existing
        const mql = new MockMediaQueryList(query, false)
        mediaQueryLists.set(query, mql)
        return mql
      }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns the initial match state', () => {
    mediaQueryLists.set('(min-width: 768px)', new MockMediaQueryList('(min-width: 768px)', true))
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('updates when the media query change event fires', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)

    const mql = mediaQueryLists.get('(min-width: 768px)')!
    act(() => mql.emit(true))

    expect(result.current).toBe(true)
  })

  it('unsubscribes from the previous query when the query changes', () => {
    const { rerender } = renderHook(({ query }) => useMediaQuery(query), {
      initialProps: { query: '(min-width: 768px)' },
    })

    const first = mediaQueryLists.get('(min-width: 768px)')!
    rerender({ query: '(min-width: 1024px)' })

    expect(first.removeEventListener).toHaveBeenCalled()
  })
})
