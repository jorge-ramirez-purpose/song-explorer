import { describe, it, expect } from 'vitest'
import { getLevelColor } from '../levelColor'
import { colors } from '@/constants/colors'

describe('getLevelColor', () => {
  it('returns green for levels 1-5', () => {
    expect(getLevelColor(1)).toBe(colors.green)
    expect(getLevelColor(5)).toBe(colors.green)
  })

  it('returns orange for levels 6-10', () => {
    expect(getLevelColor(6)).toBe(colors.orange)
    expect(getLevelColor(10)).toBe(colors.orange)
  })

  it('returns red for levels 11-15', () => {
    expect(getLevelColor(11)).toBe(colors.red)
    expect(getLevelColor(15)).toBe(colors.red)
  })
})
