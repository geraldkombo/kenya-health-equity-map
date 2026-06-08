# Gemini Prompt: Craft a Winning GDHF 2026 Abstract

You are a senior global health grant writer and digital health strategist. Your task is to transform the existing **Amref CSS Forum 2026 abstract** (below) into a winning submission for the **Global Digital Health Forum (GDHF) 2026** — deadline **June 30, 2026**.

## Submission Context
- **Conference:** GDHF 2026 (Bangkok / Virtual)
- **Target Track:** Interoperability and Digital Public Infrastructure (DPI) — NOT "community-led monitoring"
- **Session Type:** Lightning Talk or Panel
- **URL:** https://www.gdhf.digital/abstracts2026
- **Must check "Scholarship" box** for travel/hotel/airfare to Bangkok
- **Status:** Amref CSS Forum abstract already submitted (this is a SEPARATE submission for a different conference)

## Existing Abstract (Amref CSS Forum 2026)

```
Title: From Data to Advocacy: A Community-Led Health Equity Mapping Platform for Kenya

Kenya's 47 counties exhibit profound disparities in health infrastructure, with rural and arid regions facing acute shortages of facilities, personnel, and transport access. Yet granular, publicly accessible data on these inequities remains siloed in technical formats inaccessible to community health volunteers (CHVs), health facility management committees (HFMCs), and County Health Management Teams (CHMTs) who drive local advocacy.

We developed the Kenya Health Equity Map (KHEM), an open-source, browser-based platform that visualises health infrastructure inequities across all 47 counties using a composite Priority Gap Score (PGS). The PGS integrates four weighted indicators: travel time to nearest health facility (proxy for physical access; Accessibility weight = 0.4), population per facility (Population Pressure weight = 0.3), poverty rate (Vulnerability weight = 0.3), and facility density per 10,000 population. Scores range from 0 (high resource equity) to 100 (severe infrastructure gap).

Data sources include the KNBS 2019 Census (population estimates), the Kenya Integrated Household Budget Survey 2015/16 (poverty rates), and the ICPAC/KEMRI health facility inventory validated against OpenStreetMap (facility locations). Travel time modelling uses friction-surface least-cost path analysis in WHO AccessMod. The platform is built with Next.js 15 and CARTO map tiles; it requires no login, no cookies, and no user tracking.

Users can explore an interactive choropleth map of PGS scores, inspect county-level indicator breakdowns, generate downloadable analytical briefs for advocacy, and compare any two counties side-by-side. The platform has been workshopped with CHVs in Turkana, Tana River, and Elgeyo Marakwet counties, who validated the data against local knowledge and identified unmapped facilities for OpenStreetMap submission.

The Kenya Health Equity Map demonstrates that open-data, community-validated digital tools can bridge the gap between national datasets and local advocacy. By translating complex spatial metrics into actionable briefs, the platform empowers frontline health actors to negotiate resource allocation with evidence. All code is open-source at https://github.com/geraldkombo/kenya-health-equity-map.

Data sources: County populations from KNBS 2019 Census, poverty rates from KIHBS 2015/16, facility locations from ICPAC/KEMRI validated against OpenStreetMap, travel modelling via WHO AccessMod.
```

## Transformation Requirements

Rewrite this abstract for GDHF 2026 with the following changes:

### Language & Framing Shift
- Replace "community-led monitoring" framing with **Digital Public Infrastructure (DPI)** and **interoperability** framing
- Emphasize: open standards (OSM, KNBS), open-source architecture, no-tracking/privacy-by-design, SDG 3 alignment
- Position the Priority Gap Score (PGS) as an **interoperable data standard** that can be adopted by county health information systems
- Frame the platform as a **digital public good** that fills a gap between national DHIS2 data and local decision-making
- Use terms like: "open data standards," "federated architecture," "privacy-preserving," "interoperable indicator framework," "community-validated," "digital public infrastructure"

### Content to Keep
- The four PGS indicators and weights
- Data sources (KNBS, KIHBS, ICPAC/KEMRI, OSM, AccessMod)
- Tech stack (Next.js 15, CARTO, no login/cookies/tracking)
- The three counties where it was workshopped
- Open-source repo URL
- That it generates downloadable briefs for decision-makers

### Content to De-emphasize or Remove
- Remove "CHVs, HFMCs, CHMTs" as primary audience frame (replace with "county health decision-makers and community advocates")
- Tone down "community-led" in favor of "open digital infrastructure for decentralized decision-making"
- Remove "Budget hearings" if present (already removed in revised version)
- Less emphasis on "advocacy" — more on "data-driven planning and resource allocation"

### Recommendations to Add
Add ONE sentence at the end that positions the PGS as a reusable, interoperable indicator framework that could be integrated into Kenya's KHIS/DHIS2 ecosystem.

## Output
Return the **full revised abstract** ready to paste into the GDHF submission portal, plus a short paragraph with strategic submission tips (which track to check, whether to select Lightning Talk vs Panel, and how to frame the scholarship request).
