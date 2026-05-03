// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello'))
    expect(result.current).toBe('hello')
  })

  it('does not update before the delay elapses', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'hello' },
    })
    rerender({ value: 'world' })
    act(() => { vi.advanceTimersByTime(299) })
    expect(result.current).toBe('hello')
  })

  it('updates after the default delay of 300ms', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'hello' },
    })
    rerender({ value: 'world' })
    act(() => { vi.advanceTimersByTime(300) })
    expect(result.current).toBe('world')
  })

  it('only emits the last value when changed rapidly', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'a' },
    })
    rerender({ value: 'b' })
    rerender({ value: 'c' })
    rerender({ value: 'd' })
    act(() => { vi.advanceTimersByTime(300) })
    expect(result.current).toBe('d')
  })

  it('respects a custom delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'hello' },
    })
    rerender({ value: 'world' })
    act(() => { vi.advanceTimersByTime(499) })
    expect(result.current).toBe('hello')
    act(() => { vi.advanceTimersByTime(1) })
    expect(result.current).toBe('world')
  })
})
