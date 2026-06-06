You are a brilliant, creative product-minded engineer with full autonomy. This is the **Kenya Health Equity Map** — a static Next.js 15 SSG site mapping health equity across Kenya's 47 counties. It's functional but not yet great. Make it extraordinary.

**Live site**: https://geraldkombo.github.io/nairobi-health-equity-map/
**GitHub**: https://github.com/geraldkombo/nairobi-health-equity-map
**Date**: June 2026

## Current State (June 2026)

- **Data**: Real OSM Overpass API → 1,699 real facilities across all 47 counties (validated, no UNKNOWN). No more synthetic data.
- **ETL**: Runs end-to-end with real KNBS 2019 population, KNBS 2021 poverty, Macharia 2022 travel times, KDHS 2022 immunization/SBA.
- **Map**: Clean county choropleth. No facility clusters or points (removed — user found them useless).
- **PGS**: Weighted composite (accessibility 0.4, population pressure 0.3, vulnerability 0.3). Thresholds: ≥70 critical, ≥50 high, ≥30 medium.
- **Deploy**: GitHub Pages at `geraldkombo.github.io/nairobi-health-equity-map/` via GitHub Actions. Netlify credits exhausted.
- **PWA**: Minimal manifest.json and service worker exist.
- **Pages**: Home (map+rankings), County brief, Compare, DUA, Method, Sitemap.

## Your Mission

Read every file. Form a vision. Make it great. You have complete autonomy — here are directions to explore:

- **Visual storytelling**: The map is just a choropleth. Add narrative flow, transitions, animated county entrance, a "guided tour" of Kenya's health divide.
- **Search & navigation**: 47 counties with no search. Add fuzzy search, keyboard-first, quick-jump between counties.
- **County briefs**: Make the brief page a true mini-report. Printable layout, key insights highlighted, sparklines of PGS components, nearest hospital info, shareable URLs with OG images per county.
- **Compare tool**: Side-by-side radar charts, split maps, overlay two counties visually. Make disparities visceral.
- **PGS breakdown**: Show the 3 components (accessibility, population pressure, vulnerability) visually. Let users tweak weights interactively and see scores update.
- **Ward-level**: Nairobi wards GeoJSON + ward indicators CSV exist in `data/`. Wire into a drill-down when Nairobi is selected.
- **Mobile**: The map on a phone needs to feel native, not cramped. Bottom sheets, larger tap targets, gesture-friendly.
- **Offline-first**: Cache GeoJSON boundaries + snapshots in service worker. Make it work on slow/flaky connections.
- **Performance**: The facilities GeoJSON loads but is unused on the map. Either use it smarter (show only at high zoom) or don't load it at all.
- **Data freshness**: Add "last updated" per data source (KNBS 2019, KDHS 2022, Overpass today). Build trust through transparency.
- **Accessibility**: Screen reader support for the map. Colorblind-friendly palette (the current amber/orange/brown might not be).
- **Personality**: The design is sterile. Make it feel Kenyan. Warm amber tones, bolder typography, a sense of place.
- **Shareability**: Every county should have a shareable deep link. OG images for each county dynamically.
- **Data gaps**: 1,699 OSM facilities is ~13% of Kenya's ~13,000+ actual facilities. Note this limitation, or find more data.

## What NOT To Do

- Add API routes, serverless functions, SSR — this is a static export only
- Re-add facility cluster circles or individual facility points to the map (user explicitly rejected them)
- Modify `.github/workflows/` or `netlify.toml`
- Leave the build broken — `npm run build` must pass after every change

## How To Work

1. Read every file deeply
2. Form a vision of 3-5 changes that make this impressive
3. Edit files directly, work iteratively
4. Run `npm run build` after every change
5. After milestones, `git add -A && git commit -m "msg" && git push origin master`

Make this something you'd be proud to show a health economist, a Kenyan policymaker, or a designer.
