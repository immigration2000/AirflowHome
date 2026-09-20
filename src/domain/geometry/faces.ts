import type { LocalMeterPoint, WorldVector2 } from '../geo/types'
import { NUMERICAL_TOLERANCES } from '../numerics/tolerances'
import { unitVectorToMeteorologicalDeg } from '../wind/wind'
import { CanonicalLocalPolygonSchema } from './types'

export interface BuildingFace {
  index: number
  start: LocalMeterPoint
  end: LocalMeterPoint
  lengthMeters: number
  outwardNormal: WorldVector2
  normalToDeg: number
}

export function deriveBuildingFaces(input: unknown): BuildingFace[] {
  const polygon = CanonicalLocalPolygonSchema.parse(input)

  return polygon.map((start, index) => {
    const end = polygon[(index + 1) % polygon.length]
    const dx = end.xMeters - start.xMeters
    const dy = end.yMeters - start.yMeters
    const lengthMeters = Math.hypot(dx, dy)

    if (lengthMeters <= NUMERICAL_TOLERANCES.geometryMeters) {
      throw new RangeError('face length is too small')
    }

    // For a CCW polygon the interior lies to the left of each edge,
    // therefore the outward normal points to the edge's right side.
    const outwardNormal: WorldVector2 = {
      xEast: dy / lengthMeters,
      yNorth: -dx / lengthMeters,
    }

    return {
      index,
      start,
      end,
      lengthMeters,
      outwardNormal,
      normalToDeg: unitVectorToMeteorologicalDeg(outwardNormal),
    }
  })
}
