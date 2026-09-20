import { describe, expect, it } from 'vitest'
import {
  FreshnessSchema,
  SimulationTimeContextSchema,
  TemporalProvenanceSchema,
} from './types'

describe('TemporalProvenanceSchema', () => {
  it('keeps observation, forecast, and fetch time semantically separate', () => {
    const value = {
      observedAt: '2026-09-20T20:00:00+09:00',
      forecastFor: '2026-09-20T21:00:00+09:00',
      fetchedAt: '2026-09-20T20:05:00+09:00',
    }

    expect(TemporalProvenanceSchema.parse(value)).toEqual(value)
  })
})

describe('FreshnessSchema', () => {
  it('accepts fresh/stale/unknown states', () => {
    expect(FreshnessSchema.parse({ state: 'unknown' })).toEqual({
      state: 'unknown',
    })
    expect(
      FreshnessSchema.parse({
        state: 'stale',
        ageSeconds: 7200,
        maxAgeSeconds: 3600,
      }),
    ).toEqual({
      state: 'stale',
      ageSeconds: 7200,
      maxAgeSeconds: 3600,
    })
  })

  it('rejects negative age', () => {
    expect(() =>
      FreshnessSchema.parse({ state: 'fresh', ageSeconds: -1 }),
    ).toThrow()
  })
})

describe('SimulationTimeContextSchema', () => {
  it('requires an explicit simulation time and timezone', () => {
    expect(
      SimulationTimeContextSchema.parse({
        simulationAt: '2026-09-20T22:00:00+09:00',
        timeZone: 'Asia/Seoul',
      }),
    ).toEqual({
      simulationAt: '2026-09-20T22:00:00+09:00',
      timeZone: 'Asia/Seoul',
    })
  })
})
