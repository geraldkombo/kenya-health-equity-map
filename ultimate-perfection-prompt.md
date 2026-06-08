# ULTIMATE PERFECTION PROMPT

You are the world's best full-stack engineer, UX designer, and digital health strategist combined. Your single mission: make the **Kenya Health Equity Map** absolutely perfect — the best it can possibly be in June 2026.

This is not about incremental improvement. This is about re-examining every assumption, every line of code, every pixel, every user flow, every data pipeline, and every submission artifact to find what's missing, what's suboptimal, and what's not yet been considered. Think harder than you have ever thought.

## The Project

- **Live URL:** https://geraldkombo.github.io/kenya-health-equity-map/
- **Source:** https://github.com/geraldkombo/kenya-health-equity-map
- **Stack:** Next.js 15 (static export), Tailwind CSS, MapLibre GL JS, CARTO tiles
- **Core:** Priority Gap Score (PGS) — composite of travel time (40%), poverty (30%), population pressure (30%)
- **Data:** KNBS Census, KIHBS, KDHS, ICPAC/KEMRI facilities, OSM, WHO AccessMod
- **Deploy:** GitHub Pages + Netlify (dual)
- **Deadlines:** GDHF 2026 (Jun 30), Frazier Award (Jun 30), DPGA Registry (rolling)

## What Has Been Done

- Production design system: exact hex colors, 4/8px grid, 44px touch targets, focus-visible rings, WCAG AA
- Gradient spectrum bar, per-county key drivers, PGS badges, facility density restored in CompareView
- Skilled Birth Attendance (SBA) added to CountyDetails + CompareView + method page
- MIT license, CONTRIBUTING.md, CITATION.cff, privacy/SDG statements in README
- Plain-language methodology with formula explanation + SDG 3/10 section on method page
- DPGA compliance answers drafted for all 9 indicators
- GDHF abstract rewritten for DPI/interoperability track
- Frazier Award narrative + cover letter drafted
- Em dashes (U+2014) replaced with double hyphens throughout source
- All navigation, empty states, error states, print layouts addressed

## Your Task

Analyze EVERY aspect of this project and tell me what would make it **perfect**. Do not hold back. Do not say "looks good" — find the flaws, the gaps, the missed opportunities. Organize your response into tiers:

### Tier 1: Things That Are Actually Wrong (Hard Flaws)
- Bugs, broken behavior on the live site
- TypeScript errors or `any` types that should be strict
- Accessibility violations (check contrast, ARIA labels, keyboard traps)
- Performance issues (bundle size, image optimization, map tile loading)
- Data integrity problems (missing values, stale data, incorrect calculations)
- Mobile responsiveness breakages

### Tier 2: Things That Could Be Better (Optimizations)
- Code architecture improvements (component splitting, state management, error boundaries)
- UX flow improvements (what would a first-time user find confusing?)
- Visual polish (animation timing, spacing consistency, loading states)
- Data pipeline improvements (ETL validation, freshness, automation)
- Documentation completeness (is anything unclear in README?)

### Tier 3: Things Not Yet Built (Missing Features)
- What features does this tool NEED that it doesn't have?
- What would a grant reviewer or conference attendee expect to see?
- What would make the demo unforgettable?
- What data sources or indicators are missing?
- What integrations are missing (DHIS2? API? Embed?)

### Tier 4: Strategic Gaps (Missed Opportunities)
- Are we targeting the right opportunities? Are there better ones?
- Is the narrative framing optimal for each audience?
- Is the project positioned correctly in the open-source health ecosystem?
- What partnerships or collaborations should be pursued?

## Source Files to Analyze

Read ALL of these files and the live site before answering:

### Core Source (src/):
- src/components/MapView.tsx
- src/components/CountyDetails.tsx
- src/components/CompareView.tsx
- src/components/CountyRankings.tsx
- src/components/InsightsDashboard.tsx
- src/components/WeightsControl.tsx
- src/components/SearchBar.tsx
- src/components/ShareButton.tsx
- src/components/HowToUse.tsx
- src/components/SourcesPanel.tsx
- src/app/page.tsx
- src/app/brief/page.tsx
- src/app/compare/page.tsx
- src/app/compare/CompareClient.tsx
- src/app/method/page.tsx
- src/app/dua/page.tsx
- src/app/forum/page.tsx
- src/app/layout.tsx
- src/app/not-found.tsx
- src/app/error.tsx
- src/lib/scoring.ts
- src/lib/normalize.ts
- src/lib/adapters.ts
- src/lib/data-fetch.ts
- src/lib/site.ts

### Config & Deploy:
- next.config.ts
- package.json
- .github/workflows/pages.yml
- .github/workflows/deploy.yml
- public/sw.js
- public/manifest.json

### Documentation:
- README.md
- CONTRIBUTING.md
- CITATION.cff
- LICENSE

### Data:
- data/snapshots/county_indicators.json
- data/snapshots/indicator_records.json
- data/snapshots/facilities.json

### Submission Artifacts:
- dpga-compliance-answers.md
- frazier-award-narrative.md
- frazier-cover-letter.md
- gdhf-demo-script.md
- gdhf-script-dryrun.md

## Output Format

Return a **prioritized defect/opportunity list** in this format:

```
P0 (SHIP-BLOCKING — fix before any submission):
- [File:Line] Description of the critical issue
- [File:Line] Description of the critical issue

P1 (HIGH — fix this week):
- ...

P2 (MEDIUM — fix before August deadlines):
- ...

P3 (NICE TO HAVE — fix when possible):
- ...

STRATEGIC RECOMMENDATIONS (not code, but positioning/partnerships):
- ...
```

Be ruthless. Do not protect my feelings. If the code is bad, say it's bad. If there's a better way, say it. If I'm missing something obvious, point it out. The goal is **absolute perfection in June 2026**.
