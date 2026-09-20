# Physics Model Policy

The project starts with simplified, explainable models and increases complexity only after validation.

## Model Capability Principle

Every simulation result must be interpretable in terms of what the active model does and does not represent.

The initial outdoor/indoor concept is **wind-driven ventilation v1**.

Not included in v1 unless explicitly activated by a later model version:
- buoyancy / stack-effect pressure,
- terrain/topographic wind modification,
- CFD-grade turbulence,
- exact wake-direction prediction,
- mechanical HVAC,
- fire/smoke flow.

Unsupported effects must be expressed as model limitations, not silently approximated.

## Outdoor Progression

- L0: provider weather wind.
- L1: height correction.
- L2: building-face exposure/pressure.
- L3: nearby-building exposure, shielding, and wake risk.

Initial surrounding-building logic must not claim precise CFD direction deflection.

Before L1-L3 implementation, the selected formulas, coefficients, applicability ranges, and references/assumptions must be documented and tested.

## Indoor Progression

- room/opening graph,
- wind-driven pressure-network airflow,
- opening optimization,
- fan contribution,
- heat-source heuristics.

A future model may add stack/buoyancy effects only as a separate, versioned capability.

## Numerical Stability

Solvers must define:
- numerical tolerances,
- maximum iterations where iterative solving is used,
- convergence criteria,
- damping/stabilization rules where required,
- explicit result status such as `converged`, `partial`, or `failed`.

A failed/non-converged solver must not return a normal-looking final recommendation without a clear status.

## Model Changes

A physical equation or coefficient change requires:
- rationale,
- source or explicit modeling assumption,
- applicability range,
- tests,
- sensitivity/stability review when appropriate,
- model-version review,
- validation review when relevant.

Calibration data and validation/holdout data must remain separate.

## Validation Gate

Passing unit tests is necessary but not sufficient. Physics milestones must also preserve expected physical relationships in golden scenarios and pass the validation plan before the next physics layer is treated as trustworthy.
