import { describe, expect, it } from 'vitest'
import { approximatelyEqual, NUMERICAL_TOLERANCES } from './tolerances'

describe('approximatelyEqual', () => {
  it('uses an explicit named default tolerance', () => {
    expect(
      approximatelyEqual(
        1,
        1 + NUMERICAL_TOLERANCES.scalar / 2,
      ),
    ).toBe(true)
  })

  it('does not treat non-finite values as equal', () => {
    expect(approximatelyEqual(Number.NaN, Number.NaN)).toBe(false)
  })

  it('rejects an invalid tolerance', () => {
    expect(() => approximatelyEqual(1, 1, -1)).toThrow(RangeError)
  })
})
