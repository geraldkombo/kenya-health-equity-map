# GDHF 2026 Lightning Talk — Dry-Run Review

## Current Script: gdhf-demo-script.md
## Target: 2 minutes (120 seconds)
## Track: Interoperability and Digital Public Infrastructure

---

## Timing Breakdown (Current Script)

| Section | Time | Words | Pace |
|---------|------|-------|------|
| Opening hook | 0:00–0:20 | ~45 | Good — punchy statistic |
| Feature 1: Choropleth | 0:20–0:50 | ~75 | OK — could tighten |
| Feature 2: Compare tool | 0:50–1:15 | ~60 | Good |
| Feature 3: PDF brief | 1:15–1:40 | ~65 | Good |
| Closing + CTA | 1:40–2:00 | ~70 | Slightly rushed |

**Total: ~2:05** — slightly over. Need to trim ~10 seconds.

---

## Suggested Refinements

### Opening (0:00–0:20) — Tighten statistic
**Current:** "Turkana scores 92 on our Priority Gap Scale. Nairobi scores 40. That 52-point gap means a mother in Turkana travels 3 hours for care that a mother in Nairobi reaches in 20 minutes."

**Issue:** "on our Priority Gap Scale" is extra words. Tighten to:

> "Turkana scores 92 on the Priority Gap Score. Nairobi scores 40. That 52-point gap means a mother in Turkana travels 3 hours for care that a mother in Nairobi reaches in 20 minutes."

**Saves:** ~3 seconds

### Feature 1 (0:20–0:50) — Let the map speak
**Current:** 75 words describing what the map shows.

**Issue:** Too much narration during a visual demo. The map is self-explanatory.

**Rewrite:**

> "Every county is colour-coded by its Priority Gap Score — a composite of travel time, poverty rate, and facility density. Dark red means severe gaps. Light yellow means relatively equitable access. *(gesture across map)* This is the first time these three metrics are combined into a single, publicly accessible view for all 47 counties."

**Saves:** ~5 seconds

### Feature 2 (0:50–1:15) — No change needed
This section is tight. The live demonstration of the compare tool is the most engaging part.

### Feature 3 (1:15–1:40) — Add a visual cue
**Issue:** "One click" — the audience needs to SEE the click. When you say this, physically reach for the mouse/trackpad so eyes follow your hand.

**No text change needed** — just a performance note.

### Closing (1:40–2:00) — Strengthen the CTA
**Current:** "We're looking for partners to take it from a map to a national planning tool."

**Issue:** Too passive. Make the call to action specific.

**Rewrite:**

> "The Priority Gap Score is designed as an interoperable indicator framework that can integrate into Kenya's DHIS2 ecosystem. I'm here looking for partners to help take it from a county-level map to a national planning tool. Try it now at the link on screen — and let's talk."

**Saves:** ~2 seconds — and ends with a direct invitation.

---

## Performance Notes

### Slide Deck (suggested 5 slides for a 2-min talk)

| Slide | Content | Timing |
|-------|---------|--------|
| 1 | Title slide: Name, project, "Kenya Health Equity Map" + QR code | 0:00–0:05 (intro) |
| 2 | Full-screen map — PGS choropleth of Kenya (let it load before speaking) | 0:05–0:50 |
| 3 | Compare view: Turkana vs West Pokot | 0:50–1:15 |
| 4 | PDF brief screenshot (showing the generated document) | 1:15–1:40 |
| 5 | Closing slide: URL + QR code + "geraldkombo@..." | 1:40–2:00 |

### Contingency Plans

**If Wi-Fi fails:**
- "Let me switch to the local version." (Open pre-loaded build or unlisted YouTube video)
- **Backup video URL:** Record and upload as unlisted before GDHF
- Practice the transition: "The connection seems slow — let me show you the recorded walkthrough instead."

**If the compare tool fails to load:**
- Skip Feature 2 entirely, go from Feature 1 directly to Feature 3 (the PDF brief)
- "The comparison tool normally shows side-by-side data, but let me show you what it produces — an actionable advocacy brief."

**If the audience asks about data freshness:**
- "Updated June 2026. Built entirely from static JSON — no server dependency, so there's never a stale cache."

**If asked about CARTO cost:**
- "CARTO offers a free tier for open-source projects. The architecture is tile-provider-independent, so we can switch to OpenMapTiles or any MVT source if needed."

### Demeanor
- **First 10 seconds:** Stand still, make eye contact, deliver the opening stat slowly
- **During map demo:** Step to the side of the screen and gesture toward the map — don't block it
- **During PDF demo:** Turn slightly toward the audience as the document renders to show the result
- **Last 10 seconds:** Face front, slow down, make eye contact, and deliver the call to action clearly

---

## Revised Full Script (Trimmed to ~1:55)

**[0:00–0:20] Opening**
> "Kenya has 47 counties. Turkana scores 92 on the Priority Gap Score. Nairobi scores 40. That 52-point gap means a mother in Turkana travels 3 hours for care that a mother in Nairobi reaches in 20 minutes."

**[0:20–0:50] The Map**
> "This is the Kenya Health Equity Map. Every county is colour-coded by its Priority Gap Score — a composite of travel time, poverty rate, and facility density. Dark red means severe gaps. Light yellow means equitable access. This is the first time these three metrics are combined into a single, publicly accessible view for all 47 counties."

**[0:50–1:15] Compare Tool**
> "Click any county to see its breakdown. But the real power is comparison. Turkana versus West Pokot — side-by-side: poverty rate, travel time, facility density. The difference in travel time alone is 45 minutes. This is the kind of evidence a County Health Management Team can carry into a resource allocation meeting tomorrow."

**[1:15–1:35] PDF Brief**
> "And this is where data becomes action. One click generates a publication-grade advocacy brief. *(click — show document)* No login. No tracking. The brief includes a baseline narrative, indicators, and advocacy focus areas tailored to that county."

**[1:35–1:55] Closing**
> "Built on open data — KNBS, OpenStreetMap, WHO AccessMod. Open-source under MIT. No cookies, no tracking. The Priority Gap Score is designed as an interoperable indicator framework that could integrate into Kenya's DHIS2 ecosystem. I'm looking for partners to take it from a map to a national planning tool. Try it at the link on screen — and let's talk."

**Total: ~1:55** (with 5 seconds of buffer)
