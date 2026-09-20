import { describe, expect, it } from 'vitest'
import {
  ConfidenceComponentsSchema,
  DomainIssueSchema,
  ModelCapabilitiesSchema,
  ProvenanceSchema,
  SimulationMetaSchema,
  WIND_DRIVEN_V1_CAPABILITIES,
} from './types'

describe('ProvenanceSchema', () => {
  it('rejects confidence outside [0, 1]', () => {
    expect(() =>
      ProvenanceSchema.parse({
        source: 'estimated',
        confidence: 1.1,
      }),
    ).toThrow()
  })

  it('accepts provenance with time and freshness metadata', () => {
    const value = {
      source: 'provider',
      confidence: 0.8,
      provider: 'fixture',
      method: 'observation',
      temporal: {
        observedAt: '2026-09-20T20:00:00+09:00',
        fetchedAt: '2026-09-20T20:05:00+09:00',
      },
      freshness: {
        state: 'fresh',
        ageSeconds: 300,
        maxAgeSeconds: 3600,
      },
    } as const

    expect(ProvenanceSchema.parse(value)).toEqual(value)
  })
})

describe('DomainIssueSchema', () => {
  it.each(['error', 'warning', 'limitation'] as const)(
    'represents %s separately',
    (kind) => {
      expect(
        DomainIssueSchema.parse({
          kind,
          code: 'EXAMPLE_CODE',
          details: { field: 'buildingHeight', estimated: true },
        }),
      ).toEqual({
        kind,
        code: 'EXAMPLE_CODE',
        details: { field: 'buildingHeight', estimated: true },
      })
    },
  )

  it('does not embed a user-facing message contract', () => {
    expect(() =>
      DomainIssueSchema.parse({
        kind: 'warning',
        code: 'EXAMPLE_CODE',
        message: 'UI text must live elsewhere',
      }),
    ).toThrow()
  })
})

describe('confidence components', () => {
  it('represents separate component confidence and an overall value', () => {
    expect(
      ConfidenceComponentsSchema.parse({
        weather: 0.9,
        geometry: 0.8,
        outdoorModel: 0.7,
        overall: 0.75,
      }),
    ).toEqual({
      weather: 0.9,
      geometry: 0.8,
      outdoorModel: 0.7,
      overall: 0.75,
    })
  })

  it('rejects invalid component confidence', () => {
    expect(() =>
      ConfidenceComponentsSchema.parse({
        geometry: -0.1,
        overall: 0.5,
      }),
    ).toThrow()
  })
})

describe('model capabilities', () => {
  it('defines the explicit wind-driven v1 capability boundary', () => {
    expect(ModelCapabilitiesSchema.parse(WIND_DRIVEN_V1_CAPABILITIES)).toEqual({
      windDriven: true,
      buoyancyDriven: false,
      terrainFlow: false,
      cfdTurbulence: false,
      mechanicalHvac: false,
    })
  })

  it('is required by simulation metadata', () => {
    const result = SimulationMetaSchema.parse({
      modelVersions: { outdoorWind: 'outdoor-wind-v1' },
      capabilities: WIND_DRIVEN_V1_CAPABILITIES,
      confidence: {
        geometry: 1,
        outdoorModel: 1,
        overall: 1,
      },
      issues: [],
    })

    expect(result.modelVersions.outdoorWind).toBe('outdoor-wind-v1')
  })
})
