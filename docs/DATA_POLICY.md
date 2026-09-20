# Data, Privacy, and Provider Policy

## Local-first Product Principle

AirflowHome is expected to be useful even for one-off users. The initial architecture should avoid requiring accounts or persistent storage of residence data.

Default principles:
- no account required for MVP,
- no server persistence of uploaded floorplans by default,
- no analytics containing raw exact home addresses,
- no analytics containing full floorplan geometry,
- browser-local processing/storage where practical,
- user-triggered debug export rather than automatic upload of sensitive simulation inputs.

## Sensitive Product Inputs

Treat the combination of exact location, floor, unit position, and floorplan as privacy-sensitive even if individual fields may also exist in public sources.

Logs should prefer technical metadata such as model version, duration, warning codes, and coarse/non-identifying diagnostics.

## Provider Registry Requirement

Before production integration, document for every external provider:
- provider name,
- purpose,
- data fields used,
- unit/time semantics,
- coverage,
- quota/rate limits,
- cost,
- attribution requirement,
- commercial-use constraints,
- cache/storage permission,
- redistribution permission,
- freshness/TTL policy,
- fallback behavior.

Technical accessibility does not imply permission to scrape, store, or redistribute data.

## Freshness

Different data needs different freshness rules.

Examples:
- weather observation: short-lived,
- forecast: tied to forecast target/issue time,
- air quality: short-lived,
- building footprint: comparatively long-lived,
- building metadata: long-lived but still provenance-tracked.

A stale value must not silently appear as current.

## Provider Boundary

External payloads follow:

```text
Provider response
→ runtime schema
→ adapter
→ normalized/provenance-aware domain data
```

Provider-specific fields must not leak into physics.

## Test Fixtures

Provider fixtures must be sanitized and must not use a real user's exact private residence/floorplan data.
