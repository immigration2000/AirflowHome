import { z } from 'zod'
import {
  IsoDateTimeSchema,
  NonEmptyStringSchema,
  NonNegativeNumberSchema,
  PositiveNumberSchema,
} from '../validation/primitives'

export const TemporalProvenanceSchema = z
  .object({
    observedAt: IsoDateTimeSchema.optional(),
    forecastFor: IsoDateTimeSchema.optional(),
    fetchedAt: IsoDateTimeSchema.optional(),
  })
  .strict()

export const FreshnessStateSchema = z.enum(['fresh', 'stale', 'unknown'])

export const FreshnessSchema = z
  .object({
    state: FreshnessStateSchema,
    ageSeconds: NonNegativeNumberSchema.optional(),
    maxAgeSeconds: PositiveNumberSchema.optional(),
  })
  .strict()

export const SimulationTimeContextSchema = z
  .object({
    simulationAt: IsoDateTimeSchema,
    timeZone: NonEmptyStringSchema,
  })
  .strict()

export type TemporalProvenance = z.infer<typeof TemporalProvenanceSchema>
export type FreshnessState = z.infer<typeof FreshnessStateSchema>
export type Freshness = z.infer<typeof FreshnessSchema>
export type SimulationTimeContext = z.infer<typeof SimulationTimeContextSchema>
