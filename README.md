# AirflowHome

AirflowHome is a browser-based residential ventilation analysis project.

The long-term goal is to combine location, weather, building geometry, residence position, floorplans, and user-placed devices to provide explainable ventilation guidance.

## Claude Code: Start Here

When opening this repository in Claude Code:

1. Read `CLAUDE.md`.
2. Read `docs/CURRENT_STATE.md`.
3. Read the active milestone in `docs/ROADMAP.md`.
4. Read the architecture/domain/coordinate/unit rules referenced by `CLAUDE.md`.
5. Run:
   ```bash
   npm run doctor
   ```
6. On a fresh clone, run:
   ```bash
   npm run bootstrap
   ```
7. Before and after implementation, run:
   ```bash
   npm run verify
   ```

Do not start a future milestone unless `docs/CURRENT_STATE.md` activates it.

## Current State

The repository is currently in **M0 — Autonomous Development Foundation**.

See [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md) for the exact active task and known limitations.

## Core Principles

- UI does not contain physics.
- External provider data enters through adapters.
- Wind FROM/TO direction must never be ambiguous.
- Screen pixels never enter physical calculations.
- Internal physics uses SI units.
- Missing physical data is not silently replaced.
- Same simulation input + same model version must produce the same result.
- Physics/scoring changes require regression tests and version review.
- Automatic floorplan recognition comes after the manual editor and solver are validated.

## Development Commands

```bash
npm run bootstrap   # install dependencies, doctor, verify
npm run doctor      # repository/environment sanity checks
npm run dev         # Vite dev server
npm run test:run    # deterministic test run
npm run verify      # typecheck + lint + tests + production build
```

## Planned Development Order

```text
Foundation
→ Wind Lab
→ Map / Address
→ Weather
→ Building / Residence
→ Outdoor Wind Model
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

Unsupported or incomplete input should reduce confidence or produce a warning instead of fabricated precision.
