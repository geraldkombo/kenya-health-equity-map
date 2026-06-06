# ETL Pipeline — Kenya Health Equity Map

Data transformation scripts that convert raw Kenyan health data into the
JSON snapshots consumed by the frontend.

## Scripts

| Script | Stage | Source | Output |
|--------|-------|--------|--------|
| `fetch-kmhfr.ts` | Extract | KMHFR API (facilities) | `data/raw/facilities.json` |
| `fetch-knbs.ts` | Extract | KNBS census + KIHBS CSVs | `data/raw/county_stats.csv` |
| `fetch-khis.ts` | Extract | KHIS/DHIS2 API (immunization, delivery) | `data/raw/health_indicators.json` |
| `aggregate-wards.ts` | Transform | Raw ward data → county rollup | (in-memory) |
| `build-snapshots.ts` | Load | Aggregated data → frontend JSON | `data/snapshots/*.json` |

## Usage

```bash
# Full pipeline
npm run etl

# Individual stages
npm run etl:fetch
npm run etl:aggregate
npm run etl:build

# Build the site after refresh
npm run build
```

## Adding a new data source

1. Create a `fetch-<source>.ts` script that writes to `data/raw/`
2. Update `aggregate-wards.ts` to read the new field
3. Update `build-snapshots.ts` to emit the new field into `county_indicators.json`
4. Update `IndicatorRecord` in `src/lib/adapters.ts`
