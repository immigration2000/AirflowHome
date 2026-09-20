# Provider Feasibility Registry

Research date: **2026-09-20**

This document records current public evidence for AirflowHome provider choices. It is a feasibility record, not a production integration specification.

Rules:

- Prefer official provider/public-data documentation.
- Do not treat technical accessibility as permission to cache or redistribute.
- Mark unknown legal or field semantics as **UNKNOWN** rather than guessing.
- No provider DTO may reach physics directly.
- No production provider is selected until representative live samples are tested.

## Current Candidate Matrix

| Need | Candidate | Current assessment | Cost / quota evidence | License / cache notes | Main unresolved risk |
|---|---|---|---|---|---|
| Address → coordinates | Kakao Map REST | Strong candidate for simple web UX | First Kakao Map-enabled app per developer account gets free quota; current daily free quota lists 100,000 address→coordinate calls. Paid overage currently 0.5 KRW/call. | Kakao operating policy restricts caching to user-environment improvement and requires cached data to stay current. Do not build a persistent address database from API responses. | Exact production caching/retention design must stay within Kakao terms. |
| Address canonicalization / official address source | Address-based Industry Support Service (Juso) | Strong fallback / official source | Address search has no normal call limit stated in official support answer; abusive traffic may be blocked. Coordinate API is limited to 10 calls per 5 seconds. | Separate coordinate API returns UTM-K (GRS80); transformation is required for lat/lon use. | Coordinate API can return blank coordinates for designated security buildings. |
| Map rendering | Kakao Map Web SDK | Strong MVP candidate | Current daily free quota lists 300,000 Web SDK calls for the first eligible app; paid overage currently 0.1 KRW/call. | Browser JavaScript key + registered web domain. Same Kakao platform/data usage policies apply. | 2026 quota policy changed; project must not assume historic free-use behavior. |
| Building footprint | MOLIT GIS Building Integrated Information (WMS/WFS, VWorld-linked) | Highest-priority footprint candidate | Public Data Portal lists free use; traffic depends on provider policy. Development auto-approval / operation review. | Portal lists unrestricted use for this dataset/API. Nationwide spatial scope. | API metadata freshness and actual WFS response quality must be tested; current portal metadata and separately updated SHP file have different freshness signals. |
| Building height / floor metadata | MOLIT BuildingHUB Building Ledger API | Strong candidate | Free; development account 10,000 calls, operating traffic can be increased through usage registration. | Portal lists unrestricted use. | Need to prove a reliable join from selected WFS building footprint to the correct ledger/title record. |
| Current / forecast wind | KMA Short-term Forecast API | Primary weather candidate | Free; development account 10,000 calls; operating increase available. | Public Nuri Type 1 attribution. Nationwide 5 km grid; current service also exposes ultra-short observations/forecasts. | Exact VEC direction semantics and nx/ny grid conversion must be verified from the current guide before adapter implementation. |
| Air quality | AirKorea Air Pollution API | Optional recommendation-layer candidate | Core Korean service is free; development account 500 calls; operating account requires review/increase request. | Public Nuri Type 3: attribution + no modification. | Station lookup/nearest-station flow, missing measurements, and cache/redistribution handling need explicit adapter policy. |

## 1. Kakao Map

### Relevant capabilities

Kakao Map currently provides:

- REST address → coordinate conversion,
- coordinate/address conversion,
- place search,
- Web JavaScript map SDK.

The REST address API returns coordinates and address details. Kakao recommends excluding overly detailed sub-address/building-name text from the query because accurate results are not guaranteed for arbitrary detailed-address formatting.

### Current quota / pricing signal

As of the research date, Kakao documents:

- Web Map JavaScript SDK: 300,000 calls/day free quota,
- Address → coordinates REST: 100,000 calls/day free quota,
- free Kakao Map quota only for the first eligible activated app per developer account,
- usage-based billing when the free quota does not apply or is exceeded,
- current listed overage pricing: 0.1 KRW per Web SDK call and 0.5 KRW per address→coordinate REST call.

These values are policy data and can change. Do not hard-code them into application logic.

### Data handling

Kakao's operating policy prohibits caching Kakao-provided data for purposes other than improving the user's app environment, and requires cached data to be kept current.

**AirflowHome consequence:** use Kakao results for interactive lookup/display, not as a permanently accumulated address/building database.

### Feasibility status

**PROMISING — live sample test still required.**

## 2. Address-based Industry Support Service (Juso)

### Relevant capabilities

The Ministry of the Interior and Safety address service provides road-address search and a separate coordinate-provision API.

Official support answers confirm:

