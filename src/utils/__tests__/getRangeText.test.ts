import { describe, it, expect } from 'vitest'
import { getRangeText } from '../getRangeText'

describe('getRangeText', () => {
  it('returns empty string for empty array', () => {
    expect(getRangeText([])).toBe('')
  })

  it('returns a single level as just that number', () => {
    expect(getRangeText([5])).toBe('5')
  })

  it('returns a contiguous sequence as a range', () => {
    expect(getRangeText([3, 4, 5, 6])).toBe('3 - 6')
  })

  it('returns two consecutive levels individually', () => {
    expect(getRangeText([11, 12])).toBe('11, 12')
  })

  it('returns non-contiguous levels individually', () => {
    expect(getRangeText([1, 2, 4, 7, 10])).toBe('1, 2, 4, 7, 10')
  })

  it('returns mixed runs as ranges and individual values', () => {
    expect(getRangeText([1, 2, 3, 5, 7])).toBe('1 - 3, 5, 7')
  })

  it('sorts unsorted input before grouping', () => {
    expect(getRangeText([10, 1, 5])).toBe('1, 5, 10')
  })

  it('deduplicates levels before grouping', () => {
    expect(getRangeText([15, 5, 15, 1, 5])).toBe('1, 5, 15')
  })
})
