# Production Polish — Kenya Health Equity Map for CSS Forum Exhibition

You are an autonomous coding agent. Your mission: take the Kenya Health Equity Map from its current production state to exhibition-ready for the **3rd CSS Knowledge Dissemination Forum** at Lake Naivasha (23-25 June 2026). Every attendee who taps a county on a tablet at the marketplace exhibition must walk away convinced.

## Audience & Context

**Track:** Sub-theme 2 — Digital Health and Evidence Generation Through Community-Led Monitoring

**Exhibition demo flow:**
1. Visitor taps their home county on a tablet
2. Sees PGS, key indicators, and a clear advocacy takeaway
3. Switch to airplane mode — app still works fully
4. Generate the printable county brief
5. Compare their county with a neighboring one
6. Walk away with a printed brief they can carry into CHMT meetings

**What reviewers (AMREF/PEPFAR/Global Fund/MOH) care about:**
- Measurable CLM outcomes via PGS tracking
- Community data sovereignty (no extraction, no surveillance)
- Digital inclusion (offline-first on basic smartphones)
- Sustainability beyond donor funding (zero-cost static site)
- Transparent methodology (verifiable paper calculation, not a black box)

## Project State

**Production:** https://geraldkombo.github.io/kenya-health-equity-map/
**Source:** https://github.com/geraldkombo/kenya-health-equity-map
**Stack:** Next.js 15 (static export) + MapLibre GL JS + Tailwind CSS 4 + TypeScript
**Deploy:** GitHub Actions -> GitHub Pages + Netlify (dual)
**Build:** Compiles with 0 errors, types pass
**PWA:** Service worker v4 caches shell + tiles

### Pages (10 static routes)
- `/` — Map + CLM-advocacy home page with InsightsDashboard
- `/brief?county=XX` — Printable A4 county brief
- `/compare` — Side-by-side comparison with spectrum bar + reset
- `/method` — Plain-language PGS methodology
- `/dua` — Data sources and licenses
- `/forum` — CSS Forum landing page with offline verification
- `/sitemap.xml`, `/_not-found`, `/error`, `/global-error`

### Data Sources
- KNBS 2019 Census, KIHBS 2015/16 Poverty
- ICPAC/KEMRI Health Facilities (1,699 mapped)
- WHO AccessMod travel time model (Macharia et al. 2022)
- KDHS 2022 clinical indicators
- OpenStreetMap Kenya road network

## What to Execute (in order)

### 1. Data Integrity Verification
- Verify PGS values: Nairobi=40, Turkana=92, Mandera=91, Tana River=89
- Verify key indicators: Tana River poverty=72.5%, Turkana home births=47%, Mandera home births=50%
- Verify facility counts: Elgeyo-Marakwet ~1 per 454K people, Nairobi=618
- Cross-check all numbers against `abstract.md`, `submission.md`, `email-body.md`
- If any discrepancy exists, fix the source data, rebuild, and update all submission artifacts

### 2. CSS Forum Landing Page (`src/app/forum/page.tsx`)
- Add a QR code linking to the live platform
- Add a prominent "Test Offline Mode" instruction with airplane mode icon
- Ensure the three case study cards (Turkana, Mandera, Tana River) share accurate PGS scores
- Add a brief "How to use this at the marketplace" section
- Ensure all text addresses CSS reviewers, not developers
- Add proper meta tags for social sharing during the forum

### 3. Mobile Experience Hardening
- Test every interactive element at 320px width (iPhone SE)
- Ensure all touch targets are >= 44x44px
- Verify bottom sheet for CountyDetails works smoothly on mobile
- Check that the blue handlebar for dragging is accessible
- Ensure text doesn't overflow on small screens
- Verify the map legend fits without horizontal scroll
- Check that the print button is reachable on mobile

### 4. PWA Reliability
- Verify service worker caches all shell routes including `/forum/`, `/dua/`
- Test full offline flow: load once, enable airplane mode, navigate all pages
- Ensure offline fallback page exists for uncached routes
- Verify manifest.json icons are correct for all sizes
- Add `prefer_related_applications: false` if missing
- Test that `/brief?county=X` works offline after initial cache

### 5. Accessibility Audit
- Run aXe DevTools or manual check:
  - All interactive elements have focus-visible outlines
  - Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
  - Map has aria-label describing its purpose
  - Dynamic content (county details, comparison results) uses aria-live
  - Skip-to-content link exists
  - Keyboard navigation works for all features (tab through search, map, rankings)

