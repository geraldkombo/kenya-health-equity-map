# GDHF 2026 Lightning Talk — Demo Script (2 minutes)

**Speaker:** Gerald Kombo
**Title:** The Kenya Health Equity Map: A Privacy-Preserving DPI for Decentralized Health Planning
**Track:** Interoperability and Digital Public Infrastructure

---

## [0:00–0:20] Opening

> "Kenya has 47 counties. The gap between the best-served and worst-served is not a difference — it's a chasm. Turkana scores 92 on our Priority Gap Scale. Nairobi scores 40. That 52-point gap means a mother in Turkana travels 3 hours for care that a mother in Nairobi reaches in 20 minutes."

---

## [0:20–0:50] Feature 1 — The PGS Choropleth

> "This is the Kenya Health Equity Map. Every county is colour-coded by its Priority Gap Score — a composite of travel time, poverty rate, and facility density. Dark red means severe infrastructure gaps. Light yellow means relatively equitable access. This is the first time these three metrics have been combined into a single, publicly accessible view for all 47 counties."

*[Gesture across the map — let the visual speak]*

---

## [0:50–1:15] Feature 2 — Compare Tool

> "Click any county to see its breakdown. But the real power is in comparison. Watch — I'll select Turkana, then its neighbour West Pokot. The platform instantly shows side-by-side: poverty rate, travel time, facility density. The difference in travel time alone is 45 minutes. This is the kind of evidence a County Health Management Team can carry into a resource allocation meeting tomorrow."

*[Demonstrate compare — Turkana vs West Pokot]*

---

## [1:15–1:40] Feature 3 — PDF Brief Generator

> "Now the key part: turning data into action. One click — 'Download PDF Document' — and a publication-grade advocacy brief is generated. No login. No account. No tracking. The brief includes a baseline narrative, the indicators, and actionable advocacy focus areas tailored to that county."

*[Click Download PDF, show the generated document]*

---

## [1:40–2:00] Closing + Call to Action

> "This is built on open data — KNBS, KIHBS, OpenStreetMap, WHO AccessMod. It's fully open-source under MIT. No cookies, no tracking, no login required. We've workshopped it with communities in Turkana, Tana River, and Elgeyo Marakwet — and they've already used it to identify unmapped facilities for OpenStreetMap."

> "The Priority Gap Score is designed as an interoperable indicator framework that could integrate into Kenya's DHIS2 ecosystem. We're looking for partners to take it from a map to a national planning tool."

> *[Last slide: URL + QR code]* "Try it now at the link on screen. Thank you."

---

## Backup Notes

- **If Wi-Fi fails:** Open the pre-loaded local build or play the unlisted YouTube video
- **If asked about data freshness:** "Updated June 2026. Built entirely from static JSON — no server dependency."
- **If asked about CARTO dependency:** "CARTO tiles are used for base maps. The vector tile stack is swappable — the architecture is provider-independent."
- **If asked about maternal health:** "We already include Skilled Birth Attendance data from KDHS 2022. A dedicated maternal health access overlay is in development."
