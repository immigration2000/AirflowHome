# Current Development State

## Current Milestone
M0.6 — Validation & Snapshot Foundation

## Status
M0.5 Wind Lab gate passed in GitHub Actions. The provider-free developer surface now verifies meteorological direction, world vectors, local-meter geometry, deterministic presets, and building-face outward normals.

## Completed
- reproducible npm/CI foundation verified,
- M0.4 runtime/domain contracts implemented and tested,
- /dev/wind-lab developer route added,
- editable mock wind FROM direction and speed added,
- derived TO direction and +X East / +Y North vector displayed,
- deterministic Wind Lab scenario presets added,
- canonical CCW local-meter building polygons visualized,
- building faces and outward normals derived and displayed,
- vector ↔ meteorological direction tests added,
- rectangular face-normal golden tests added,
- deterministic scenario tests added,
- no live provider dependency introduced.

## Current Task
**VALIDATION-001 — Implement M0.6 Validation & Snapshot Foundation**

Implement:
- versioned simulation/debug snapshot schema,
- deterministic snapshot import/export contract,
- stronger geometry validation including self-intersection detection,
- explicit time context in snapshots,
- confidence-component representation,
- sensitivity/invariant scenario foundation.

## Exit Criteria
M0.6 must satisfy the Validation/Snapshot gate in `docs/MILESTONE_GATES.md` before provider feasibility work begins.

## Next Task
After M0.6 passes:

**M0.7 — Provider Feasibility Spike**

Evaluate real Korean address/building/weather data coverage, license, freshness, quota, and fallback paths before committing to production provider architecture.

## Do Not Start Yet
- live map provider integration,
- live weather API integration,
- surrounding-building physics,
- floorplan work,
- indoor airflow,
- fan optimization,
- heat-source placement.

## Known Limitations
- repository-level branch protection/ruleset still needs to be enabled in GitHub settings,
- polygon self-intersection validation is deferred to the active M0.6 task,
- versioned snapshot/debug export is not implemented yet,
- local geographic projection is not implemented yet,
- provider API keys are intentionally not configured.
