import { z } from 'zod'
import { ProvenanceSchema } from '../simulation/types'
import {
  MeteorologicalDegreesSchema,
  NonNegativeNumberSchema,
} from '../validation/primitives'

export const WeatherWindSchema = z
  .object({
    windFromDeg: MeteorologicalDegreesSchema,
    speedMps: NonNegativeNumberSchema,
    provenance: ProvenanceSchema,
  })
  .strict()

export type WeatherWind = z.infer<typeof WeatherWindSchema>

export function parseWeatherWind(input: unknown): WeatherWind {
  return WeatherWindSchema.parse(input)
}
