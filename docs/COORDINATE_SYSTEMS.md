# Coordinate Systems

Coordinate mixing is a P0 defect.

## Geographic Coordinates
Use explicit names:

```ts
type GeoPoint = {
  latitude: number
  longitude: number
}
```

Never represent geographic coordinates as generic `x/y`.

## Building/Floor Local Coordinates
Physics uses a local metric frame:

```ts
type LocalMeterPoint = {
  xMeters: number
  yMeters: number
}
```

Canonical horizontal axes:
- `+X = East`
- `+Y = North`

This convention is shared by building geometry, floorplan geometry, wind vectors, and face normals.

## Meteorological Angle → Vector

Meteorological angles are clockwise from North. Generic mathematical angles are usually counter-clockwise from +X and must not be mixed directly.

For a TO-direction angle `thetaDeg`:

```text
xEast  = sin(theta)
yNorth = cos(theta)
```

where `theta` is converted to radians inside the named canonical helper.

Required sanity cases:
- TO 0° → (0, +1) North
- TO 90° → (+1, 0) East
- TO 180° → (0, -1) South
- TO 270° → (-1, 0) West

## Screen Coordinates

Rendering-only coordinates:

```ts
type ScreenPoint = {
  xPx: number
  yPx: number
}
```

Screen pixels must never enter a physics solver.

## Geometry Canonical Form

Before geometry enters physics:
- use local-meter coordinates,
- reject zero-area polygons,
- reject/flag self-intersections,
- remove unsafe duplicate vertices,
- use one documented polygon winding convention,
- derive outward face normals from the canonical winding,
- validate that unit placement is within the supported building geometry.

Do not silently "repair" ambiguous geometry.

## Transform Rule

All cross-system conversions pass through named conversion functions. Direct assignment between coordinate-system types is prohibited.

## Projection

Geographic coordinates must be explicitly projected into a local metric frame before physical calculations. Physics must not calculate distances or normals directly from latitude/longitude.

The initial product can use a local building-scale projection; the projection implementation must be documented and tested before real map data is used.

## Map Bearing

World wind direction is independent of map rotation. Visualization compensates for map bearing instead of modifying physical wind.
