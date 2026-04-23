import { describe, it, expect } from 'vitest'
import { getRangeText } from '../getRangeText'

describe('getRangeText', () => {
  it('returns empty string for empty array', () => {
    expect(getRangeText([])).toBe('')
  })

  it('returns single level as range', () => {
    expect(getRangeText([5])).toBe('5 - 5')
  })

  it('returns range for two levels', () => {
    expect(getRangeText([3, 7])).toBe('3 - 7')
  })

  it('sorts levels before calculating range', () => {
    expect(getRangeText([10, 1, 5])).toBe('1 - 10')
  })

  it('handles unsorted and duplicate levels', () => {
    expect(getRangeText([15, 5, 15, 1, 5])).toBe('1 - 15')
  })

  it('works with all 15 levels', () => {
    const allLevels = Array.from({ length: 15 }, (_, index) => index + 1)
    expect(getRangeText(allLevels)).toBe('1 - 15')
  })
})
