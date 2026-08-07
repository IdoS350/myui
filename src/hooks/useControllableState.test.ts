import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useControllableState } from './useControllableState'

describe('useControllableState', () => {
  it('uses defaultValue in uncontrolled mode', () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 0 }))
    expect(result.current[0]).toBe(0)
  })

  it('updates internal state and calls onChange in uncontrolled mode', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() => useControllableState({ defaultValue: 0, onChange }))

    act(() => result.current[1](5))

    expect(result.current[0]).toBe(5)
    expect(onChange).toHaveBeenCalledWith(5)
  })

  it('reflects the value prop and ignores internal state in controlled mode', () => {
    const onChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, onChange }),
      { initialProps: { value: 1 } },
    )

    act(() => result.current[1](99))

    // Internal state is not used in controlled mode; value stays driven by the prop.
    expect(result.current[0]).toBe(1)
    expect(onChange).toHaveBeenCalledWith(99)

    rerender({ value: 2 })
    expect(result.current[0]).toBe(2)
  })

  it('calls the latest onChange without resubscribing', () => {
    const onChangeA = vi.fn()
    const onChangeB = vi.fn()
    const { result, rerender } = renderHook(
      ({ onChange }) => useControllableState({ defaultValue: 0, onChange }),
      { initialProps: { onChange: onChangeA } },
    )

    rerender({ onChange: onChangeB })
    act(() => result.current[1](1))

    expect(onChangeA).not.toHaveBeenCalled()
    expect(onChangeB).toHaveBeenCalledWith(1)
  })
})
