# Current Development State

## Current Milestone
M0 — Autonomous Development Foundation

## Status
Repository bootstrap files are merged to `main`. Local Claude Code bootstrap and executable verification are the next validation steps.

## Completed
- project architecture/rules documented,
- Claude Code startup rules added,
- React + TypeScript + Vite foundation defined,
- Vitest wind-domain tests added,
- bootstrap/doctor/verify commands defined,
- GitHub Actions verification workflow defined.

## Current Task
**BOOT-002 — Validate the foundation locally**

Claude Code should:
1. read README and CLAUDE.md,
2. run `npm run bootstrap`,
3. confirm `npm run verify` succeeds,
4. keep the generated `package-lock.json`,
5. fix foundation-only issues without starting M0.5 prematurely,
6. update this document with the actual verification result.

## Next Task
After M0 verification succeeds:

**LAB-001 — Start M0.5 Wind Lab**

Create the developer-only Wind Lab using mock data only.

## Do Not Start Yet
- live map provider,
- live weather API,
- surrounding-building simulation,
- floorplan work,
- indoor airflow,
- fan optimization,
- heat-source placement.

## Known Limitations
- no lockfile exists until the first successful bootstrap,
- provider API keys are intentionally not configured,
- current UI is only a repository-foundation smoke screen.
