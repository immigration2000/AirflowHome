import { describe, expect, it } from 'vitest'
import { deriveBuildingFaces } from './faces'

const square = [
  { xMeters: 0, yMeters: 0 },
  { xMeters: 2, yMeters: 0 },
  { xMeters: 2, yMeters: 2 },
  { xMeters: 0, yMeters: 2 },
]

describe('deriveBuildingFaces', () => {
  it('derives outward normals for a CCW square', () => {
    const faces = deriveBuildingFaces(square)

    expect(faces).toHaveLength(4)

    // South, East, North, West outward normals in edge order.
    expect(faces[0].outwardNormal.xEast).toBeCloseTo(0, 12)
    expect(faces[0].outwardNormal.yNorth).toBeCloseTo(-1, 12)
    expect(faces[0].normalToDeg).toBeCloseTo(180, 12)

    expect(faces[1].outwardNormal.xEast).toBeCloseTo(1, 12)
    expect(faces[1].outwardNormal.yNorth).toBeCloseTo(0, 12)
    expect(faces[1].normalToDeg).toBeCloseTo(90, 12)

    expect(faces[2].outwardNormal.xEast).toBeCloseTo(0, 12)
    expect(faces[2].outwardNormal.yNorth).toBeCloseTo(1, 12)
    expect(faces[2].normalToDeg).toBeCloseTo(0, 12)

    expect(faces[3].outwardNormal.xEast).toBeCloseTo(-1, 12)
    expect(faces[3].outwardNormal.yNorth).toBeCloseTo(0, 12)
    expect(faces[3].normalToDeg).toBeCloseTo(270, 12)
  })

  it('rejects clockwise polygons instead of silently flipping normals', () => {
    expect(() => deriveBuildingFaces([...square].reverse())).toThrow()
  })
})
