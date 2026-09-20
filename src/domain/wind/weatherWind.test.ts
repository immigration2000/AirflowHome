import { describe, expect, it } from 'vitest'
import { parseWeatherWind } from './weatherWind'

const validInput = {
  windFromDeg: 225,
  speedMps: 3.2,
  provenance: {
    source: 'provider',
    confidence: 0.95,
    provider: 'fixture-weather',
    temporal: {
      observedAt: '2026-09-20T21:00:00+09:00',
      fetchedAt: '2026-09-20T21:05:00+09:00',
    },
    freshness: {
      state: 'fresh',
      ageSeconds: 300,
      maxAgeSeconds: 3600,
    },
  },
} as const

describe('parseWeatherWind', () => {
  it('accepts a validated normalized weather wind object', () => {
    expect(parseWeatherWind(validInput)).toEqual(validInput)
  })

  it('rejects negative wind speed', () => {
    expect(() =>
      parseWeatherWind({ ...validInput, speedMps: -0.1 }),
    ).toThrow()
  })

  it('rejects non-normalized meteorological direction', () => {
    expect(() =>
      parseWeatherWind({ ...validInput, windFromDeg: 360 }),
    ).toThrow()
  })

  it('rejects unknown fields at the domain boundary', () => {
    expect(() =>
      parseWeatherWind({ ...validInput, providerSpecificField: 'leak' }),
    ).toThrow()
  })
})
