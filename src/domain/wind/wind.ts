const FULL_CIRCLE_DEG = 360
const HALF_CIRCLE_DEG = 180

export function normalizeDegrees(degrees: number): number {
  if (!Number.isFinite(degrees)) {
    throw new RangeError('degrees must be finite')
  }

  return ((degrees % FULL_CIRCLE_DEG) + FULL_CIRCLE_DEG) % FULL_CIRCLE_DEG
}

export function windFromToDeg(windFromDeg: number): number {
  return normalizeDegrees(windFromDeg + HALF_CIRCLE_DEG)
}
