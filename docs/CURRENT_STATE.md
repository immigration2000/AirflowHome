# Current Development State

## Current Milestone
M0.4 — Domain Contract

## Status
M0 foundation gate passed in GitHub Actions. The repository now has a committed lockfile, reproducible CI install, doctor checks, and a passing verification pipeline.

## Completed
- project architecture/rules documented,
- Claude Code startup rules added,
- React + TypeScript + Vite foundation defined,
- Vitest wind-domain tests added,
- bootstrap/doctor/verify commands defined,
- `package-lock.json` generated and committed,
- bootstrap uses `npm ci` when the lockfile exists,
- GitHub Actions uses `npm ci` with npm cache,
- CI runs `npm run doctor` and `npm run verify`,
- typecheck/lint/tests/build all pass in CI,
- roadmap includes Domain Contract, Validation/Snapshot, Provider Feasibility, and Outdoor Validation Gate stages.

## Current Task
**DOMAIN-001 — Implement M0.4 Domain Contract**

Implement/validate:
- runtime schemas at external/file boundaries,
- canonical wind angle → vector rules,
- coordinate/geometry conventions,
- numerical tolerance rules,
- error/warning/limitation contracts,
- provenance/time/freshness/confidence/model-capability contracts.

## Exit Criteria
M0.4 must satisfy the Domain Contract gate in `docs/MILESTONE_GATES.md` before Wind Lab work starts.

## Next Task
After M0.4 passes:

**LAB-001 — Start M0.5 Wind Lab**

Use mock data only. Do not add live providers yet.

## Do Not Start Yet
- live map provider,
- live weather API,
- surrounding-building simulation,
- floorplan work,
- indoor airflow,
- fan optimization,
- heat-source placement.

## Known Limitations
- repository-level branch protection/ruleset still needs to be enabled in GitHub settings,
- provider API keys are intentionally not configured,
- current UI is only a repository-foundation smoke screen,
- domain runtime-validation/vector/geometry contracts are not yet implemented.
