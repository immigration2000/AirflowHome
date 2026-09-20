import { z } from 'zod'
import { FreshnessSchema, TemporalProvenanceSchema } from '../time/types'
import {
  ConfidenceSchema,
  NonEmptyStringSchema,
} from '../validation/primitives'

export const DataSourceSchema = z.enum([
  'measured',
  'provider',
  'user',
  'derived',
  'estimated',
  'unknown',
])

export const ProvenanceSchema = z
  .object({
    source: DataSourceSchema,
    confidence: ConfidenceSchema,
    provider: NonEmptyStringSchema.optional(),
    method: NonEmptyStringSchema.optional(),
    temporal: TemporalProvenanceSchema.optional(),
    freshness: FreshnessSchema.optional(),
  })
  .strict()

export const DomainIssueKindSchema = z.enum(['error', 'warning', 'limitation'])

const DomainIssueDetailValueSchema = z.union([
  z.string(),
  z.number().finite(),
  z.boolean(),
])

export const DomainIssueSchema = z
  .object({
    kind: DomainIssueKindSchema,
    code: NonEmptyStringSchema,
    details: z.record(z.string(), DomainIssueDetailValueSchema).optional(),
  })
  .strict()

export const ModelVersionsSchema = z
  .object({
    outdoorWind: NonEmptyStringSchema,
    indoorAirflow: NonEmptyStringSchema.optional(),
    ventilationScore: NonEmptyStringSchema.optional(),
    fanScore: NonEmptyStringSchema.optional(),
    heatScore: NonEmptyStringSchema.optional(),
  })
  .strict()

export const ModelCapabilitiesSchema = z
  .object({
    windDriven: z.boolean(),
    buoyancyDriven: z.boolean(),
    terrainFlow: z.boolean(),
    cfdTurbulence: z.boolean(),
    mechanicalHvac: z.boolean(),
  })
  .strict()

export const WIND_DRIVEN_V1_CAPABILITIES = Object.freeze({
  windDriven: true,
  buoyancyDriven: false,
  terrainFlow: false,
  cfdTurbulence: false,
  mechanicalHvac: false,
})

export const ConfidenceComponentsSchema = z
  .object({
    weather: ConfidenceSchema.optional(),
    geometry: ConfidenceSchema.optional(),
    unit: ConfidenceSchema.optional(),
    outdoorModel: ConfidenceSchema.optional(),
    indoorModel: ConfidenceSchema.optional(),
    overall: ConfidenceSchema,
  })
  .strict()

export const SimulationMetaSchema = z
  .object({
    modelVersions: ModelVersionsSchema,
    capabilities: ModelCapabilitiesSchema,
    confidence: ConfidenceComponentsSchema,
    issues: z.array(DomainIssueSchema),
  })
  .strict()

export type DataSource = z.infer<typeof DataSourceSchema>
export type Provenance = z.infer<typeof ProvenanceSchema>
export type DomainIssueKind = z.infer<typeof DomainIssueKindSchema>
export type DomainIssue = z.infer<typeof DomainIssueSchema>
export type ModelVersions = z.infer<typeof ModelVersionsSchema>
export type ModelCapabilities = z.infer<typeof ModelCapabilitiesSchema>
export type ConfidenceComponents = z.infer<typeof ConfidenceComponentsSchema>
export type SimulationMeta = z.infer<typeof SimulationMetaSchema>
