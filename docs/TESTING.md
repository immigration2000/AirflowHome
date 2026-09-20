# Testing Strategy

AirflowHome must detect calculations that are syntactically valid but physically wrong.

## Test Layers

### Unit tests
Pure functions such as:
- angle normalization,
- FROM → TO conversion,
- meteorological angle → world vector,
- unit conversion,
- runtime schema validation.

### Invariant/property tests
Examples:
- direction is in [0, 360),
- wind vector cardinal directions are correct,
- speed is non-negative,
- confidence is in [0, 1],
- scores are in [0, 100],
- valid polygon area is positive,
- indoor mass balance stays within tolerance.

### Contract tests
Every provider/file adapter should have representative saved fixtures that verify:
- raw payload validation,
- missing/null field handling,
- units,
- timestamps,
- adaptation into stable domain objects.

Tests must not call the live provider.

### Golden scenarios
Simplified known cases such as:
- square building + west wind,
- no obstacle vs blocking obstacle,
- two-room cross ventilation.

Prefer relational expectations over brittle exact values when appropriate.

### Sensitivity / stability tests
Small input changes should not cause unexplained discontinuous output changes.

Examples:
- small wind-speed change,
- small building-height change,
- small residence-position change.

Discontinuities that are intentional because of a threshold must be documented and tested around that threshold.

### Validation datasets
Keep calibration and validation/holdout cases separate. Unit/golden tests cannot prove real-world model accuracy.

### End-to-end tests
Added when the user journey exists.

## Numerical Comparison

Do not round intermediate results for tests. Use named tolerances for floating-point comparisons where exact equality is not mathematically expected.

## Rules

- Tests never call live providers.
- External test data must use sanitized snapshots/fixtures.
- Fixtures must not contain a user's exact home/floorplan/private data.
- Do not weaken a test simply because a new implementation fails it.
- Physics changes require relevant regression coverage.
- Model changes require review against the validation plan.

## Commands

```bash
npm run test:run
npm run verify
```
