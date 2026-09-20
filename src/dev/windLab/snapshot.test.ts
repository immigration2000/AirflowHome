import { describe, expect, it } from 'vitest'
import { getWindLabScenario } from './scenarios'
import {
  createWindLabSnapshot,
  parseWindLabSnapshot,
  serializeWindLabSnapshot,
  SnapshotIntegrityError,
  UnsupportedSnapshotVersionError,
  WIND_LAB_MODEL_VERSION,
} from './snapshot'

const simulationTime = {
  simulationAt: '2026-09-20T22:00:00+09:00',
  timeZone: 'Asia/Seoul',
}

const confidence = {
  geometry: 1,
  outdoorModel: 1,
  overall: 1,
}

describe('Wind Lab snapshot', () => {
  it('round-trips deterministically without changing time semantics', () => {
    const scenario = getWindLabScenario('southwest-rectangle')
    const snapshot = createWindLabSnapshot({
      ...scenario,
      simulationTime,
      confidence,
    })

    const first = serializeWindLabSnapshot(snapshot)
    const parsed = parseWindLabSnapshot(first)
    const second = serializeWindLabSnapshot(parsed)

    expect(second).toBe(first)
    expect(parsed.simulationTime).toEqual(simulationTime)
    expect(parsed.modelVersions.outdoorWind).toBe(WIND_LAB_MODEL_VERSION)
  })

  it('requires a supported schema version', () => {
    const scenario = getWindLabScenario('north-rectangle')
    const serialized = serializeWindLabSnapshot(
      createWindLabSnapshot({
        ...scenario,
        simulationTime,
        confidence,
      }),
    )

    const raw = JSON.parse(serialized) as Record<string, unknown>
    raw.schemaVersion = 2

    expect(() => parseWindLabSnapshot(JSON.stringify(raw))).toThrow(
      UnsupportedSnapshotVersionError,
    )
  })

  it('detects a result that no longer matches deterministic replay', () => {
    const scenario = getWindLabScenario('west-rectangle')
    const serialized = serializeWindLabSnapshot(
      createWindLabSnapshot({
        ...scenario,
        simulationTime,
        confidence,
      }),
    )

    const raw = JSON.parse(serialized) as {
      result: { windToDeg: number }
    }
    raw.result.windToDeg = 123

    expect(() => parseWindLabSnapshot(JSON.stringify(raw))).toThrow(
      SnapshotIntegrityError,
    )
  })

  it('enforces confidence components inside [0, 1]', () => {
    const scenario = getWindLabScenario('east-square')

    expect(() =>
      createWindLabSnapshot({
        ...scenario,
        simulationTime,
        confidence: {
          geometry: 1.2,
          overall: 1,
        },
      }),
    ).toThrow()
  })
})
