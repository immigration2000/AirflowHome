export const NUMERICAL_TOLERANCES = Object.freeze({
  scalar: 1e-9,
  unitVector: 1e-12,
  geometryMeters: 1e-6,
  polygonAreaSquareMeters: 1e-8,
})

export function approximatelyEqual(
  left: number,
  right: number,
  tolerance: number = NUMERICAL_TOLERANCES.scalar,
): boolean {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return false
  }

  if (!Number.isFinite(tolerance) || tolerance < 0) {
    throw new RangeError('tolerance must be a finite non-negative number')
  }

  return Math.abs(left - right) <= tolerance
}
