import { describe, expect, it } from 'vitest'
import {
  ConfidenceSchema,
  IsoDateTimeSchema,
  MeteorologicalDegreesSchema,
} from './primitives'

describe('ConfidenceSchema', () => {
  it.each([0, 0.25, 1])('accepts %s', (value) => {
    expect(ConfidenceSchema.parse(value)).toBe(value)
  })

  it.each([-0.01, 1.01, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects %s',
    (value) => {
      expect(() => ConfidenceSchema.parse(value)).toThrow()
    },
  )
})

describe('MeteorologicalDegreesSchema', () => {
  it.each([0, 90, 359.999])('accepts %s°', (value) => {
    expect(MeteorologicalDegreesSchema.parse(value)).toBe(value)
  })

  it.each([-1, 360, 720])('rejects %s°', (value) => {
    expect(() => MeteorologicalDegreesSchema.parse(value)).toThrow()
  })
})

describe('IsoDateTimeSchema', () => {
  it('requires an offset-aware ISO datetime', () => {
    expect(IsoDateTimeSchema.parse('2026-09-20T22:00:00+09:00')).toBe(
      '2026-09-20T22:00:00+09:00',
    )
    expect(() => IsoDateTimeSchema.parse('2026-09-20T22:00:00')).toThrow()
  })
})
