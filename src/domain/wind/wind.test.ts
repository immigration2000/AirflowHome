import { describe, expect, it } from 'vitest'
import {
  meteorologicalToUnitVector,
  normalizeDegrees,
  unitVectorToMeteorologicalDeg,
  windFromToDeg,
  windFromToUnitVector,
} from './wind'

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

describe('meteorologicalToUnitVector', () => {
  it.each([
    [0, 0, 1],
    [90, 1, 0],
    [180, 0, -1],
    [270, -1, 0],
    [45, Math.SQRT1_2, Math.SQRT1_2],
  ])('maps TO %s° to +X East / +Y North', (degrees, xEast, yNorth) => {
    const vector = meteorologicalToUnitVector(degrees)

    expect(vector.xEast).toBeCloseTo(xEast, 12)
    expect(vector.yNorth).toBeCloseTo(yNorth, 12)
    expect(Math.hypot(vector.xEast, vector.yNorth)).toBeCloseTo(1, 12)
  })

  it('normalizes angles before conversion', () => {
    const vector = meteorologicalToUnitVector(450)
    expect(vector.xEast).toBeCloseTo(1, 12)
    expect(vector.yNorth).toBeCloseTo(0, 12)
  })
})

describe('unitVectorToMeteorologicalDeg', () => {
  it.each([0, 45, 90, 135, 180, 225, 270, 315])(
    'round-trips %s°',
    (degrees) => {
      const vector = meteorologicalToUnitVector(degrees)
      expect(unitVectorToMeteorologicalDeg(vector)).toBeCloseTo(degrees, 12)
    },
  )

  it('rejects a zero vector', () => {
    expect(() =>
      unitVectorToMeteorologicalDeg({ xEast: 0, yNorth: 0 }),
    ).toThrow(RangeError)
  })
})

describe('windFromToUnitVector', () => {
  it('converts a north wind FROM 0° into a southward flow vector', () => {
    const vector = windFromToUnitVector(0)
    expect(vector.xEast).toBeCloseTo(0, 12)
    expect(vector.yNorth).toBeCloseTo(-1, 12)
  })
})
