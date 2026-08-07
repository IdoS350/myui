import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDebouncedCallback } from './useDebouncedCallback'

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('does not call the callback before the delay has elapsed', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 200))

    act(() => result.current('a'))
    act(() => vi.advanceTimersByTime(199))

    expect(callback).not.toHaveBeenCalled()
  })

  it('calls the callback once the delay has elapsed', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 200))

    act(() => result.current('a'))
    act(() => vi.advanceTimersByTime(200))

    expect(callback).toHaveBeenCalledExactlyOnceWith('a')
  })

  it('coalesces rapid calls into a single invocation with the latest args', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 200))

    act(() => result.current('a'))
    act(() => vi.advanceTimersByTime(100))
    act(() => result.current('b'))
    act(() => vi.advanceTimersByTime(200))

    expect(callback).toHaveBeenCalledExactlyOnceWith('b')
  })

  it('invokes the latest callback even if it changed after scheduling', () => {
    const callbackA = vi.fn()
    const callbackB = vi.fn()
    const { result, rerender } = renderHook(({ callback }) => useDebouncedCallback(callback, 200), {
      initialProps: { callback: callbackA },
    })

    act(() => result.current('a'))
    rerender({ callback: callbackB })
    act(() => vi.advanceTimersByTime(200))

    expect(callbackA).not.toHaveBeenCalled()
    expect(callbackB).toHaveBeenCalledExactlyOnceWith('a')
  })

  it('clears the pending timer on unmount', () => {
    const callback = vi.fn()
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout')
    const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 200))

    act(() => result.current('a'))
    unmount()
    act(() => vi.advanceTimersByTime(200))

    expect(callback).not.toHaveBeenCalled()
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})
