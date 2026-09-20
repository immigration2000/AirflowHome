# Architecture

## Goal
AirflowHome estimates residential ventilation behavior in layers while remaining testable for a solo developer working with AI assistance.

## Pipeline
```text
Raw provider/user data
→ adapters
→ validated domain data
→ simulation input snapshot
→ physics solver
→ physical result
→ scoring
→ recommendation
→ explanation
→ visualization
```

Dependencies flow inward. UI never owns physics.

## Responsibilities
- `src/domain/**`: stable domain types and pure rules.
- `src/physics/**`: deterministic physical formulas and low-level models.
- `src/solver/**`: simulation orchestration.
- `src/services/**`: provider integrations and adapters.
- `src/visualization/**`: mapping results to visual primitives.
- `src/components/**`: React UI.
- `src/workers/**`: heavy browser-side calculations when required.

Future directories are added only when their milestone activates.

## Planned Simulation Layers
1. Weather wind.
2. Local outdoor wind.
3. Indoor airflow.
4. Opening recommendation.
5. Fan optimization.
6. Heat-source placement.

## Boundary Rule
A displayed arrow is not a physics model. Visualization consumes results; it never becomes the source of truth.

## Determinism
Same validated input + same model version must produce the same result. Random sampling is prohibited unless seeded and documented.
