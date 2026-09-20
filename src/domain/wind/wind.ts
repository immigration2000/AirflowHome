import type { WorldVector2 } from '../geo/types'

const FULL_CIRCLE_DEG = 360
const HALF_CIRCLE_DEG = 180
const DEGREES_TO_RADIANS = Math.PI / 180

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

export function windFromToUnitVector(windFromDeg: number): WorldVector2 {
  return meteorologicalToUnitVector(windFromToDeg(windFromDeg))
}
