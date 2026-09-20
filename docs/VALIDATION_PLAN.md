# Validation Plan

## Purpose

Automated software tests can prove implementation consistency, but they cannot by themselves prove that a simplified airflow model represents reality well enough for product claims.

Validation is therefore separate from ordinary unit testing.

## Validation Layers

### 1. Synthetic Cases
Use simple geometries with strong expected relationships:
- isolated rectangular building,
- wind normal to a facade,
- wind parallel to a facade,
- blocker placed directly upwind,
- blocker removed,
- corner residence,
- two-room cross-ventilation graph.

Primary goal: detect sign, direction, geometry, and relationship mistakes.

### 2. Calibration Cases
A limited dataset may be used to select/tune coefficients.

Calibration data must be clearly labeled and must not later be counted as independent validation evidence.

### 3. Holdout Validation Cases
Separate cases that were not used to tune the model.

Use them to judge whether the model's relative directional/exposure behavior generalizes.

### 4. Real-world Observation
Initial real-world validation may use modest observations such as:
- predominant wind direction,
- whether a facade is clearly windward/leeward,
- comparative exposure between openings,
- optional simple airflow/anemometer measurements later.

Do not imply instrument-grade accuracy without appropriate measurements.

## Early Success Criteria

Before numerical thresholds are justified, prioritize robust relational checks:
- windward pressure/exposure should generally exceed leeward under the modeled assumptions,
- introducing an upwind blocker should not inexplicably increase direct exposure in its wake,
- small input perturbations should not cause unexplained large discontinuities,
- map/screen rotation must not change physical world results,
- identical snapshots/model versions must reproduce identical results.

Specific numeric acceptance thresholds should be added only with evidence.

## Failure Response

If validation fails:
1. reproduce with a versioned snapshot,
2. determine whether the issue is data, geometry, implementation, coefficient calibration, or model limitation,
3. do not tune against holdout cases,
4. revise the model or reduce the supported scope/product claim,
5. add a regression/golden case when appropriate.

## Reporting

Each validated physics model should record:
- model version,
- supported cases,
- calibration dataset/version,
- validation dataset/version,
- known failure modes,
- unresolved limitations.
