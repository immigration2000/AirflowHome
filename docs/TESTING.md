# Testing Strategy

AirflowHome must detect calculations that are syntactically valid but physically wrong.

## Test Layers
### Unit tests
Pure functions such as angle normalization and unit conversion.

### Invariant/property tests
Examples:
- direction is in [0, 360),
- speed is non-negative,
- confidence is in [0, 1],
- scores are in [0, 100],
- indoor mass balance stays within tolerance.

### Golden scenarios
Simplified known cases such as:
- square building + west wind,
- no obstacle vs blocking obstacle,
- two-room cross ventilation.

Prefer relational expectations over brittle exact values when appropriate.

### End-to-end tests
Added when the user journey exists.

## Rules
- Tests never call live providers.
- External test data must use snapshots/fixtures.
- Do not weaken a test simply because a new implementation fails it.
- Physics changes require regression coverage.

## Commands
```bash
npm run test:run
npm run verify
```
