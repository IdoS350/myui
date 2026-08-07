import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDelayedLoading } from './useDelayedLoading'

describe('useDelayedLoading', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts as false', () => {
    const { result } = renderHook(() => useDelayedLoading(false, 200, 400))
    expect(result.current).toBe(false)
  })

  it('skips the spinner for loads shorter than delayBeforeLoading', () => {
    const { result, rerender } = renderHook(
      ({ isLoading }) => useDelayedLoading(isLoading, 200, 400),
      { initialProps: { isLoading: true } },
    )

    act(() => vi.advanceTimersByTime(100))
    rerender({ isLoading: false })

    expect(result.current).toBe(false)
  })

  it('turns on once delayBeforeLoading elapses while still loading', () => {
    const { result } = renderHook(() => useDelayedLoading(true, 200, 400))

    act(() => vi.advanceTimersByTime(200))

    expect(result.current).toBe(true)
  })

  it('stays on for at least minLoadingDuration even if loading ends sooner', () => {
    const { result, rerender } = renderHook(
      ({ isLoading }) => useDelayedLoading(isLoading, 200, 400),
      { initialProps: { isLoading: true } },
    )

    act(() => vi.advanceTimersByTime(200))
    expect(result.current).toBe(true)

    rerender({ isLoading: false })
    act(() => vi.advanceTimersByTime(399))
    expect(result.current).toBe(true)

    act(() => vi.advanceTimersByTime(1))
    expect(result.current).toBe(false)
  })
})
