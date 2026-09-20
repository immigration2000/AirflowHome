import { describe, expect, it } from 'vitest'
import { getWindLabScenario } from './scenarios'
import { compareWindLabInputs } from './sensitivity'

describe('Wind Lab sensitivity foundation', () => {
  it('keeps a small direction perturbation small and deterministic', () => {
    const base = getWindLabScenario('southwest-rectangle')
    const perturbed = { ...base, windFromDeg: base.windFromDeg + 0.1 }

    const first = compareWindLabInputs(base, perturbed)
    const second = compareWindLabInputs(base, perturbed)

    expect(second).toEqual(first)
    expect(first.flowVectorDeltaMagnitude).toBeGreaterThan(0)
    expect(first.flowVectorDeltaMagnitude).toBeLessThan(0.002)
  })

  it('changing only speed does not change the unit flow direction', () => {
    const base = getWindLabScenario('west-rectangle')
    const comparison = compareWindLabInputs(base, {
      ...base,
      speedMps: base.speedMps + 0.1,
    })

    expect(comparison.speedDeltaMps).toBeCloseTo(0.1, 12)
    expect(comparison.flowVectorDeltaMagnitude).toBeCloseTo(0, 12)
  })
})