- address search and coordinate lookup are separate APIs,
- coordinate output uses UTM-K (GRS80),
- lat/lon requires explicit conversion,
- coordinate API rate limit: 10 calls per 5 seconds,
- ordinary address search does not have a normal call-count limit stated by support, although abusive/DDoS-like traffic can be blocked,
- direct browser/app calls are permitted; a server hop is not required by policy,
- some security-designated buildings return address information without coordinates.

### AirflowHome role

Good candidate for:

- canonical official road-address data,
- fallback when a commercial map search is unavailable,
- validating address identifiers used to join other government datasets.

It is less convenient than Kakao for a browser MVP because coordinate lookup is a second operation and uses a projected coordinate system.

### Feasibility status

**PROMISING FALLBACK — live key/sample test required.**

## 3. MOLIT GIS Building Integrated Information (WMS/WFS)

Public Data Portal describes this dataset as building spatial information integrated with Building Administration System ledger attributes, based on continuous cadastral geometry.

Evidence currently indicates:

- nationwide scope,
- WMS/WFS / JSON+XML-linked access,
- free,
- portal lists unrestricted usage,
- development auto-approval / operation review,
- traffic amount depends on provider policy.

A separate SHP file dataset with the same GIS Building Integrated Information name was updated in 2026 and is described as automatically updated, while the WMS/WFS portal entry exposes older time-range metadata.

### AirflowHome role

Primary candidate for:

- building polygon/footprint,
- nearby-building geometry source,
- later building-face derivation.

### Important validation

Before production use, test at least:

- large apartment complex with many individual buildings,
- older apartment complex,
- mixed-use high-rise,
- irregular L/U-shaped building,
- redeveloped/new building.

Record:

- returned polygon granularity,
- multi-part geometry behavior,
- coordinate reference system,
- building identifier fields,
- missing/invalid polygons,
- current data freshness.

### Feasibility status

**HIGH PRIORITY — sample validation is a gate blocker.**

## 4. MOLIT BuildingHUB Building Ledger

The BuildingHUB Building Ledger service exposes ledger categories including basic overview, title/general building records, floor records, exclusive/common area records and related attributes.

The associated title dataset documents fields that include:

- building name / dong name,
- main use,
- structure,
- height,
- above-ground floor count,
- basement floor count,
- household count,
- building/total floor area,
- created/approval dates.

Current portal metadata states:

- free,
- unrestricted usage,
- development auto-approval,
- 10,000 development calls,
- operating traffic increase available after usage registration.

### Critical integration question

The most important M0.7 building-data test is not whether height exists; it does.

The key question is:

> Can the building selected from GIS Building Integrated Information be reliably joined to exactly one correct BuildingHUB title/building record?

Do not implement fuzzy name matching as the primary join.

Required investigation:

- stable management/building identifier available in both sources,
- fallback through legal-dong/lot/building identifiers,
- apartment complex with several dongs,
- duplicate or missing title records,
- demolished/rebuilt building freshness.

### Feasibility status

**STRONG METADATA SOURCE — join strategy not yet proven.**

## 5. Korea Meteorological Administration (KMA)

The KMA Short-term Forecast service provides:

- ultra-short current observations,
- ultra-short forecasts,
- short-term forecasts,
- nationwide grid coverage.

Public documentation states a nationwide approximately 5 km × 5 km forecast grid. The KMA API Hub documents wind variables including:

- `VEC` — wind direction,
- `WSD` — wind speed,
- `UUU` — east/west wind component,
- `VVV` — north/south wind component.

Current Public Data Portal terms:

- free,
- Public Nuri Type 1 attribution,
- development 10,000 calls,
- operating traffic increase available.

### AirflowHome adapter rules

The adapter must explicitly capture:

- issue/base time,
- observation/forecast target time,
- grid nx/ny,
- source category,
- raw unit,
- normalized `windFromDeg`,
- normalized `speedMps`,
- fetched time and freshness.

**Do not assume `VEC` FROM/TO semantics merely from the field name.** Confirm the current official guide before coding the converter.

KMA wind is regional/grid weather input, not the local building/unit wind result.

### Feasibility status

**PRIMARY WEATHER CANDIDATE — field-semantics sample check required.**

## 6. AirKorea

The core AirKorea Air Pollution API provides real-time station pollution data and forecast information, including PM10 and PM2.5.

Current core Korean service metadata states:

- free,
- Public Nuri Type 3 (attribution, no modification),
- development 500 calls,
- operation-stage review required,
- traffic increase can be requested after registering a usage case.

A newer station-information service provides station lists / nearby-station functionality based on coordinates, and currently lists a 10,000-call development quota with unrestricted-use metadata for that particular service.

