import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCopyToClipboard } from './useCopyToClipboard'

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    Object.assign(navigator, { clipboard: { writeText: vi.fn() } })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('starts with copied: false and no error', () => {
    const { result } = renderHook(() => useCopyToClipboard())
    expect(result.current[0]).toEqual({ copied: false, error: null })
  })

  it('sets copied: true after a successful copy, then resets after resetDelay', async () => {
    vi.mocked(navigator.clipboard.writeText).mockResolvedValue(undefined)
    const { result } = renderHook(() => useCopyToClipboard(2000))

    await act(async () => {
      await result.current[1]('hello')
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello')
    expect(result.current[0]).toEqual({ copied: true, error: null })

    act(() => vi.advanceTimersByTime(2000))
    expect(result.current[0]).toEqual({ copied: false, error: null })
  })

  it('sets an error when the copy fails', async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValue(new Error('denied'))
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await result.current[1]('hello')
    })

    expect(result.current[0].copied).toBe(false)
    expect(result.current[0].error).toBeInstanceOf(Error)
    expect(result.current[0].error?.message).toBe('denied')
  })

  it('clears the reset timer on unmount', async () => {
    vi.mocked(navigator.clipboard.writeText).mockResolvedValue(undefined)
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout')
    const { result, unmount } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      await result.current[1]('hello')
    })

    unmount()
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})
