# Kenya Health Equity Map

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Maps health access inequity across Kenya's 47 counties.

**Production URL:** https://geraldkombo.github.io/kenya-health-equity-map

## Data Sources

| Source | Data | License |
|--------|------|---------|
| KNBS 2019 Census | County population | Open Data |
| KDHS 2022 | Poverty estimates | Restricted (registered) |
| KMHFR / ICPAC-KEMRI | Health facility locations | CC-BY-4.0 |
| IEBC / KNBS GIS | County boundaries | Open Data / CC-BY-4.0 |
| WHO AccessMod | Travel time methodology | GPL-3.0 |
| OSM / ESA WorldCover | Road network, land cover | ODbL-1.0 / CC-BY-4.0 |

## Architecture

- **Frontend:** Next.js 15 static export + MapLibre GL JS + Tailwind CSS 4
- **Data Pipeline:** Zod-validated ETL scripts in `scripts/etl/`
- **Backend:** Zero runtime backend - all data is static JSON at build time
- **Deployment:** GitHub Actions → GitHub Pages

## Quick Start

```bash
npm install
npm run etl        # Extract, validate, build county indicators
npm run build      # Static export to out/
npx serve out      # Preview locally
```

## Project Structure

```
src/
├── app/           # Next.js pages (/, /brief, /compare, /method, /dua)
├── components/    # MapView, CountyDetails, CompareView, etc.
└── lib/           # scoring.ts, normalize.ts, adapters.ts, data-fetch.ts
scripts/etl/       # ETL pipeline (extract → validate → build snapshot)
data/snapshots/    # Validated county indicators as JSON
```

## License

MIT - see [LICENSE](LICENSE).

## Attribution

Data sourced from KNBS, ICPAC/KEMRI, OSM, ESA, and WHO. See the [Data Use Agreement](https://geraldkombo.github.io/kenya-health-equity-map/dua) for full attribution requirements.
