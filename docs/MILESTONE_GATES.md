# Milestone Gates

Milestones are not complete because a feature "looks finished". Advancement requires explicit exit criteria.

Claude may update task progress, but must not advance a milestone unless the relevant gate is satisfied.

## M0 — Foundation Gate

Required before M0.4:
- fresh-clone bootstrap succeeds,
- `package-lock.json` exists and is committed,
- `npm run verify` succeeds,
- CI succeeds from the committed lockfile,
- bootstrap uses reproducible install when the lockfile exists,
- README/CLAUDE/CURRENT_STATE agree on startup flow.

## M0.4 — Domain Contract Gate

Required before Wind Lab:
- runtime validation boundary is established for untrusted JSON/file data,
- canonical FROM → TO conversion is tested,
- canonical meteorological angle → (+X East, +Y North) vector conversion is tested,
- coordinate types/conversions are explicit,
- numerical tolerance policy exists,
- error/warning/limitation types are defined,
- provenance/time/freshness/confidence/model-capability contracts are defined,
- invalid inputs cannot silently enter solver-facing domain objects.

## M0.5 — Wind Lab Gate

Required before M0.6:
- mock wind can be changed without provider/API dependencies,
- cardinal and inter-cardinal directions display/compute consistently,
- geometry normals are inspectable,
- scenario runner can reproduce deterministic cases,
- golden wind/vector scenarios pass.

## M0.6 — Validation/Snapshot Gate

Required before provider feasibility/map work:
- snapshot schema is versioned,
- same snapshot + same model version is deterministic,
- geometry validation rejects unsupported/invalid shapes,
- debug export is reproducible,
- time fields distinguish observation/forecast/fetch/simulation time,
- confidence components are representable,
- sensitivity/invariant tests exist for the active model.

## M0.7 — Provider Feasibility Gate

Required before committing to M1/M2/M3 provider architecture:
- candidate provider coverage has been tested on multiple representative Korean apartment locations,
- required fields and missing-field rates are documented,
- quota/cost is documented,
- cache/freshness behavior is documented,
- commercial use, attribution, storage, and redistribution constraints are documented,
- each critical missing-data path has a manual/fallback strategy.

## M1–M3 Gate Principle

Map/weather/building milestones require:
- adapter contract tests,
- no provider DTO reaches physics directly,
- map rotation does not alter world wind,
- building/unit geometry is manually correctable,
- unsupported/missing values produce explicit state.

## M4 — Outdoor Validation Gate

Outdoor wind-driven v1 does not advance because it merely runs.

Required:
- synthetic windward/leeward and exposure relationships pass,
- blocker scenarios preserve expected relative behavior,
- calibration cases are separate from validation/holdout cases,
- basic real-world observations are compared against model behavior,
- known limitations/capabilities are exposed,
- sensitivity behavior is reasonable,
- model version is recorded.

If this gate fails, revise the model or reduce product claims/scope before indoor work.

## M5–M7 Indoor Gate Principle

Before Indoor MVP:
- floorplan orientation/scale/connectivity is validated,
- pressure-network solver reports convergence state,
- room mass balance is within named tolerance,
- closed/disconnected/degenerate cases are handled,
- recommendation logic remains separate from physics,
- security/weather/air-quality constraints do not modify physics equations.

## M8+ Optimization Gate Principle

Fan/heat optimization requires:
- bounded candidate generation,
- performance budgets,
- deterministic ranking for the same input/model version,
- component explanations rather than opaque scores.
