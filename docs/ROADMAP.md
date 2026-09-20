# Roadmap

## M0 — Autonomous Development Foundation
Repository rules, architecture/domain/coordinate/unit docs, bootstrap/doctor/verify, CI, and initial wind tests.

## M0.5 — Wind Lab
Developer-only wind/geometry lab, mock controls, scenario runner, simulation/debug snapshots, golden scenarios.

## M1 — Basic Wind Map
Address/map shell, mock wind overlay, map-bearing handling.

## M2 — Weather
Current weather adapter, forecast timeline, seasonal/climate data separated from forecasts.

## M3 — Residence
Building selection, building faces, floor input, unit-area selection, facade exposure.

## M4 — Outdoor Simulation
Face pressure, height effect, nearby-building exposure/shielding/wake risk, confidence and trace.

**Outdoor MVP checkpoint**

## M5 — Floorplan Editor
Image upload, orientation/scale, manual rooms/windows/doors, editable connectivity, undo/redo.

## M5.5 — Airflow Lab
Deterministic room/opening scenarios, pressure controls, mass-balance diagnostics.

## M6 — Indoor Solver
Pressure network, room airflow, invariant/golden validation.

## M7 — Ventilation Recommendation
Opening optimizer, component scores, explanations, outside-air-quality constraints kept outside physics.

**Indoor MVP checkpoint**

## M8 — Fan Optimization
Fan model, candidate positions/directions, Web Worker optimization if required.

## M9 — Heat Sources
Draggable PC/TV/console sources and heat-removal/recirculation heuristic scores.

## M10 — Floorplan Automation
Automatic room/window/door candidate detection routed through the manual editor for confirmation.

Future milestones must not start until CURRENT_STATE activates them.
