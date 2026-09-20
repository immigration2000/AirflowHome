# Domain Rules

## Wind
- Meteorological wind direction is a FROM direction.
- 0° = North, 90° = East, 180° = South, 270° = West.
- Screen arrows use TO direction derived as `(fromDeg + 180) mod 360`.
- Avoid ambiguous names such as `windDirection`; use `windFromDeg` or `windToDeg`.

## Missing Data
Unknown is a valid state. Never silently invent building height, floor height, unit exposure, opening dimensions, wind speed, or shielding coefficients.

Estimated values must carry provenance/confidence.

## Result Semantics
Early versions provide relative/estimated ventilation guidance rather than CFD-grade exact local airflow. Prefer relative comparisons and confidence over unsupported precision.

## Separation
Physics calculates physical quantities. Scoring compares candidates. Recommendation applies user-facing rules such as outdoor air quality and weather constraints.

## Versioning
Physics and scoring models are independently versioned.
