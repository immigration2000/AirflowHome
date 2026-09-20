# ADR-002 — Progressive Explainable Physics Before CFD

## Status
Accepted.

## Context
Full CFD would substantially increase implementation, validation, compute, and product-explanation complexity. The product first needs to establish whether simpler models provide useful relative ventilation guidance.

## Decision
Start with explainable deterministic models:
1. weather wind,
2. height/building-face effects,
3. simple exposure/shielding/wake-risk approximations,
4. indoor pressure-network airflow.

Do not begin with full CFD.

Initial ventilation modeling is explicitly wind-driven. Buoyancy/stack, terrain flow, detailed turbulence, and HVAC remain separate future capabilities.

## Consequences
- faster iteration and stronger testability,
- lower compute/infrastructure cost,
- easier explanation and debugging,
- limited claim precision,
- mandatory validation gates before expanding model complexity.
