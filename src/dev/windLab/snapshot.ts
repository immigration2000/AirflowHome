import { z } from 'zod'
import {
  LocalMeterPointSchema,
  WorldVector2Schema,
} from '../../domain/geo/types'
import { CanonicalLocalPolygonSchema } from '../../domain/geometry/types'
import {
  ConfidenceComponentsSchema,
  DomainIssueSchema,
  ModelCapabilitiesSchema,
  ModelVersionsSchema,
  WIND_DRIVEN_V1_CAPABILITIES,
} from '../../domain/simulation/types'
import {
  parseJson,
  serializeCanonicalJson,
} from '../../domain/snapshot/serialization'
import { SimulationTimeContextSchema } from '../../domain/time/types'
import {
  MeteorologicalDegreesSchema,
  NonNegativeNumberSchema,
  PositiveNumberSchema,
} from '../../domain/validation/primitives'
import { deriveWindLabState } from './scenarios'

export const WIND_LAB_SNAPSHOT_SCHEMA_VERSION = 1 as const
export const WIND_LAB_MODEL_VERSION = 'wind-lab-v1'

const BuildingFaceSnapshotSchema = z
  .object({
    index: z.number().int().nonnegative(),
    start: LocalMeterPointSchema,
    end: LocalMeterPointSchema,
    lengthMeters: PositiveNumberSchema,
    outwardNormal: WorldVector2Schema,
    normalToDeg: MeteorologicalDegreesSchema,
  })
  .strict()

export const WindLabSnapshotInputSchema = z
  .object({
    windFromDeg: MeteorologicalDegreesSchema,
    speedMps: NonNegativeNumberSchema,
    polygon: CanonicalLocalPolygonSchema,
  })
  .strict()

export const WindLabSnapshotResultSchema = z
  .object({
    windToDeg: MeteorologicalDegreesSchema,
    flowVector: WorldVector2Schema,
    faces: z.array(BuildingFaceSnapshotSchema),
  })
  .strict()

export const WindLabSnapshotV1Schema = z
  .object({
    schemaVersion: z.literal(WIND_LAB_SNAPSHOT_SCHEMA_VERSION),
    snapshotType: z.literal('wind-lab'),
    simulationTime: SimulationTimeContextSchema,
    modelVersions: ModelVersionsSchema,
    capabilities: ModelCapabilitiesSchema,
    confidence: ConfidenceComponentsSchema,
    issues: z.array(DomainIssueSchema),
    input: WindLabSnapshotInputSchema,
    result: WindLabSnapshotResultSchema,
  })
  .strict()

export type WindLabSnapshotV1 = z.infer<typeof WindLabSnapshotV1Schema>

export class UnsupportedSnapshotVersionError extends Error {
  constructor(version: unknown) {
    super(`unsupported Wind Lab snapshot schema version: ${String(version)}`)
    this.name = 'UnsupportedSnapshotVersionError'
  }
}

export class SnapshotIntegrityError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SnapshotIntegrityError'
  }
}

function deriveSnapshotResult(input: z.infer<typeof WindLabSnapshotInputSchema>) {
  const derived = deriveWindLabState(input)

  return {
    windToDeg: derived.windToDeg,
    flowVector: derived.flowVector,
    faces: derived.faces,
  }
}

export function createWindLabSnapshot(args: {
  windFromDeg: number
  speedMps: number
  polygon: unknown
  simulationTime: z.infer<typeof SimulationTimeContextSchema>
  confidence: z.infer<typeof ConfidenceComponentsSchema>
}): WindLabSnapshotV1 {
  const derived = deriveWindLabState({
    windFromDeg: args.windFromDeg,
    speedMps: args.speedMps,
    polygon: CanonicalLocalPolygonSchema.parse(args.polygon),
  })

  const input = WindLabSnapshotInputSchema.parse({
    windFromDeg: derived.windFromDeg,
    speedMps: derived.speedMps,
    polygon: derived.polygon,
  })

  return WindLabSnapshotV1Schema.parse({
    schemaVersion: WIND_LAB_SNAPSHOT_SCHEMA_VERSION,
    snapshotType: 'wind-lab',
    simulationTime: args.simulationTime,
    modelVersions: {
      outdoorWind: WIND_LAB_MODEL_VERSION,
    },
    capabilities: WIND_DRIVEN_V1_CAPABILITIES,
    confidence: args.confidence,
    issues: [],
    input,
    result: deriveSnapshotResult(input),
  })
}

function assertReplayIntegrity(snapshot: WindLabSnapshotV1): void {
  if (snapshot.modelVersions.outdoorWind !== WIND_LAB_MODEL_VERSION) {
    throw new SnapshotIntegrityError(
      `unsupported Wind Lab model version: ${snapshot.modelVersions.outdoorWind}`,
    )
  }

  const expectedResult = deriveSnapshotResult(snapshot.input)

  if (
    serializeCanonicalJson(expectedResult) !==
    serializeCanonicalJson(snapshot.result)
  ) {
    throw new SnapshotIntegrityError(
      'snapshot result does not match deterministic replay of its input',
    )
  }
}

export function serializeWindLabSnapshot(snapshot: WindLabSnapshotV1): string {
  const parsed = WindLabSnapshotV1Schema.parse(snapshot)
  assertReplayIntegrity(parsed)
  return serializeCanonicalJson(parsed)
}

export function parseWindLabSnapshot(serialized: string): WindLabSnapshotV1 {
  const raw = parseJson(serialized)

  if (
    typeof raw !== 'object' ||
    raw === null ||
    !('schemaVersion' in raw)
  ) {
    throw new UnsupportedSnapshotVersionError(undefined)
  }

  const version = (raw as { schemaVersion?: unknown }).schemaVersion

  if (version !== WIND_LAB_SNAPSHOT_SCHEMA_VERSION) {
    throw new UnsupportedSnapshotVersionError(version)
  }

  const parsed = WindLabSnapshotV1Schema.parse(raw)
  assertReplayIntegrity(parsed)
  return parsed
}
