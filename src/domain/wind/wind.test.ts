import { describe, expect, it } from 'vitest'
import { normalizeDegrees, windFromToDeg } from './wind'

describe('normalizeDegrees', () => {
  it.each([
    [0, 0],
    [360, 0],
    [-1, 359],
    [721, 1],
  ])('normalizes %s° to %s°', (input, expected) => {
    expect(normalizeDegrees(input)).toBe(expected)
  })

  it('rejects non-finite values', () => {
    expect(() => normalizeDegrees(Number.NaN)).toThrow(RangeError)
  })
})

describe('windFromToDeg', () => {
  it.each([
    [0, 180],
    [90, 270],
    [180, 0],
    [270, 90],
    [225, 45],
  ])('converts meteorological FROM %s° to TO %s°', (from, to) => {
    expect(windFromToDeg(from)).toBe(to)
  })

  it('always returns [0, 360)', () => {
    for (let degrees = -1080; degrees <= 1080; degrees += 7) {
      const result = windFromToDeg(degrees)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(360)
    }
  })
})
