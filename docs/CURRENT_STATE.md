# Current Development State

## Current Milestone
M0.5 — Wind Lab

## Status
M0.4 Domain Contract gate passed in GitHub Actions. Core runtime validation, coordinate, wind-vector, numerical, issue, provenance, time/freshness, confidence, and model-capability contracts are implemented and tested.

## Completed
- project architecture/rules documented,
- reproducible npm/CI foundation verified,
- Zod runtime-validation primitives added,
- explicit GeoPoint / LocalMeterPoint / ScreenPoint / WorldVector2 contracts added,
- canonical meteorological FROM → TO conversion tested,
- canonical meteorological angle → +X East / +Y North unit-vector conversion implemented and tested,
- normalized WeatherWind runtime boundary parser added,
- named numerical tolerances added,
- Error / Warning / Limitation issue kinds added,
- provenance + temporal + freshness + confidence contracts added,
- model version/capability contracts added,
- wind-driven v1 capabilities explicitly exclude buoyancy, terrain, CFD turbulence, and mechanical HVAC,
- local polygon signed-area and explicit counter-clockwise canonical-winding contract added,
- M0.4 test suite passes in GitHub Actions.

## Current Task
**LAB-001 — Implement M0.5 Wind Lab**

Create a developer-only Wind Lab using mock data only.

Required scope:
- editable mock wind FROM direction and speed,
- display derived TO direction and +X East / +Y North flow vector,
- simple local-meter building polygon,
- inspectable face directions/normals,
- deterministic scenario presets,
- no live map/weather/provider dependency.

## Exit Criteria
M0.5 must satisfy the Wind Lab gate in `docs/MILESTONE_GATES.md` before M0.6 starts.

## Next Task
After M0.5 passes:

**M0.6 — Validation & Snapshot Foundation**

Add versioned snapshots, stronger geometry validation, deterministic debug export, confidence breakdown, and sensitivity/invariant scenarios.

## Do Not Start Yet
- live map provider,
- live weather API,
- surrounding-building physics,
- floorplan work,
- indoor airflow,
- fan optimization,
- heat-source placement.

## Known Limitations
- repository-level branch protection/ruleset still needs to be enabled in GitHub settings,
- polygon self-intersection validation is intentionally deferred to M0.6,
- local geographic projection is not implemented yet,
- provider API keys are intentionally not configured,
- current app UI is still a foundation smoke screen until LAB-001 is implemented.
