# Physics Model Policy

The project starts with simplified, explainable models and increases complexity only after validation.

## Outdoor Progression
- L0: provider weather wind.
- L1: height correction.
- L2: building-face exposure/pressure.
- L3: nearby-building exposure, shielding, and wake risk.

Initial surrounding-building logic must not claim precise CFD direction deflection.

## Indoor Progression
- room/opening graph,
- pressure-network airflow,
- opening optimization,
- fan contribution,
- heat-source heuristics.

## Model Changes
A physical equation or coefficient change requires:
- rationale,
- source or explicit modeling assumption,
- tests,
- model-version review,
- validation review when relevant.

Calibration data and validation data must remain separate.
