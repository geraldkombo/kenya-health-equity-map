# Kenya Health Equity Map (KHEM)

**An open-data mapping tool for research and public-interest reporting across Kenya's 47 counties**

**Live demo:** https://uhcke-247.netlify.app  
**Repository:** https://github.com/geraldkombo/nairobi-health-equity-map

## Overview

KHEM turns public, non-identifiable open datasets into explainable spatial insights about health access and vulnerability across all 47 counties of Kenya. Built for researchers, journalists, and public finance advocates.

## Key features

- **Map-first:** Explore county-level PGS (Priority Gap Score) choropleth with hover tooltips and facility overlays (155 health facilities mapped)
- **Reporting Mode:** Plain-English insights, one-click brief generation per county
- **Side-by-side comparison:** Compare any two counties
- **One-page brief:** Print/PDF-ready brief per county with data provenance
- **Full transparency:** Methodology page with formula, sources, and limitations
- **County-level indicators:** Travel time proxy, poverty proxy, facility density, population pressure

## Data sources

All data is from official Kenyan open-data repositories:

| Source | Data | License |
|---|---|---|
| IEBC Official Boundaries | County boundary GeoJSON | CC-BY-4.0 |
| ICPAC/KEMRI Kenya Health Facilities | 155 health facility locations | CC-BY-4.0 |
| KNBS 2019 Census | County populations | Open Data |
| KIHBS 2015/16 | County poverty estimates | Open Data |

## Tech stack

- Next.js 15 (App Router) + TypeScript
- MapLibre GL JS (open-source mapping)
- Tailwind CSS v4 (zero-blue design system)
- Netlify (static-first CDN + serverless functions)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm run start
```

## Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=out
```

## License

MIT
