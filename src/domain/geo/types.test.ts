import { describe, expect, it } from 'vitest'
import {
  GeoPointSchema,
  LocalMeterPointSchema,
  ScreenPointSchema,
} from './types'

describe('coordinate schemas', () => {
  it('validates geographic coordinate ranges', () => {
    expect(
      GeoPointSchema.parse({ latitude: 37.5665, longitude: 126.978 }),
    ).toEqual({ latitude: 37.5665, longitude: 126.978 })

    expect(() =>
      GeoPointSchema.parse({ latitude: 91, longitude: 126.978 }),
    ).toThrow()
  })

  it('keeps local meters and screen pixels structurally explicit', () => {
    expect(LocalMeterPointSchema.parse({ xMeters: 3, yMeters: -2 })).toEqual({
      xMeters: 3,
      yMeters: -2,
    })

    expect(ScreenPointSchema.parse({ xPx: 100, yPx: 200 })).toEqual({
      xPx: 100,
      yPx: 200,
    })
  })

  it('rejects coordinate-system field leakage', () => {
    expect(() =>
      LocalMeterPointSchema.parse({ xMeters: 1, yMeters: 2, xPx: 10 }),
    ).toThrow()
  })
})
