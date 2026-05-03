// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readParams, writeParams } from '../useUrlParams'

const setUrl = (search: string) => {
  Object.defineProperty(window, 'location', {
    value: { search, pathname: '/' },
    writable: true,
  })
}

beforeEach(() => {
  setUrl('')
  vi.spyOn(history, 'replaceState').mockImplementation(() => {})
})

describe('readParams', () => {
  it('returns defaults when URL has no params', () => {
    expect(readParams()).toEqual({ search: '', levels: [], favorites: false })
  })

  it('filters out invalid level values', () => {
    setUrl('?level=abc&level=-1&level=0&level=5')
    expect(readParams().levels).toEqual([5])
  })

  it('treats non-true favorites values as false', () => {
    setUrl('?favorites=yes')
    expect(readParams().favorites).toBe(false)
  })
})

describe('writeParams', () => {
  it('removes params when values are empty or false', () => {
    setUrl('?search=canon&level=5&favorites=true')
    writeParams({ search: '', levels: [], favorites: false })
    expect(history.replaceState).toHaveBeenCalledWith(null, '', '/')
  })

  it('preserves unrelated params when updating', () => {
    setUrl('?search=canon&level=5')
    writeParams({ favorites: true })
    expect(history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      '?search=canon&level=5&favorites=true',
    )
  })
})
