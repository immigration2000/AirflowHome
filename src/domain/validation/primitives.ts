import { z } from 'zod'

export const FiniteNumberSchema = z.number().finite()
export const NonNegativeNumberSchema = FiniteNumberSchema.min(0)
export const PositiveNumberSchema = FiniteNumberSchema.positive()
export const ConfidenceSchema = FiniteNumberSchema.min(0).max(1)
export const MeteorologicalDegreesSchema = FiniteNumberSchema.min(0).lt(360)
export const IsoDateTimeSchema = z.string().datetime({ offset: true })
export const NonEmptyStringSchema = z.string().trim().min(1)

export type Confidence = z.infer<typeof ConfidenceSchema>
export type MeteorologicalDegrees = z.infer<typeof MeteorologicalDegreesSchema>
