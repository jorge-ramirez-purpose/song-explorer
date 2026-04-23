import { describe, it, expect } from 'vitest'
import { cn } from '../cn'

describe('cn', () => {
  it('joins multiple class strings', () => {
    expect(cn('px-4', 'py-2', 'rounded')).toBe('px-4 py-2 rounded')
  })

  it('filters out falsy values', () => {
    expect(cn('px-4', false, 'py-2', undefined, 'rounded', null)).toBe('px-4 py-2 rounded')
  })

  it('handles empty input', () => {
    expect(cn()).toBe('')
  })

  it('handles conditional classes', () => {
    const isActive = true
    expect(cn('base-class', isActive && 'active-class')).toBe('base-class active-class')
  })

  it('handles all falsy input', () => {
    expect(cn(false, undefined, null)).toBe('')
  })
})
