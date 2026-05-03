import { describe, it, expect } from 'vitest'
import { describeArc } from '../arcPath'

describe('describeArc', () => {
  it('returns a valid SVG path string', () => {
    const path = describeArc(50, 50, 38, 0, 90)
    expect(path).toMatch(/^M .+ A .+$/)
  })

  it('starts at 12 o\'clock for angle 0', () => {
    const path = describeArc(50, 50, 38, 0, 90)
    // At angle 0 (top), x = cx, y = cy - r
    expect(path).toMatch(/^M 50\.00 12\.00/)
  })

  it('uses large-arc-flag 0 for arcs under 180 degrees', () => {
    const path = describeArc(50, 50, 38, 0, 110)
    expect(path).toContain(' 0 1 ')
  })

  it('uses large-arc-flag 1 for arcs over 180 degrees', () => {
    const path = describeArc(50, 50, 38, 0, 200)
    expect(path).toContain(' 1 1 ')
  })
})
