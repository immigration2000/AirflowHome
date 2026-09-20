# Claude Code Development Rules

AirflowHome is a browser-based residential ventilation analysis project.

## Startup Procedure

Before changing code:

1. Read `README.md`.
2. Read `docs/CURRENT_STATE.md`.
3. Read `docs/ROADMAP.md`.
4. Read `docs/MILESTONE_GATES.md`.
5. Read `docs/ARCHITECTURE.md`.
6. Read `docs/DOMAIN_RULES.md`.
7. Read `docs/COORDINATE_SYSTEMS.md`.
8. Read `docs/UNITS.md`.
9. On a fresh clone, run `npm run bootstrap`.
10. On an already bootstrapped clone, run `npm run doctor` and `npm run verify`.

Do not start future milestones unless `docs/CURRENT_STATE.md` explicitly activates them and the current milestone exit criteria are satisfied.

## Mandatory Rules

- TypeScript is the default implementation language.
- Keep UI, domain logic, physics, provider adapters, and visualization separated.
- React components must not contain airflow or wind physics.
- External API/file payloads must be runtime-validated before entering the domain layer.
- Never infer latitude/longitude order.
- Meteorological wind direction is always FROM direction unless a name explicitly contains `toDeg`.
- Internal world axes are `+X = East`, `+Y = North`.
- Meteorological angles are clockwise from North; do not pass them directly to generic math-angle formulas.
- Wind/vector conversion must use a named canonical helper.
- Physics uses SI units defined in `docs/UNITS.md`.
- Keep full floating-point precision during calculation; round only for presentation.
- Never silently replace missing physical data with a default.
- Estimated values must carry provenance/confidence.
- Unknown, estimated, stale, and unsupported are distinct states.
- Do not change physics equations or coefficients in unrelated work.
- Do not add dependencies that are not approved in `docs/TOOLING.md` without explicit approval.
- Do not refactor unrelated code.
- Do not delete or weaken failing tests just to make verification pass.
- Same simulation input + same model version must produce the same result.
- Do not claim unsupported physics such as CFD-grade turbulence, terrain flow, or buoyancy/stack effects in wind-driven v1.
- Do not commit directly to `main`; use a task branch and PR.
- Claude may update task status, but must not advance a milestone unless its exit criteria are satisfied.

## Protected Areas

Changes under `src/physics/**` or `src/solver/**` are PHYSICS_CHANGE work and require:
- a stated reason,
- relevant unit tests,
- golden/invariant tests when applicable,
- sensitivity/stability review when applicable,
- documentation review,
- model-version review.

## Task Workflow

For each task:

1. Inspect the current implementation and tests.
2. State the intended files to change.
3. Identify architecture/physics impact.
4. Make the smallest reasonable change.
5. Add or update tests.
6. Run `npm run verify`.
7. Review the diff for unrelated changes.
8. Update `docs/CURRENT_STATE.md` if project state changed.
9. Open a PR; do not push the task directly into `main`.

## Completion Report

Summarize:
- files changed,
- tests added/updated,
- assumptions,
- known limitations,
- verification result,
- recommended next task.
