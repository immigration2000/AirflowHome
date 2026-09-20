# Domain Rules

## Wind
- Meteorological wind direction is a FROM direction.
- 0° = North, 90° = East, 180° = South, 270° = West.
- These angles increase clockwise from North.
- World/local horizontal axes are `+X = East`, `+Y = North`.
- A displayed/flow vector generally uses the TO direction.
- `windToDeg = normalize(windFromDeg + 180)`.
- Canonical TO-direction unit-vector conversion is:
  - `xEast = sin(toDeg)`
  - `yNorth = cos(toDeg)`
  with degrees converted to radians internally.
- Generic math-angle conversion must not be used directly on meteorological angles.
- Avoid ambiguous names such as `windDirection`; use `windFromDeg`, `windToDeg`, or explicit vector names.

## Runtime Boundaries
TypeScript types do not validate untrusted runtime data. Provider responses, imported snapshots, and future floorplan files must be runtime-validated before adaptation into domain objects.

Expected flow:

```text
Raw JSON / user file
→ runtime schema validation
→ provider/file adapter
→ validated domain object
→ solver
```

## Missing / Estimated / Stale / Unsupported Data
These states are not interchangeable.

Never silently invent building height, floor height, unit exposure, opening dimensions, wind speed, shielding coefficients, or timestamps.

Estimated values must carry provenance/confidence. Stale provider values must carry freshness metadata/warnings. Unsupported physics must be represented as a limitation/capability state rather than an invented approximation.

## Time Semantics
Keep distinct fields where relevant:
- `observedAt`: when a measurement was observed,
- `forecastFor`: target time of a forecast,
- `fetchedAt`: when the app retrieved the data,
- `simulationAt`: time the simulation represents,
- timezone/offset information.

Current observations, forecasts, and seasonal climatology are distinct data classes.

## Result Semantics
Early versions provide relative/estimated ventilation guidance rather than CFD-grade exact local airflow. Prefer relative comparisons, component explanations, and confidence over unsupported precision.

## Result Status
The domain must distinguish at least:
- **Error**: calculation cannot proceed reliably,
- **Warning**: calculation can proceed with reduced confidence,
- **Limitation**: requested/real-world behavior is outside the current model capability.

## Separation
Physics calculates physical quantities. Scoring compares candidates. Recommendation applies user-facing rules such as outdoor air quality, rain, security, or corridor-door constraints. Explanation/UI turns stable codes/metadata into user-facing text.

## Numerical Rule
Keep full floating-point precision through calculation. Apply rounding only in presentation/export formats that explicitly require it. Numerical comparisons use named tolerances rather than scattered magic epsilon values.

## Versioning
Physics, scoring, and snapshot schemas are independently versioned. Same validated input + same model version must be deterministic.
