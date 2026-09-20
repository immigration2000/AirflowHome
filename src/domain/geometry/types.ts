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

function cross(
  a: LocalMeterPoint,
  b: LocalMeterPoint,
  c: LocalMeterPoint,
): number {
  return (
    (b.xMeters - a.xMeters) * (c.yMeters - a.yMeters) -
    (b.yMeters - a.yMeters) * (c.xMeters - a.xMeters)
  )
}

function pointOnSegment(
  point: LocalMeterPoint,
  start: LocalMeterPoint,
  end: LocalMeterPoint,
): boolean {
  const tolerance = NUMERICAL_TOLERANCES.geometryMeters

  if (Math.abs(cross(start, end, point)) > tolerance) {
    return false
  }

  return (
    point.xMeters >= Math.min(start.xMeters, end.xMeters) - tolerance &&
    point.xMeters <= Math.max(start.xMeters, end.xMeters) + tolerance &&
    point.yMeters >= Math.min(start.yMeters, end.yMeters) - tolerance &&
    point.yMeters <= Math.max(start.yMeters, end.yMeters) + tolerance
  )
}

function segmentsIntersect(
  aStart: LocalMeterPoint,
  aEnd: LocalMeterPoint,
  bStart: LocalMeterPoint,
  bEnd: LocalMeterPoint,
): boolean {
  const tolerance = NUMERICAL_TOLERANCES.geometryMeters
  const abC = cross(aStart, aEnd, bStart)
  const abD = cross(aStart, aEnd, bEnd)
  const cdA = cross(bStart, bEnd, aStart)
  const cdB = cross(bStart, bEnd, aEnd)

  const oppositeSides =
    ((abC > tolerance && abD < -tolerance) ||
      (abC < -tolerance && abD > tolerance)) &&
    ((cdA > tolerance && cdB < -tolerance) ||
      (cdA < -tolerance && cdB > tolerance))

  if (oppositeSides) {
    return true
  }

  return (
    (Math.abs(abC) <= tolerance && pointOnSegment(bStart, aStart, aEnd)) ||
    (Math.abs(abD) <= tolerance && pointOnSegment(bEnd, aStart, aEnd)) ||
    (Math.abs(cdA) <= tolerance && pointOnSegment(aStart, bStart, bEnd)) ||
    (Math.abs(cdB) <= tolerance && pointOnSegment(aEnd, bStart, bEnd))
  )
}

export function hasSelfIntersection(
  points: readonly LocalMeterPoint[],
): boolean {
  const edgeCount = points.length

  if (edgeCount < 4) {
    return false
  }

  for (let first = 0; first < edgeCount; first += 1) {
    const firstNext = (first + 1) % edgeCount

    for (let second = first + 1; second < edgeCount; second += 1) {
      const secondNext = (second + 1) % edgeCount

      const adjacent =
        first === second ||
        firstNext === second ||
        secondNext === first

      if (adjacent) {
        continue
      }

      if (
        segmentsIntersect(
          points[first],
          points[firstNext],
          points[second],
          points[secondNext],
        )
      ) {
        return true
      }
    }
  }

  return false
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

    if (hasSelfIntersection(points)) {
      context.addIssue({
        code: 'custom',
        message: 'polygon must not self-intersect',
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
