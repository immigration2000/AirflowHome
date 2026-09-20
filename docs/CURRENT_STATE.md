# Current Development State

## Current Milestone
M0 — Autonomous Development Foundation

## Status
BOOT-002 foundation validation is complete on the task branch and awaiting final PR verification/merge.

## Completed
- project architecture/rules documented,
- Claude Code startup rules added,
- React + TypeScript + Vite foundation defined,
- Vitest wind-domain tests added,
- bootstrap/doctor/verify commands defined,
- GitHub Actions verification workflow defined,
- roadmap hardened with Domain Contract, Validation/Snapshot, Provider Feasibility, and Outdoor Validation Gate stages,
- `package-lock.json` generated and committed,
- typecheck/build scripts validated in CI,
- first executable `npm run verify` run passed,
- CI switched to reproducible `npm ci` with npm cache.

## Current Task
**BOOT-002 — Finalize foundation gate**

Final PR requirements:
1. `package-lock.json` is committed,
2. `npm run verify` passes using `npm ci`,
3. the PR is merged without starting M0.4 work.

## Next Task
After the M0 gate succeeds:

**DOMAIN-001 — Start M0.4 Domain Contract**

Implement/validate:
- runtime schemas at external/file boundaries,
- canonical wind angle → vector rules,
- coordinate/geometry conventions,
- numerical tolerance rules,
- error/warning/limitation contracts,
- provenance/time/freshness/confidence/model-capability contracts.

Do not start Wind Lab until the M0.4 gate is satisfied.

## Do Not Start Yet
- Wind Lab implementation,
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
- domain runtime-validation/vector/geometry contracts are planned but not yet implemented.
