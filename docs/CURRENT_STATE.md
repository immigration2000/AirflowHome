# Current Development State

## Current Milestone
M0 — Autonomous Development Foundation

## Status
Repository bootstrap files are merged to `main`. Local Claude Code bootstrap and executable verification are still required before advancing.

## Completed
- project architecture/rules documented,
- Claude Code startup rules added,
- React + TypeScript + Vite foundation defined,
- Vitest wind-domain tests added,
- bootstrap/doctor/verify commands defined,
- GitHub Actions verification workflow defined,
- roadmap hardened with Domain Contract, Validation/Snapshot, Provider Feasibility, and Outdoor Validation Gate stages.

## Current Task
**BOOT-002 — Validate and lock the foundation locally**

Claude Code should:
1. read README, CLAUDE.md, CURRENT_STATE, and MILESTONE_GATES,
2. on a fresh clone run `npm run bootstrap`,
3. confirm `npm run verify` succeeds,
4. keep the generated `package-lock.json`,
5. change CI/install paths to `npm ci` where a lockfile is available,
6. fix foundation-only issues without starting M0.4 prematurely,
7. update this document with the actual verification result.

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
- no lockfile exists until the first successful local bootstrap,
- CI has not yet been proven with a generated lockfile,
- provider API keys are intentionally not configured,
- current UI is only a repository-foundation smoke screen,
- domain runtime-validation/vector/geometry contracts are planned but not yet implemented.
