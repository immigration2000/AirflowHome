# Current Development State

## Current Milestone
M0.7 — Provider Feasibility Spike

## Status
M0.6 Validation/Snapshot gate passed in GitHub Actions. Versioned deterministic debug snapshots, replay integrity checks, self-intersection validation, confidence components, explicit simulation time context, and sensitivity foundations are implemented.

## Completed
- reproducible npm/CI foundation verified,
- M0.4 runtime/domain contracts implemented and tested,
- M0.5 provider-free Wind / Geometry Lab implemented,
- versioned Wind Lab snapshot schema v1 added,
- canonical deterministic JSON serialization added,
- snapshot/model versions separated,
- unsupported snapshot versions fail explicitly,
- imported snapshots replay normalized input and reject mismatched derived results,
- explicit simulation time + timezone preserved in snapshots,
- component confidence representation added,
- polygon self-intersection detection added,
- deterministic sensitivity/invariant tests added,
- developer snapshot JSON export added to Wind Lab,
- snapshot privacy/versioning rules documented.

## Current Task
**PROVIDER-001 — Run M0.7 Provider Feasibility Spike**

Evaluate candidate Korean data sources for:
- address → coordinates,
- building footprint,
- building height / floor / use metadata where available,
- current/forecast weather wind,
- air quality where relevant.

For each provider record:
- coverage and sample quality,
- fields and unit/time semantics,
- missing-field behavior,
- quota and cost,
- licensing / attribution / commercial-use constraints,
- caching / storage / redistribution rules,
- freshness expectations,
- fallback/manual correction path.

## Exit Criteria
M0.7 must satisfy the Provider Feasibility gate in `docs/MILESTONE_GATES.md` before production map/weather/building provider architecture is chosen.

## Next Task
After M0.7 passes:

**M1 — Basic Wind Map**

Build the map/address shell and mock wind overlay using only provider choices justified by the feasibility spike.

## Do Not Start Yet
- production provider integration before the feasibility decision,
- surrounding-building physics,
- floorplan work,
- indoor airflow,
- fan optimization,
- heat-source placement.

## Known Limitations
- repository-level branch protection/ruleset still needs to be enabled in GitHub settings,
- local geographic projection is not implemented yet,
- no production provider has been selected yet,
- current physics remains direction/geometry validation only; facade pressure/shielding/wake models are not implemented.
