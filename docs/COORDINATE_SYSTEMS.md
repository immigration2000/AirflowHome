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
Physics uses local metric coordinates:
```ts
type LocalMeterPoint = {
  xMeters: number
  yMeters: number
}
```

## Screen Coordinates
Rendering-only coordinates:
```ts
type ScreenPoint = {
  xPx: number
  yPx: number
}
```

Screen pixels must never enter a physics solver.

## Transform Rule
All cross-system conversions pass through named conversion functions.

## Map Bearing
World wind direction is independent of map rotation. Visualization compensates for map bearing instead of modifying physical wind.
