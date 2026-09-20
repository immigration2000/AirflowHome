import { z } from 'zod'
import type { LocalMeterPoint } from '../geo/types'
import { LocalMeterPointSchema } from '../geo/types'
import { NUMERICAL_TOLERANCES } from '../numerics/tolerances'

export function signedPolygonAreaSquareMeters(points: readonly LocalMeterPoint[]): number {
  if (points.length < 3) {
    return 0
  }

  let twiceArea = 0

  for (let index = 0; index < points.length; index += 1) {
    const current = points[index]
    const next = points[(index + 1) % points.length]
    twiceArea += current.xMeters * next.yMeters - next.xMeters * current.yMeters
  }

  return twiceArea / 2
}

function hasConsecutiveDuplicate(points: readonly LocalMeterPoint[]): boolean {
  const tolerance = NUMERICAL_TOLERANCES.geometryMeters

  return points.some((point, index) => {
    const next = points[(index + 1) % points.length]

    return (
      Math.abs(point.xMeters - next.xMeters) <= tolerance &&
      Math.abs(point.yMeters - next.yMeters) <= tolerance
    )
  })
}

export const LocalPolygonSchema = z
  .array(LocalMeterPointSchema)
  .min(3)
  .superRefine((points, context) => {
    if (hasConsecutiveDuplicate(points)) {
      context.addIssue({
        code: 'custom',
        message: 'polygon contains consecutive duplicate vertices',
      })
    }

    if (
      Math.abs(signedPolygonAreaSquareMeters(points)) <=
      NUMERICAL_TOLERANCES.polygonAreaSquareMeters
    ) {
      context.addIssue({
        code: 'custom',
        message: 'polygon area is too small or degenerate',
      })
    }
  })

export const CanonicalLocalPolygonSchema = LocalPolygonSchema.superRefine((points, context) => {
  if (
    signedPolygonAreaSquareMeters(points) <=
    NUMERICAL_TOLERANCES.polygonAreaSquareMeters
  ) {
    context.addIssue({
      code: 'custom',
      message: 'canonical polygon winding must be counter-clockwise',
    })
  }
})

export function canonicalizePolygonWinding(
  points: readonly LocalMeterPoint[],
): LocalMeterPoint[] {
  const validated = LocalPolygonSchema.parse(points)

  if (signedPolygonAreaSquareMeters(validated) > 0) {
    return [...validated]
  }

  return [...validated].reverse()
}

export type LocalPolygon = z.infer<typeof LocalPolygonSchema>
export type CanonicalLocalPolygon = z.infer<typeof CanonicalLocalPolygonSchema>
