# CSS Forum Production Perfection — Autonomous Agent Mission

You are a world-class full-stack engineer, UX architect, and digital health strategist. Your single mission: take the **Kenya Health Equity Map (KHEM)** to absolute perfection for the **3rd CSS Knowledge Dissemination Forum** at Lake Naivasha, Kenya (23–25 June 2026).

This is NOT incremental polish. This is a comprehensive, ruthless optimization of speed, stability, capability, and exhibition-readiness. You have full autonomy to read, edit, create, and delete files. You run `npm run build` after every change. You verify everything.

---

## PROJECT CONTEXT

### Identity
**Live URL:** https://geraldkombo.github.io/kenya-health-equity-map/
**Source:** https://github.com/geraldkombo/kenya-health-equity-map
**Repository:** github.com/geraldkombo/kenya-health-equity-map (MIT license, open source)
**Developer:** Gerald Kombo — Independent Researcher and Developer

### Stack (exactly)
- Next.js 15.2.4 (static export — `output: "export"`)
- React 19, TypeScript 5.8
- MapLibre GL JS 4.7.1 (interactive county choropleth)
- ECharts 5.5.1 via echarts-for-react (rankings, comparisons)
- Tailwind CSS 4.1.6 (styling)
- Fuse.js 7.4 (county search fuzzy matching)
- Zod 4 (data boundary validation)
- PMTiles 4.4 (map tile protocol)
- Turf.js 7.3 (geospatial calculations)
- react-to-print 3.3 (county brief printing)

### Architecture
- **Zero runtime backend.** Fully static. No API routes, no serverless functions, no database.
- Data: static JSON in `public/data/snapshots/` — KNBS census, KIHBS poverty, KDHS clinical, ICPAC/KEMRI facilities, WHO AccessMod travel times
- PWA: Service worker v4 caches shell routes + CARTO tile origins for full offline
- Deployment: GitHub Pages (git push → Action → deploy) + Netlify fallback

### Pages (8 static routes)
| Route | Purpose | Key Component |
|---|---|---|
| `/` | Interactive county choropleth map + search + rankings | MapView, CountyDetails, InsightsDashboard, CountyRankings |
| `/brief?county=XX` | Printable one-page A4 county brief with data citations | (client component) |
| `/compare` | Side-by-side county comparison with spectrum bar | CompareClient, CompareView |
| `/method` | Plain-language PGS methodology + SDG alignment | (server component) |
| `/dua` | Data sources, licenses, attribution | (server component) |
| `/forum` | CSS Forum landing page with offline verification + case studies | (server component) |
| `/sitemap.xml` | SEO sitemap | (server component) |
| `/_not-found` | 404 fallback | (server component) |

### Core Data & Scoring
- **47 counties**, 1,699 mapped health facilities (OSM/ICPAC)
- **Priority Gap Score (PGS):** 0–100 transparent measure
  - Physical Access (40%) = travelTime * 0.6 + facilityDensity * 0.4
  - Vulnerability (30%) = poverty rate
  - Population Pressure (30%) = population per facility
  - PGS = round((access * 0.4 + vulnerability * 0.3 + popPressure * 0.3) * 100)
