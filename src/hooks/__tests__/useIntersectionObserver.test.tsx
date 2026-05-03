// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { useIntersectionObserver } from '../useIntersectionObserver'

type TIntersectionCallback = (entries: IntersectionObserverEntry[]) => void

const mockObserve = vi.fn()
const mockDisconnect = vi.fn()
let triggerIntersection: (isIntersecting: boolean) => void

beforeEach(() => {
  mockObserve.mockClear()
  mockDisconnect.mockClear()

  global.IntersectionObserver = vi.fn((callback: TIntersectionCallback) => {
    triggerIntersection = (isIntersecting) =>
      callback([{ isIntersecting } as IntersectionObserverEntry])
    return { observe: mockObserve, disconnect: mockDisconnect }
  }) as unknown as typeof IntersectionObserver
})

const TestComponent = ({ onIntersect }: { onIntersect: () => void }) => {
  const ref = useIntersectionObserver(onIntersect)
  return <div ref={ref} />
}

describe('useIntersectionObserver', () => {
  it('observes the element on mount', () => {
    render(<TestComponent onIntersect={vi.fn()} />)
    expect(mockObserve).toHaveBeenCalledTimes(1)
  })

  it('calls onIntersect when the element enters the viewport', () => {
    const onIntersect = vi.fn()
    render(<TestComponent onIntersect={onIntersect} />)
    triggerIntersection(true)
    expect(onIntersect).toHaveBeenCalledTimes(1)
  })

  it('does not call onIntersect when the element leaves the viewport', () => {
    const onIntersect = vi.fn()
    render(<TestComponent onIntersect={onIntersect} />)
    triggerIntersection(false)
    expect(onIntersect).not.toHaveBeenCalled()
  })

  it('disconnects the observer on unmount', () => {
    const { unmount } = render(<TestComponent onIntersect={vi.fn()} />)
    unmount()
    expect(mockDisconnect).toHaveBeenCalledTimes(1)
  })
})
