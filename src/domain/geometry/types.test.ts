import { describe, expect, it } from 'vitest'
import {
  CanonicalLocalPolygonSchema,
  LocalPolygonSchema,
  canonicalizePolygonWinding,
  signedPolygonAreaSquareMeters,
} from './types'

const counterClockwiseSquare = [
  { xMeters: 0, yMeters: 0 },
  { xMeters: 2, yMeters: 0 },
  { xMeters: 2, yMeters: 2 },
  { xMeters: 0, yMeters: 2 },
]

const clockwiseSquare = [...counterClockwiseSquare].reverse()

describe('local polygon contract', () => {
  it('computes signed area using +X East / +Y North', () => {
    expect(signedPolygonAreaSquareMeters(counterClockwiseSquare)).toBe(4)
    expect(signedPolygonAreaSquareMeters(clockwiseSquare)).toBe(-4)
  })

  it('rejects degenerate polygons', () => {
    expect(() =>
      LocalPolygonSchema.parse([
        { xMeters: 0, yMeters: 0 },
        { xMeters: 1, yMeters: 0 },
        { xMeters: 2, yMeters: 0 },
      ]),
    ).toThrow()
  })

  it('requires counter-clockwise canonical winding', () => {
    expect(CanonicalLocalPolygonSchema.parse(counterClockwiseSquare)).toEqual(
      counterClockwiseSquare,
    )
    expect(() => CanonicalLocalPolygonSchema.parse(clockwiseSquare)).toThrow()
  })

  it('canonicalizes winding only when explicitly requested', () => {
    const result = canonicalizePolygonWinding(clockwiseSquare)
    expect(signedPolygonAreaSquareMeters(result)).toBeGreaterThan(0)
  })
})