- **PGS thresholds:** Low <30 (#FFF7BC), Medium 30–49 (#FEC44F), High 50–69 (#D95F0E), Critical 70+ (#8C2D04)
- **Verified values:** Nairobi=40, Turkana=92, Mandera=91, Tana River=89, Elgeyo-Marakwet=~1 facility/454K people
- Tana River poverty: 72.5%, Turkana home births: 47%, Mandera home births: 50%, Turkana hardcore poverty: 42.6%

### Design Tokens (Tailwind CSS v4 `@theme` — globals.css)
- **Brand:** warm-50 through warm-900 (orange/brown spectrum), accent-50 through accent-900 (green)
- **PGS choropleth:** pgs-low (#FFF7BC), pgs-medium (#FEC44F), pgs-high (#D95F0E), pgs-critical (#8C2D04)
- **Text:** stone-800 body, stone-600 muted, stone-900 headings
- **Background:** stone-50 body, white cards
- **Borders:** stone-200
- **Fonts:** Inter (sans) + Lora (serif headings) via next/font/google
- **Focus:** accent-600 (green) outline
- **Touch targets:** 44px min height/width on all interactive elements

### Current Build Status
- ✅ Compiled successfully (0 errors)
- ✅ Linting and types pass
- ✅ 10/10 static pages generated
- ✅ 3/3 export complete
- Total JS: ~101kB shared + ~22kB page-specific

---

## CSS FORUM CONTEXT (CRITICAL — READ THIS)

### Event
**3rd CSS Knowledge Dissemination Forum**
- Dates: 23–25 June 2026
- Venue: Lake Naivasha, Kenya
- Organizer: Amref Health Africa in Kenya (Global Fund CSS Project)
- Theme: Community Systems Strengthening (CSS) — Community as Agents of Change

### Your Track
**Sub-theme 2: Digital Health and Evidence Generation Through Community-Led Monitoring**

### Exhibition Format
Marketplace exhibition with tablets. Attendees walk up, tap their home county, see evidence. The demo flow:
1. **Tap county on map** → see PGS badge + key indicators
2. **Enable airplane mode** → app still works fully (this is the CLINCHER for reviewers)
3. **Print brief** → one-page A4 with source citations
4. **Compare** → neighbor county PGS gap visible at a glance
5. **Walk away** → printed evidence to carry into CHMT meetings

### Audience (who you must convince)
1. **AMREF programme officers** — care about CLM outcomes, not tech specs
2. **PEPFAR/Global Fund reviewers** — need measurable CLM indicators (PGS as tracking metric)
3. **MOH/CHMT officials** — need verifiable, source-cited evidence for planning
4. **Community health promoters** — need tools that work offline on basic phones
5. **Peer network coordinators** — need cross-county comparison for regional advocacy

### What This Audience Cares About (in order)
1. **Measurable CLM outcomes** — PGS must be trackable over time (did the score improve?)
2. **Digital inclusion** — works offline, no login, no installation, no data collection
3. **Transparency** — verifiable paper calculation, not a black-box algorithm
4. **Sustainability** — zero hosting cost, no server, outlasts funding cycles
5. **Data sovereignty** — communities own the evidence, no extraction, no surveillance
6. **Integration** — complements eCHIS, iMonitor, DHIS2 (doesn't replace them)

### What To NEVER Say
- "Composite index" → say "simple score"
- "Normalisation" → say "simple calculation"
- "Algorithm" or "model" → say "verifiable paper calculation"
- "Proxy indicators" → say "travel time" or "poverty rate" or "facilities per 10,000 people"
- "Min-max scaling" → say "map-based conversion"
- "Geospatial analysis" → say "travel time mapping"
- "Next.js" or "MapLibre" or "Zod" or "Fuse" in user-facing text
- "Black box" or "opaque" (negative framing) — instead say "transparent" or "verifiable"

---

## YOUR MISSION: ACHIEVE ABSOLUTE PERFECTION

Execute EVERY step below in order. After each change, run `npm run build` and confirm 0 errors. If a change breaks the build, fix it immediately. Do NOT proceed to the next step until the current step passes.

---

### TIER 1: SPEED & PERFORMANCE

#### 1.1 Bundle Size Optimization
- Run `npx next build` and examine the build output
- Identify any large chunks (>50KB) and optimize:
  - Lazy-load MapView with `next/dynamic` + `ssr: false` (already done — verify)
  - Lazy-load ECharts components (CountyRankings, CompareView) — they load heavy charting library
  - Split ECharts import to only use needed components (bar, line) not full library
- Target: First Load JS shared < 90KB, page-specific < 20KB

#### 1.2 Font Loading
- Verify Inter + Lora use `display: "swap"` (already in layout.tsx — confirm)
- Add `font-display: optional` as fallback in CSS for non-critical text
- Ensure font files are self-hosted (next/font/google), not calling Google CDN at runtime

#### 1.3 Map Tile Performance
- MapLibre loads tiles from CARTO CDN — verify tiles load quickly
- Add `maxZoom: 8` in MapView config to prevent loading unnecessary high-zoom tiles
- Consider switching to PMTiles for fully offline map tiles (eliminates CDN dependency)

#### 1.4 Image Optimization
- All icons in `/public/icons/` should be compressed
- Verify OG image (`/og-image.svg`) is small (< 50KB)
- No unoptimized images in build output

---

### TIER 2: STABILITY & RELIABILITY

#### 2.1 Offline Mode Hardening
- Test full offline flow:
  1. Load app with internet
  2. Enable airplane mode
  3. Navigate: Home → Map → County click → Brief → Compare → Method → Forum → DUA
  4. Every page must work without internet
- If any page fails offline:
  - Add missing route to service worker SHELL array in `public/sw.js`
  - Add missing data files to cache
- Service worker must handle failed cache fetches gracefully (serve fallback)

#### 2.2 Error Boundaries
- Verify `src/app/error.tsx` and `src/app/global-error.tsx` catch all errors
- MapErrorBoundary in `src/components/MapErrorBoundary.tsx` must catch MapLibre crashes
- Add error boundaries around ECharts components (known to throw on resize)
- Data fetch failures should show user-friendly messages, not crash the page

#### 2.3 Data Integrity Verification
- Open `data/snapshots/indicator_records.json` and verify:
  - All 47 counties present
  - Nairobi PGS = 40, Turkana PGS = 92, Mandera = 91, Tana River = 89
  - Tana River poverty rate = 72.5%
  - No null/undefined values in critical fields
- Cross-check against values in `abstract.md`, `submission.md`, `email-body.md`
- If data is stale, note it for the developer — do NOT fabricate data

#### 2.4 TypeScript Strictness
- Run `npx tsc --noEmit` — verify 0 errors
- Fix any `any` types found in source files
- Ensure Zod schemas validate all data at the boundary

---

### TIER 3: CAPABILITY & FEATURES

#### 3.1 SearchBar Enhancement (`src/components/SearchBar.tsx`)
- Cmd+K / Ctrl+K must open search immediately
- Arrow keys must navigate results
- Enter must select highlighted result
- Escape must close
- Partial matching: "elgeyo" must match "Elgeyo-Marakwet"
- Add `aria-label="Search for a county"` on input
- Add `aria-live="polite"` on results container
- Set `role="combobox"` on input with `aria-expanded` and `aria-controls`

#### 3.2 Print Brief Optimization (`src/app/brief/page.tsx`)
- One A4 page maximum for any county
- Must include: county name, PGS badge, key indicators (poverty, home births, facility count, travel time), source citations, generated date
- Print-specific CSS must be flawless:
  - `@page { size: A4; margin: 10mm; }`
  - Hide nav, footer, buttons with `print:hidden`
  - Show print-only elements with `print:block`
  - Cards must use `break-inside-avoid` to prevent splitting across pages
  - Font size: 8pt on print, line-height 1.3
- Test with Turkana, Nairobi, Tana River

#### 3.3 Compare Page Polish (`src/app/compare/CompareClient.tsx`)
- "Reset Selection" must clear BOTH dropdowns and all chart state
- Comparison cards must highlight the PGS gap (e.g., "Turkana scores 52 points higher than Nairobi")
- Add advocacy takeaway text per comparison pair
- Ensure neighbor suggestion chips work and are styled for touch

#### 3.4 CountyDetails Enhancement (`src/components/CountyDetails.tsx`)
- Display all key indicators: PGS, poverty rate, home birth rate, facility count, travel time, population
- Show percentile rank among 47 counties
- Source citations for every data point
- Mobile bottom sheet must be draggable with clear handlebar

---

### TIER 4: EXHIBITION READINESS

#### 4.1 CSS Forum Landing Page (`src/app/forum/page.tsx`)
- Airplane mode verification instructions must be prominent
- Three case study cards (Turkana PGS 92, Mandera PGS 91, Tana River PGS 89)
- Each card links to the county brief
- Marketplace exhibition flow steps (1-4)
- Professional tone, addresses CSS reviewers directly
- Add proper meta tags for social sharing

#### 4.2 QR Code for Exhibition
- Add a QR code linking to the live platform URL on the forum page
- Use inline SVG QR code generation (no external deps)

#### 4.3 Demo Script Integration
- The platform should guide a first-time user through the demo flow
- Consider a "Take the Tour" button that walks through: Map → County → Brief → Compare
- Tooltips or hints for first-time visitors

---

### TIER 5: ACCESSIBILITY & INCLUSION

#### 5.1 Keyboard Navigation
- Tab through entire page: Search → Map → Rankings → Links
- All interactive elements reachable by keyboard
- Focus order follows visual order
- No keyboard traps

#### 5.2 Screen Reader Support
- Map has `aria-label="Map of Kenya showing health equity scores by county"`
- Dynamic content updates use `aria-live="polite"`
- Skip-to-content link at top of page
- All icons have `aria-hidden="true"` (decorative) or text alternatives

#### 5.3 Color & Contrast
- All text meets WCAG AA: 4.5:1 for normal text, 3:1 for large text (>18px bold or >24px)
- PGS choropleth colors are distinguishable by people with color vision deficiency
- Focus indicators: 2px green outline with 2px offset on all interactive elements
- Error states use both color AND iconography (not color alone)

#### 5.4 Touch Targets
- All buttons, links, and interactive elements: minimum 44x44px
- Touch targets well-spaced (no overlap at 320px width)
- Bottom sheet handlebar is at least 44px wide

---

### TIER 6: PWA & DEPLOYMENT

#### 6.1 Manifest Verification
- `public/manifest.json` must have:
  - `prefer_related_applications: false`
  - `display: "standalone"`
  - All icon sizes present (192, 512, SVG)
  - `categories: ["health", "maps", "civic-tech"]`
  - `background_color: "#FAFAF9"` (stone-50)
  - `theme_color: "#78350F"` (warm-900/brand brown)

#### 6.2 Service Worker Audit (`public/sw.js`)
- Cache all shell routes: `/`, `/brief/`, `/compare/`, `/method/`, `/forum/`, `/dua/`, `/_not-found`
- Cache tile origins for offline map usage
- Handle cache failures gracefully (don't block page load on failed tile cache)
- Version bump on significant changes (CACHE = "ke-health-v5")

#### 6.3 404 & Error Pages
- `src/app/not-found.tsx` — friendly message with link home
- `src/app/error.tsx` — catches runtime errors, retry button
- `src/app/global-error.tsx` — catches layout-level errors

---

### TIER 7: DATA & SUBMISSION ARTIFACT ALIGNMENT

#### 7.1 Abstract Alignment
- `abstract.md` must match the official AMREF CSS Forum template structure:
  - Thematic area (tick box — Community-led monitoring)
  - Title (max 25 words)
  - Authors and affiliation
  - Presenting author contact (email)
  - Body (max 300 words):
    - Introduction
    - Description of intervention
    - Findings and lessons learned
    - Conclusion and next steps
  - Keywords (max 5)
- ALL data points in abstract must match live platform values exactly

#### 7.2 Plain Language Audit
Scan ALL user-facing files (`src/app/*/page.tsx`, `src/components/*.tsx`) for forbidden terms:
- ❌ "composite index" → ✅ "simple score"
- ❌ "normalisation" → ✅ "simple calculation"
- ❌ "algorithm" → ✅ "verifiable paper calculation"
- ❌ "proxy indicator" → ✅ specific indicator name
- ❌ "min-max" → ✅ "map-based"
- ❌ "geospatial" → ✅ "travel time"
- ❌ tech stack names → ✅ plain language

---

## EXECUTION RULES

1. **Read first, edit second.** Read every file before modifying it.
2. **Build after every change.** Run `npm run build`. Fix any errors immediately.
3. **No regressions.** Never break a working feature.
4. **Preserve design tokens.** Use existing colors, fonts, spacing from globals.css `@theme`.
5. **Zero new dependencies.** Don't add packages unless absolutely necessary.
6. **No tracking.** Don't add analytics, cookies, or user data collection.
7. **Offline-first.** Never break offline functionality.
8. **Report blockers.** If you cannot fix something, explain exactly what is wrong and why.

## FINAL VERIFICATION CHECKLIST

Before declaring mission complete, verify ALL of the following:

- [ ] `npm run build` passes with 0 errors
- [ ] All 10/10 static pages generate
- [ ] Offline mode works: load → airplane mode → navigate all pages
- [ ] Search works: Cmd+K, type "elgeyo" → shows Elgeyo-Marakwet
- [ ] Print brief: Turkana brief fits on one A4 page
- [ ] Compare: Nairobi vs Turkana shows 52-point PGS gap
- [ ] Forum page shows with airplane mode test + 3 case studies
- [ ] All forbidden terms replaced with plain language
- [ ] Touch targets >= 44px on all interactive elements
- [ ] Keyboard navigation works end-to-end
- [ ] Abstract.md matches CSS Forum template, < 300 words, data matches live platform
- [ ] Manifest has prefer_related_applications: false
- [ ] SW caches all shell routes including /forum and /dua
- [ ] 0 `any` types in source files
- [ ] Error boundaries catch MapLibre + ECharts crashes

---

## STOP CONDITIONS

Stop immediately and report if:
- Build fails and you cannot fix it within 3 attempts
- A data integrity issue cannot be resolved (stale data, missing values)
- Offline mode is broken and cannot be repaired
- A change would require adding a new npm dependency
- You find a security issue

---

*Mission: Take KHEM to absolute production perfection for the 3rd CSS Knowledge Dissemination Forum — Sub-theme 2: Digital Health and Evidence Generation Through Community-Led Monitoring. Naivasha, June 2026.*
