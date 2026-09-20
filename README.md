# AirflowHome

AirflowHome is a browser-based residential ventilation analysis project.

The long-term goal is to combine location, weather, building geometry, residence position, floorplans, and user-placed devices to provide explainable ventilation guidance.

## Claude Code: Start Here

When opening this repository in Claude Code:

1. Read `CLAUDE.md`.
2. Read `docs/CURRENT_STATE.md`.
3. Read the active milestone in `docs/ROADMAP.md`.
4. Read `docs/MILESTONE_GATES.md` and the architecture/domain rules referenced by `CLAUDE.md`.
5. On a fresh clone, run:
   ```bash
   npm run bootstrap
   ```
6. On an already bootstrapped clone, run:
   ```bash
   npm run doctor
   npm run verify
   ```

Do not start a future milestone unless `docs/CURRENT_STATE.md` activates it and the current milestone gate is satisfied.

## Current State

The repository is currently in **M0 — Autonomous Development Foundation**.

See [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md) for the exact active task and known limitations.

## Core Principles

- UI does not contain physics.
- External provider/file data is runtime-validated before entering the domain.
- Wind FROM/TO direction and vector conversion must never be ambiguous.
- World axes use +X East / +Y North.
- Screen pixels never enter physical calculations.
- Internal physics uses SI units and full calculation precision.
- Missing, estimated, stale, and unsupported data are never silently treated as known.
- Same simulation input + same model version must produce the same result.
- Physics/scoring changes require regression tests and version review.
- Initial ventilation modeling is wind-driven; unsupported physics must be declared.
- Automatic floorplan recognition comes after the manual editor and solver are validated.
- The product is local-first and should minimize storage of exact residence/floorplan data.

## Development Commands

```bash
npm run bootstrap   # fresh clone: install dependencies, doctor, verify
npm run doctor      # bootstrapped environment sanity checks
npm run dev         # Vite dev server
npm run test:run    # deterministic test run
npm run verify      # typecheck + lint + tests + production build
```

## Planned Development Order

```text
Foundation
→ Domain Contract
→ Wind Lab
→ Validation/Snapshot
→ Provider Feasibility
→ Map / Address
→ Weather
→ Building / Residence
→ Outdoor Wind Model
→ Outdoor Validation Gate
→ Outdoor MVP
→ Manual Floorplan Editor
→ Airflow Lab
→ Indoor Solver
→ Opening Recommendation
→ Indoor MVP
→ Fan Optimization
→ Heat Sources
→ Floorplan Automation
```

Detailed planning lives in [docs/ROADMAP.md](docs/ROADMAP.md).

## Accuracy Scope

AirflowHome starts with simplified, explainable and testable models. Early results are relative/estimated ventilation guidance, not CFD-grade exact local airflow.

Unsupported or incomplete input should reduce confidence, produce a warning/limitation, or block calculation instead of fabricating precision.
