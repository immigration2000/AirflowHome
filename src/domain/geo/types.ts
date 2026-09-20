import { z } from 'zod'
import { FiniteNumberSchema } from '../validation/primitives'

export const GeoPointSchema = z
  .object({
    latitude: FiniteNumberSchema.min(-90).max(90),
    longitude: FiniteNumberSchema.min(-180).max(180),
  })
  .strict()

export const LocalMeterPointSchema = z
  .object({
    xMeters: FiniteNumberSchema,
    yMeters: FiniteNumberSchema,
  })
  .strict()

export const ScreenPointSchema = z
  .object({
    xPx: FiniteNumberSchema,
    yPx: FiniteNumberSchema,
  })
  .strict()

export const WorldVector2Schema = z
  .object({
    xEast: FiniteNumberSchema,
    yNorth: FiniteNumberSchema,
  })
  .strict()

export type GeoPoint = z.infer<typeof GeoPointSchema>
export type LocalMeterPoint = z.infer<typeof LocalMeterPointSchema>
export type ScreenPoint = z.infer<typeof ScreenPointSchema>
export type WorldVector2 = z.infer<typeof WorldVector2Schema>
