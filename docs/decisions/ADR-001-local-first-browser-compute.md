# ADR-001 — Local-first Browser Computation

## Status
Accepted for the initial product architecture.

## Context
AirflowHome may process exact residence location, unit position, and floorplans. Many users may use the service only occasionally, while server-side simulation/storage would create recurring cost and privacy burden.

## Decision
Prefer browser-side computation and local state for MVP. Use a small server/proxy only when required for provider-key protection, caching, or provider access.

Do not require an account/database merely to run a simulation.

## Consequences
Benefits:
- lower recurring infrastructure cost,
- less sensitive persistent data,
- easier one-off use,
- deterministic client-side simulation snapshots.

Tradeoffs:
- browser performance limits,
- provider secrets still require a safe proxy,
- very heavy CFD-style computation is not appropriate for the initial architecture.