### AirflowHome role

Air quality belongs to the **recommendation layer**, not the physics solver.

Example:

```text
Physics:
opening A+B gives stronger expected ventilation

Recommendation:
outdoor PM2.5 is high
→ penalize/defer opening recommendation
```

If AirKorea is unavailable, wind physics can still run. The app should return an air-quality-data warning rather than inventing an AQ score.

### Feasibility status

**OPTIONAL / NON-BLOCKING FOR OUTDOOR PHYSICS.**

## Provisional Adapter Boundaries

No provider DTO is allowed outside its adapter.

```text
AddressProvider
  searchAddress(query)
  resolveCoordinate(addressId)

MapProvider
  visualization only

BuildingFootprintProvider
  getBuildings(bounds)
  getBuildingGeometry(id)

BuildingMetadataProvider
  getBuildingMetadata(joinKey)

WeatherProvider
  getObservation(location, time)
  getForecast(location, time)

AirQualityProvider
  getNearestStation(location)
  getAirQuality(station, time)
```

Normalized provider outputs must enter existing domain validation before any solver-facing use.

## Provisional Fallback Chain

| Failure | Fallback |
|---|---|
| Address search fails | user selects point on map / retries with canonical road address |
| Address coordinate unavailable | alternate address provider or manual map point |
| Building footprint unavailable/invalid | user draws/corrects building polygon |
| Building metadata/height missing | ask user for known floor/building info; otherwise keep UNKNOWN |
| Weather provider unavailable | recent cache may be shown only as STALE with explicit timestamp; otherwise block current-wind simulation |
| Air-quality provider unavailable | omit AQ recommendation factor and show warning |
| Provider returns unsupported geometry | reject before solver and offer manual correction |

## Key/Proxy Guidance

Do not commit provider keys.

- Browser map SDK keys designed for registered domains can be used according to provider platform rules.
- REST/public-data service keys should generally be kept behind the small AirflowHome proxy when protecting quota/credentials matters.
- Juso support states direct calls are allowed, but key exposure and abuse risk should still be considered separately from protocol permission.
- Provider cache behavior must remain provider-specific; do not create one generic persistent provider cache policy.

## Representative Sample Matrix — Required Before M0.7 Exit

Live-key testing has **not yet been executed in this repository**, so M0.7 is not complete.

Use sanitized test labels rather than storing a user's exact residence.

Minimum sample categories:

| Case | Purpose |
|---|---|
| A — large modern apartment complex | multi-dong selection + footprint/ledger join |
| B — older apartment complex | older data quality / missing height |
| C — mixed-use high-rise | use/floor metadata ambiguity |
| D — irregular building footprint | polygon quality |
| E — recently completed/redeveloped building | freshness |
| F — address with unavailable coordinate if reproducible using non-sensitive public example | missing-coordinate fallback |

For each case record only the minimum public/sanitized evidence needed to evaluate provider behavior.

## Current M0.7 Blockers

1. Obtain development keys/approval for the candidate government APIs and Kakao test app.
2. Run the representative sample matrix.
3. Prove the Building GIS ↔ BuildingHUB join strategy.
4. Confirm KMA `VEC` direction convention from the current official guide/sample.
5. Confirm actual WFS CRS and response geometry type.
6. Record VWorld/WFS practical request limits and production approval behavior.
7. Confirm provider-specific storage/redistribution rules before any persistent caching.

Until those are resolved, no production provider architecture should be treated as final.

## Official Sources Consulted

- Kakao Map concepts: https://developers.kakao.com/docs/ko/kakaomap/common
- Kakao Map REST API: https://developers.kakao.com/docs/ko/kakaomap/rest-api
- Kakao quotas/pricing: https://developers.kakao.com/docs/ko/getting-started/quota
- Kakao operating policy: https://developers.kakao.com/terms/en/site-policies
- Address-based Industry Support Service: https://business.juso.go.kr/
- MOLIT GIS Building Integrated Information WMS/WFS: https://www.data.go.kr/data/15123970/openapi.do
- MOLIT GIS Building Integrated Information file dataset: https://www.data.go.kr/data/15083092/fileData.do
- MOLIT BuildingHUB Building Ledger API: https://www.data.go.kr/data/15134735/openapi.do
- KMA Short-term Forecast API: https://www.data.go.kr/data/15084084/openapi.do
- KMA API Hub short-term forecast reference: https://apihub.kma.go.kr/apiList.do?seqApi=10
- AirKorea Air Pollution API: https://www.data.go.kr/data/15073861/openapi.do
