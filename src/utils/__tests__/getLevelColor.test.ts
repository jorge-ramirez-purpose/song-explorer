import { describe, it, expect } from 'vitest'
import { getLevelColor } from '../levelColor'
import { colors } from '@/constants/colors'

describe('getLevelColor', () => {
  it('returns green for level 1-5', () => {
    expect(getLevelColor(1)).toBe(colors.green)
    expect(getLevelColor(3)).toBe(colors.green)
    expect(getLevelColor(5)).toBe(colors.green)
  })

  it('returns orange for level 6-10', () => {
    expect(getLevelColor(6)).toBe(colors.orange)
    expect(getLevelColor(8)).toBe(colors.orange)
    expect(getLevelColor(10)).toBe(colors.orange)
  })

  it('returns red for level 11-15', () => {
    expect(getLevelColor(11)).toBe(colors.red)
    expect(getLevelColor(13)).toBe(colors.red)
    expect(getLevelColor(15)).toBe(colors.red)
  })

  it('returns correct color at boundary levels', () => {
    expect(getLevelColor(5)).toBe(colors.green)
    expect(getLevelColor(6)).toBe(colors.orange)
    expect(getLevelColor(10)).toBe(colors.orange)
    expect(getLevelColor(11)).toBe(colors.red)
  })
})
