# Snapshot Format

AirflowHome debug/simulation snapshots are reproducibility artifacts, not a general user-data backup format.

## Current Schema

The first implemented snapshot is `wind-lab` schema version `1`.

It contains:

- `schemaVersion`
- `snapshotType`
- explicit `simulationTime` with offset-aware `simulationAt` and `timeZone`
- `modelVersions`
- declared model `capabilities`
- component `confidence`
- stable issue codes/metadata
- normalized model `input`
- deterministic derived `result`

## Determinism

Canonical serialization:

- sorts object keys recursively,
- preserves array order,
- rejects non-finite numbers,
- normalizes negative zero,
- never injects the current time during serialization.

Time is explicit input. Therefore the same validated snapshot object produces byte-for-byte identical canonical JSON.

On import, Wind Lab snapshots replay the normalized input and reject the snapshot if the stored derived result no longer matches the active supported model version.

## Versioning

Unsupported `schemaVersion` values fail explicitly. Do not silently coerce an unknown snapshot version.

Model version and snapshot schema version are separate concepts:

- schema version describes serialized structure,
- model version identifies the calculation semantics.

## Privacy

Debug snapshots must not automatically include exact home addresses, full private floorplans, account identifiers, or hidden provider credentials.

Future product snapshots should include only the minimum normalized information required to reproduce the simulation.
