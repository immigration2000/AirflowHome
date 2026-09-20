import { describe, expect, it } from 'vitest'
import {
  CanonicalLocalPolygonSchema,
  LocalPolygonSchema,
  canonicalizePolygonWinding,
  hasSelfIntersection,
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

  it('detects non-adjacent edge self-intersection', () => {
    const bowTie = [
      { xMeters: 0, yMeters: 0 },
      { xMeters: 4, yMeters: 4 },
      { xMeters: 0, yMeters: 4 },
      { xMeters: 4, yMeters: 0 },
    ]

    expect(hasSelfIntersection(bowTie)).toBe(true)
    expect(() => LocalPolygonSchema.parse(bowTie)).toThrow(
      /must not self-intersect/,
    )
  })

  it('does not treat adjacent shared vertices as self-intersection', () => {
    expect(hasSelfIntersection(counterClockwiseSquare)).toBe(false)
    expect(LocalPolygonSchema.parse(counterClockwiseSquare)).toEqual(
      counterClockwiseSquare,
    )
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
