import type { LocalMeterPoint } from '../../domain/geo/types'
import { deriveBuildingFaces } from '../../domain/geometry/faces'
import { CanonicalLocalPolygonSchema } from '../../domain/geometry/types'
import {
  normalizeDegrees,
  windFromToDeg,
  windFromToUnitVector,
} from '../../domain/wind/wind'

export interface WindLabScenario {
  id: string
  label: string
  windFromDeg: number
  speedMps: number
  polygon: LocalMeterPoint[]
}

const RECTANGLE_20_X_10: LocalMeterPoint[] = [
  { xMeters: -10, yMeters: -5 },
  { xMeters: 10, yMeters: -5 },
  { xMeters: 10, yMeters: 5 },
  { xMeters: -10, yMeters: 5 },
]

const SQUARE_12: LocalMeterPoint[] = [
  { xMeters: -6, yMeters: -6 },
  { xMeters: 6, yMeters: -6 },
  { xMeters: 6, yMeters: 6 },
  { xMeters: -6, yMeters: 6 },
]

export const WIND_LAB_SCENARIOS: readonly WindLabScenario[] = Object.freeze([
  {
    id: 'north-rectangle',
    label: 'North wind / 20×10 m rectangle',
    windFromDeg: 0,
    speedMps: 4,
    polygon: RECTANGLE_20_X_10,
  },
  {
    id: 'west-rectangle',
    label: 'West wind / 20×10 m rectangle',
    windFromDeg: 270,
    speedMps: 3,
    polygon: RECTANGLE_20_X_10,
  },
  {
    id: 'southwest-rectangle',
    label: 'Southwest wind / 20×10 m rectangle',
    windFromDeg: 225,
    speedMps: 2.5,
    polygon: RECTANGLE_20_X_10,
  },
  {
    id: 'east-square',
    label: 'East wind / 12×12 m square',
    windFromDeg: 90,
    speedMps: 5,
    polygon: SQUARE_12,
  },
])

export interface WindLabDerivedState {
  windFromDeg: number
  windToDeg: number
  speedMps: number
  flowVector: {
    xEast: number
    yNorth: number
  }
  polygon: LocalMeterPoint[]
  faces: ReturnType<typeof deriveBuildingFaces>
}

export function deriveWindLabState(
  scenario: Pick<WindLabScenario, 'windFromDeg' | 'speedMps' | 'polygon'>,
): WindLabDerivedState {
  if (!Number.isFinite(scenario.speedMps) || scenario.speedMps < 0) {
    throw new RangeError('speedMps must be a finite non-negative number')
  }

  const polygon = CanonicalLocalPolygonSchema.parse(scenario.polygon)
  const windFromDeg = normalizeDegrees(scenario.windFromDeg)

  return {
    windFromDeg,
    windToDeg: windFromToDeg(windFromDeg),
    speedMps: scenario.speedMps,
    flowVector: windFromToUnitVector(windFromDeg),
    polygon,
    faces: deriveBuildingFaces(polygon),
  }
}

export function getWindLabScenario(id: string): WindLabScenario {
  const scenario = WIND_LAB_SCENARIOS.find((candidate) => candidate.id === id)

  if (!scenario) {
    throw new RangeError(`unknown Wind Lab scenario: ${id}`)
  }

  return {
    ...scenario,
    polygon: scenario.polygon.map((point) => ({ ...point })),
  }
}
