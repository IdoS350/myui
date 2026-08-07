import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useIntersectionObserver } from './useIntersectionObserver'

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []
  callback: ObserverCallback
  options?: IntersectionObserverInit
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()

  constructor(callback: ObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback
    this.options = options
    MockIntersectionObserver.instances.push(this)
  }
}

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = []
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns null when there is no target', () => {
    const { result } = renderHook(() => useIntersectionObserver(null))
    expect(result.current).toBeNull()
  })

  it('observes the target and stores the latest entry', () => {
    const target = document.createElement('div')
    const { result } = renderHook(() => useIntersectionObserver(target))

    const instance = MockIntersectionObserver.instances[0]
    expect(instance).toBeDefined()
    expect(instance!.observe).toHaveBeenCalledWith(target)

    const entry = { isIntersecting: true } as IntersectionObserverEntry
    act(() => instance!.callback([entry]))

    expect(result.current).toBe(entry)
  })

  it('disconnects the previous observer when the target changes', () => {
    const targetA = document.createElement('div')
    const targetB = document.createElement('span')
    const { rerender } = renderHook(({ target }) => useIntersectionObserver(target), {
      initialProps: { target: targetA as Element | null },
    })

    const first = MockIntersectionObserver.instances[0]
    rerender({ target: targetB })

    expect(first!.disconnect).toHaveBeenCalled()
    expect(MockIntersectionObserver.instances).toHaveLength(2)
  })

  it('disconnects on unmount', () => {
    const target = document.createElement('div')
    const { unmount } = renderHook(() => useIntersectionObserver(target))

    const instance = MockIntersectionObserver.instances[0]
    unmount()

    expect(instance!.disconnect).toHaveBeenCalled()
  })
})
