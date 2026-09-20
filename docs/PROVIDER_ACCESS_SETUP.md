# Provider Access Setup

This document prepares local M0.7 live-provider feasibility testing.

It does **not** mean the listed providers are final production choices.

## Secret handling

1. Copy `.env.example` to `.env.local`.
2. Put development credentials only in `.env.local` or your shell environment.
3. Never commit `.env.local`, API keys, service keys, or provider response files containing secrets.
4. Run:

```bash
npm run provider:doctor
```

The command reports only whether required values exist. It never prints secret values.

Normal `npm run verify` does not require provider credentials.

## Required development access

### Kakao Developers

Create or use a Kakao Developers application and enable Kakao Map.

Configure:

```env
VITE_KAKAO_MAP_JS_KEY=
KAKAO_REST_API_KEY=
```

The JavaScript key is intended for the browser Map SDK and should be restricted to registered development/production domains in Kakao settings.

The REST key must not be bundled into browser JavaScript. Feasibility scripts or a future small proxy should read it from the server/process environment.

### Address-based Industry Support Service (Juso)

Apply for a development confirmation key for the road-address/coordinate APIs.

Configure:

```env
JUSO_CONFIRM_KEY=
```

Address search and coordinate lookup are separate operations. The coordinate service uses UTM-K (GRS80), so any future lat/lon conversion must be explicit and tested.

### Public Data Portal (data.go.kr)

Create/confirm a Public Data Portal account and request utilization for each required API.

Configure the issued service key:

```env
DATA_GO_KR_SERVICE_KEY=
```

A single account/service key value does **not** imply every API is enabled. Confirm utilization/approval separately for the services used in M0.7, including:

- MOLIT BuildingHUB Building Ledger,
- KMA Short-term Forecast / ultra-short observation where applicable,
- AirKorea services if air-quality testing is included.

Do not assume an API is available merely because the key exists.

### VWorld / GIS building access

Create the development access required for the selected VWorld/OpenAPI path used to test GIS building WFS/WMS.

Configure:

```env
VWORLD_API_KEY=
```

Before production integration, confirm the exact endpoint, coordinate reference system, request limits, allowed domains/IPs, attribution, caching, and redistribution rules.

## Readiness command

```bash
npm run provider:doctor
```

Expected shape:

```text
AirflowHome Provider Doctor

✓ VITE_KAKAO_MAP_JS_KEY — ...
✓ KAKAO_REST_API_KEY — ...
✓ JUSO_CONFIRM_KEY — ...
✓ DATA_GO_KR_SERVICE_KEY — ...
✓ VWORLD_API_KEY — ...

READY FOR M0.7 LIVE PROVIDER TESTING
```

Missing credentials intentionally return a non-zero exit code.

## M0.7 live-test order

After credentials are ready:

1. Test sanitized address lookup and coordinate resolution.
2. Fetch representative building footprints.
3. Inspect CRS, polygon/multipolygon behavior, identifiers, and freshness.
4. Query BuildingHUB for the same public sample buildings.
5. Prove or reject a stable footprint ↔ ledger join strategy.
6. Fetch KMA observation/forecast samples and confirm wind field semantics.
7. Optionally test AirKorea station resolution and PM10/PM2.5 availability.
8. Record results in `docs/PROVIDERS.md`.

Do not store a user's exact home as a fixture. Use public/non-sensitive representative examples.

## M0.7 completion

Having all keys is only **readiness**, not completion.

M0.7 remains open until the representative sample matrix and the remaining blockers in `docs/PROVIDERS.md` have been evaluated.
