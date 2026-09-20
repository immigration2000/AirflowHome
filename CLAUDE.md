# Claude Code Development Rules

AirflowHome is a browser-based residential ventilation analysis project.

## Startup Procedure

Before changing code:

1. Read `README.md`.
2. Read `docs/CURRENT_STATE.md`.
3. Read `docs/ROADMAP.md`.
4. Read `docs/ARCHITECTURE.md`.
5. Read `docs/DOMAIN_RULES.md`.
6. Read `docs/COORDINATE_SYSTEMS.md`.
7. Read `docs/UNITS.md`.
8. Run `npm run doctor`.
9. If dependencies are missing, run `npm run bootstrap`.
10. Run `npm run verify` before implementation.

Do not start future milestones unless `docs/CURRENT_STATE.md` explicitly activates them.

## Mandatory Rules

- TypeScript is the default implementation language.
- Keep UI, domain logic, physics, provider adapters, and visualization separated.
- React components must not contain airflow or wind physics.
- External API responses must be adapted before entering the domain layer.
- Never infer latitude/longitude order.
- Meteorological wind direction is always FROM direction unless a name explicitly contains `toDeg`.
- Internal angles are degrees: 0° North, 90° East, 180° South, 270° West.
- Physics uses SI units defined in `docs/UNITS.md`.
- Never silently replace missing physical data with a default.
- Estimated values must carry provenance/confidence.
- Do not change physics equations or coefficients in unrelated work.
- Do not add dependencies that are not approved in `docs/TOOLING.md` without explicit approval.
- Do not refactor unrelated code.
- Do not delete or weaken failing tests just to make verification pass.
- Same simulation input + same model version must produce the same result.

## Protected Areas

Changes under `src/physics/**` or `src/solver/**` are PHYSICS_CHANGE work and require:
- a stated reason,
- relevant unit tests,
- golden/invariant tests when applicable,
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
7. Update `docs/CURRENT_STATE.md` if project state changed.

## Completion Report

Summarize:
- files changed,
- tests added/updated,
- assumptions,
- known limitations,
- recommended next task.