### 6. Plain Language Audit on All Pages
- Remove: "composite index", "normalisation", "proxy indicators", "min-max", "geospatial"
- Replace with: "simple score", "travel time", "poverty rate", "facilities per 10,000 people", "map-based"
- Every page should answer: "What would a community health worker do with this information?"
- PGS must be described as a "verifiable paper calculation" — never "algorithm" or "model"
- Offline capability framed as digital inclusion, not a technical feature
- Remove all tech-stack mentions (Next.js, MapLibre, Zod, Fuse) from user-facing text

### 7. Print Brief Optimization (`src/app/brief/page.tsx`)
- Verify the brief prints cleanly on A4 with no overflow
- Ensure the PGS badge, key indicators, and source citations all fit on one page
- Add the platform URL and a "Generated by Kenya Health Equity Map" footer
- Test print with Turkana, Nairobi, Tana River, Elgeyo-Marakwet data
- Ensure the print button label is clear ("Print county brief" not just "Print")

### 8. Compare Page Polish (`src/app/compare/`)
- Verify "Reset Selection" clears both dropdowns
- Ensure comparison cards show meaningful differences, not just raw numbers
- Add a clear advocacy takeaway per comparison pair
- Test: compare Turkana vs Nairobi — the 52-point PGS gap must be visible at a glance
- Ensure neighbor suggestion chips work on mobile

### 9. SearchBar Enhancement
- Ensure Cmd+K / Ctrl+K keyboard shortcut works
- Search should match partial county names (e.g. "elgeyo" matches "Elgeyo-Marakwet")
- Ensure the dropdown is keyboard-navigable with arrow keys
- Add an accessible label (sr-only if needed)

### 10. Build & Deploy Verification
- Run `npm run build` — must pass with 0 errors
- Verify `out/` contains all expected HTML files
- Verify `out/data/` contains the snapshot files
- Check that the GitHub Pages deployment completes successfully
- Check that Netlify deployment completes successfully (if configured)
- Verify the live site loads all data correctly

### 11. Submission Artifact Sync (CSS Forum Template)
The official AMREF CSS Forum template (https://amref.org/wp-content/uploads/2023/05/Abstract-Template.docx) requires this exact structure:

1. **Thematic area** (tick one): Community-led monitoring | Community capacity building & leadership development | Community-led research & advocacy | Community engagement, linkages & coordination
2. **Abstract title** (max 25 words)
3. **List of all authors and their affiliation**
4. **Name and contact details of the presenting author** (telephone and email)
5. **Body** (max 300 words) with these four sections:
   - **Introduction:** Why this matters for CLM — national averages mask county-level disparities
   - **Description of intervention:** KHEM platform — offline-first, PGS (0-100), county briefs, comparison tools
   - **Findings and lessons learned:** PGS range 40 (Nairobi) to 92 (Turkana), 1,699 facilities mapped, 47 counties, community validation in Turkana/Tana River
   - **Conclusion and next steps:** Implications for CLM, sustainability (zero-cost static site), community ownership, invitation to crowdsource missing facilities

- Update `abstract.md` to follow this exact CSS Forum template structure
- Update `submission.md` with the full narrative
- Update `email-body.md` with the resubmission email
- Ensure ALL data points match between submission artifacts and the live platform
- Word count: 300 words max

## Technical Constraints

- Zero runtime backend. Static export only. No API routes, no serverless functions.
- No user tracking, no cookies, no analytics, no login.
- `npm run build` must pass after every change.
- Do not modify `.github/workflows/` deployment files.
- All data must remain static JSON in `public/data/snapshots/`.

## PGS Reminder

```
accessibility = travelTime * 0.6 + facilityDensity * 0.4
vulnerability = poverty
popPressure = populationPressure
rawPgs = accessibility * 0.4 + vulnerability * 0.3 + popPressure * 0.3
pgs = round(rawPgs * 100)
```

Thresholds: Low <30 (#FDE68A), Medium 30-49 (#F59E0B), High 50-69 (#EA580C), Critical 70+ (#78350F)

## Stop Conditions

Stop and report if:
- Build fails and you cannot fix it
- A data discrepancy cannot be resolved
- A UI bug breaks core functionality (map, brief, compare)
- You need clarification on a design decision
