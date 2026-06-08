# Kenya Health Equity Map

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![SDG 3](https://img.shields.io/badge/SDG_3-Good_Health-4C9F38.svg)](https://sdgs.un.org/goals/goal3)
[![SDG 10](https://img.shields.io/badge/SDG_10-Reduced_Inequalities-DD1367.svg)](https://sdgs.un.org/goals/goal10)
[![Digital Public Good](https://img.shields.io/badge/DPG-Aligned-0066CC.svg)](https://digitalpublicgoods.net)
[![No Cookies](https://img.shields.io/badge/Privacy-No_Cookies_•_No_Tracking-78350F.svg)](#privacy)

Open-source, offline-first digital platform for health equity monitoring across Kenya's 47 counties. Maps health access inequity using the **Priority Gap Score (PGS)** -- a transparent, verifiable composite of travel time, poverty, and facility density.

**Live platform:** https://geraldkombo.github.io/kenya-health-equity-map/

**Target users:** County Health Management Teams (CHMTs), Community Health Promoters, CBOs, CLM peer networks, Ministry of Health planners, and health equity researchers.

**Value proposition:** Translates complex public health data into printable, source-cited evidence that communities and decision-makers use to negotiate resource allocation and plan interventions.

---

## SDG Alignment

This platform directly supports:

- **SDG 3 -- Good Health and Well-being:** By identifying infrastructure gaps, the tool enables targeted resource allocation to reduce preventable mortality and improve access to care.
- **SDG 10 -- Reduced Inequalities:** The Priority Gap Score quantifies within-country disparities, making visible the inequities that affect rural and marginalised populations.

---

## Privacy

**This platform uses no cookies, requires no authentication or login, and performs zero user tracking.** All data is served as static JSON files at build time. No user data is collected, stored, or transmitted. The map tiles are served via CARTO with client-side rendering only -- no user coordinates or session data leave the browser.

---

## Data Sources

| Source | Data | License |
|--------|------|---------|
| KNBS 2019 Census | County population | Open Data |
| KIHBS 2015/16 | Poverty estimates | Restricted (registered) |
| KDHS 2022 | Skilled birth attendance, immunization | Restricted (registered) |
| ICPAC/KEMRI | Health facility locations | CC-BY-4.0 |
| IEBC / KNBS GIS | County boundaries | Open Data / CC-BY-4.0 |
| WHO AccessMod | Travel time methodology | GPL-3.0 |
| OpenStreetMap | Road network, land cover | ODbL-1.0 |

---

## Architecture

- **Frontend:** Next.js 15 static export + MapLibre GL JS + Tailwind CSS 4
- **Tile Provider:** CARTO (swappable -- MapLibre accepts any MVT-compatible tile source; no code changes required beyond the style URL)
- **Data Pipeline:** Zod-validated ETL scripts in `scripts/etl/`
- **Backend:** Zero runtime backend -- all data is static JSON at build time
- **Deployment:** GitHub Actions → GitHub Pages
- **Service Worker:** Cache-first strategy for offline access to map tiles and data

---

## Quick Start

```bash
npm install
npm run etl        # Extract, validate, build county indicators
npm run build      # Static export to out/
npx serve out      # Preview locally
```

---

## Project Structure

```
src/
├── app/           # Next.js pages (/, /brief, /compare, /method, /dua)
├── components/    # MapView, CountyDetails, CompareView, etc.
└── lib/           # scoring.ts, normalize.ts, adapters.ts, data-fetch.ts
scripts/etl/       # ETL pipeline (extract → validate → build snapshot)
data/snapshots/    # Validated county indicators as JSON
public/            # Static assets, icons, service worker
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting facilities, improving data, or contributing code.

---

## Citation

If you use this platform in research or advocacy, please cite:

```
Kenya Health Equity Map (2026). Priority Gap Score methodology and county-level health infrastructure indicators.
https://geraldkombo.github.io/kenya-health-equity-map/
```

See [CITATION.cff](CITATION.cff) for machine-readable citation format.

---

## License

MIT -- see [LICENSE](LICENSE).

---

## Attribution

Data sourced from KNBS, ICPAC/KEMRI, OSM, ESA, and WHO. See the [Data Use Agreement](https://geraldkombo.github.io/kenya-health-equity-map/dua) for full attribution requirements.
