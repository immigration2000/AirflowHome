import { describe, expect, it } from 'vitest'
import {
  deriveWindLabState,
  getWindLabScenario,
  WIND_LAB_SCENARIOS,
} from './scenarios'

describe('Wind Lab scenarios', () => {
  it('uses unique deterministic scenario ids', () => {
    const ids = WIND_LAB_SCENARIOS.map((scenario) => scenario.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('derives the same result from the same scenario', () => {
    const scenario = getWindLabScenario('southwest-rectangle')
    expect(deriveWindLabState(scenario)).toEqual(deriveWindLabState(scenario))
  })

  it('derives north wind as southward flow', () => {
    const state = deriveWindLabState(getWindLabScenario('north-rectangle'))

    expect(state.windFromDeg).toBe(0)
    expect(state.windToDeg).toBe(180)
    expect(state.flowVector.xEast).toBeCloseTo(0, 12)
    expect(state.flowVector.yNorth).toBeCloseTo(-1, 12)
    expect(state.faces).toHaveLength(4)
  })

  it('normalizes editable direction inputs deterministically', () => {
    const scenario = getWindLabScenario('west-rectangle')
    const state = deriveWindLabState({ ...scenario, windFromDeg: -90 })

    expect(state.windFromDeg).toBe(270)
    expect(state.windToDeg).toBe(90)
  })
})
