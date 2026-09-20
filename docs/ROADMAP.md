# Roadmap

## M0 — Autonomous Development Foundation
Repository rules, reproducible environment, bootstrap/doctor/verify, CI, and initial wind tests.

## M0.4 — Domain Contract
Before visualization work:
- runtime schemas for external/file boundaries,
- canonical angle/vector conversion,
- +X East / +Y North coordinate convention,
- geometry canonicalization rules,
- numerical precision/tolerance policy,
- error/warning/limitation semantics,
- provenance, timestamps, freshness, confidence, and model capability contracts.

## M0.5 — Wind Lab
Developer-only wind/geometry lab using mock data:
- wind FROM/TO/vector controls,
- geometry inspection,
- scenario runner,
- golden scenarios.

## M0.6 — Validation & Snapshot Foundation
- versioned simulation snapshot schema,
- geometry validation,
- deterministic debug export,
- time model,
- confidence breakdown,
- sensitivity/invariant checks.

## M0.7 — Provider Feasibility Spike
Before committing to the map/building implementation, verify real Korean data availability for:
- address → coordinates,
- building footprint,
- building height/metadata,
- weather wind,
- air quality where relevant.

Record coverage, quotas, licensing, caching/redistribution constraints, missing fields, freshness, and fallback strategy. This milestone is a feasibility study, not production integration.

## M1 — Basic Wind Map
Address/map shell, mock wind overlay, map-bearing handling.

## M2 — Weather
Current weather adapter, observation/forecast timestamps, forecast timeline, seasonal/climate data separated from forecasts.

## M3 — Residence
Building selection, validated building faces, floor input, unit-area selection, facade exposure, manual correction paths.

## M4 — Outdoor Simulation
Wind-driven v1 only:
- face pressure,
- height effect,
- nearby-building exposure/shielding/wake risk,
- confidence and trace.

Terrain flow, CFD-grade turbulence, and buoyancy/stack effects are out of scope for this model version.

## Outdoor Validation Gate
Do not proceed to indoor modeling merely because M4 runs. Validate simplified synthetic cases and a separate real-world/holdout set. If the model cannot reliably preserve basic directional/exposure relationships, revise or reduce scope before continuing.

**Outdoor MVP checkpoint**

## M5 — Floorplan Editor
Image upload, orientation/scale, manual rooms/windows/doors, editable connectivity, undo/redo. Floorplan images/data remain local-first by default.

## M5.5 — Airflow Lab
Deterministic room/opening scenarios, pressure controls, mass-balance diagnostics.

## M6 — Indoor Solver
Pressure network, room airflow, convergence status, invariant/golden/sensitivity validation.

## M7 — Ventilation Recommendation
Opening optimizer, component scores, explanations, outside-air-quality/security constraints kept outside physics.

**Indoor MVP checkpoint**

## M8 — Fan Optimization
Fan model, candidate positions/directions, performance budget, Web Worker optimization if required.

## M9 — Heat Sources
Draggable PC/TV/console sources and heat-removal/recirculation heuristic scores.

## M10 — Floorplan Automation
Automatic room/window/door candidate detection routed through the manual editor for confirmation. AI-produced geometry never bypasses validation.

Future milestones must not start until CURRENT_STATE activates them and the current milestone exit criteria in MILESTONE_GATES are satisfied.
