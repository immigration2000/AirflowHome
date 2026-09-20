import type { WorldVector2 } from '../geo/types'
import { NUMERICAL_TOLERANCES } from '../numerics/tolerances'

const FULL_CIRCLE_DEG = 360
const HALF_CIRCLE_DEG = 180
const DEGREES_TO_RADIANS = Math.PI / 180
const RADIANS_TO_DEGREES = 180 / Math.PI

export function normalizeDegrees(degrees: number): number {
  if (!Number.isFinite(degrees)) {
    throw new RangeError('degrees must be finite')
  }

  return ((degrees % FULL_CIRCLE_DEG) + FULL_CIRCLE_DEG) % FULL_CIRCLE_DEG
}

export function windFromToDeg(windFromDeg: number): number {
  return normalizeDegrees(windFromDeg + HALF_CIRCLE_DEG)
}

export function meteorologicalToUnitVector(toDeg: number): WorldVector2 {
  const normalizedToDeg = normalizeDegrees(toDeg)
  const radians = normalizedToDeg * DEGREES_TO_RADIANS

  return {
    xEast: Math.sin(radians),
    yNorth: Math.cos(radians),
  }
}

export function unitVectorToMeteorologicalDeg(vector: WorldVector2): number {
  const magnitude = Math.hypot(vector.xEast, vector.yNorth)

  if (
    !Number.isFinite(magnitude) ||
    magnitude <= NUMERICAL_TOLERANCES.unitVector
  ) {
    throw new RangeError('vector magnitude must be non-zero and finite')
  }

  const radians = Math.atan2(vector.xEast / magnitude, vector.yNorth / magnitude)
  return normalizeDegrees(radians * RADIANS_TO_DEGREES)
}

export function windFromToUnitVector(windFromDeg: number): WorldVector2 {
  return meteorologicalToUnitVector(windFromToDeg(windFromDeg))
}
