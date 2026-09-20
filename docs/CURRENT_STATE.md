# Current Development State

## Current Milestone
M0.7 — Provider Feasibility Spike

## Status
M0.6 Validation/Snapshot gate passed. Initial M0.7 desk research is documented in `docs/PROVIDERS.md`. Production provider selection is intentionally still open because representative live-key sample testing has not yet been completed. Local credential placeholders and a secret-safe readiness checker are now prepared for that work.

## Completed
- reproducible npm/CI foundation verified,
- M0.4 runtime/domain contracts implemented and tested,
- M0.5 provider-free Wind / Geometry Lab implemented,
- M0.6 versioned deterministic snapshots and geometry validation implemented,
- candidate address/map/building/weather/air-quality providers researched from official sources,
- current quota/cost/license signals recorded where officially available,
- fallback/manual-correction paths identified,
- Kakao cache-policy constraints recorded,
- Juso coordinate CRS/rate-limit/missing-coordinate behavior recorded,
- GIS Building Integrated Information identified as the primary building-footprint candidate,
- BuildingHUB identified as the primary height/floor metadata candidate,
- KMA Short-term Forecast identified as the primary weather candidate,
- AirKorea classified as an optional recommendation-layer provider rather than physics input,
- `.env.example` provider credential placeholders added,
- `npm run provider:doctor` added to check live-test readiness without printing secrets,
- provider access/setup procedure documented in `docs/PROVIDER_ACCESS_SETUP.md`.

## Current Task
**PROVIDER-001 — Complete live provider feasibility validation**

Desk research is complete enough to define the live tests. Remaining work:

1. copy `.env.example` to `.env.local`, obtain/enable development access for the candidate APIs, and make `npm run provider:doctor` pass,
2. run sanitized representative apartment/building samples,
3. prove a stable GIS Building Integrated Information ↔ BuildingHUB join,
4. verify WFS CRS/geometry/freshness in live responses,
5. confirm KMA `VEC` direction semantics from current official guide/sample,
6. record practical request limits and missing-field behavior,
7. confirm provider-specific persistent-cache/redistribution rules before implementation.

See `docs/PROVIDERS.md`.

## Exit Criteria
M0.7 remains open until the Provider Feasibility gate in `docs/MILESTONE_GATES.md` is satisfied. Desk research alone is not sufficient.

## Next Task
After M0.7 passes:

**M1 — Basic Wind Map**

Build the map/address shell and mock wind overlay using only provider choices justified by the completed feasibility spike.

## Do Not Start Yet
- production provider integration before live feasibility validation,
- surrounding-building physics,
- floorplan work,
- indoor airflow,
- fan optimization,
- heat-source placement.

## Known Limitations
- repository-level branch protection/ruleset still needs to be enabled in GitHub settings,
- local geographic projection is not implemented yet,
- no production provider has been selected yet,
- live provider sample coverage has not been tested because project development keys/approvals are not present in the repository,
- current physics remains direction/geometry validation only; facade pressure/shielding/wake models are not implemented.
