# Kenya Health Equity Map — Signal-First Growth Blueprint

## 1. The Macro Reality
Kenya is mobile-first: ~5hrs/day on phones, 80-120 sessions/day (AppsFlyer/Google 2025). Utility apps grew 34%. Your users aren't scrolling Instagram — they're community health workers, CHMT members, and citizens who need actionable evidence. The platform loads on any browser, no install, no login. That IS the utility. Lead with that.

## 2. Funnel Upgrade: AIDA → AARRR

| Stage | Old thinking (AIDA) | KHEM reality (AARRR) |
|-------|---------------------|----------------------|
| **Acquisition** | Someone visits the site | Someone opens the map for the first time — via a WhatsApp link, QR code on a flyer, or CHMT meeting referral |
| **Activation** | They view a page | They look up their county, see the PGS, and understand what "92 out of 100" means for their community |
| **Retention** | They bookmark it | They return next month when preparing for a CHMT meeting, or to check if their county's data has changed |
| **Referral** | They share a link | A CHW shows the map to their colleague at a health facility meeting — offline, on their phone |
| **Revenue / Impact** | Not applicable (free tool) | A CHMT allocates resources or changes policy based on the evidence. That is the "conversion." |

**Activation is your North Star.** Not page views, not visitors. Activation = a user who can name their county's PGS and explain what it means.

## 3. The Attribution Bridge
**Problem:** Someone hears about KHEM at a CHMT workshop, opens it on their phone three days later, looks up Turkana, downloads the brief. Who gets credit? The workshop organizer needs to know their effort worked.

**The fix:** Every outreach channel gets a tracked link:
- `khem.ke/?ref=chmt_workshop_kwale_apr26`
- QR code on printed flyers: `khem.ke/?ref=flyer_msambweni`

**Technical:** The `ref` param persists in `sessionStorage`. When a county brief is generated or the share button is used, the source is logged. No database needed — Google Analytics or Plausible captures the ref as a UTM parameter.

**Dual-Timestamping in concept:** The "human event" (when a CHW decided to use the map) is different from the "server event" (the page load). Track `session_start` client-side vs `page_load` server-side to understand real advocacy timing.

## 4. Demand Balance (Hurman's 50/50 Rule)

| 50% Existing Demand | 50% Future Demand |
|---------------------|-------------------|
| Optimizing for CHWs already using the map — faster load, better brief print layout, clearer tooltips | Building Mental Availability in counties that haven't heard of KHEM |
| Fixing the hover tooltip issue (the gauge overlap) | Printed flyers with PGS thresholds explained in plain language |
| Improving the brief page for CHMT meetings | Community radio mentions — "Tafuta kaunti yako kwenye Ramani ya Afya" |
| Responding to user feedback on the score explanation | Partnering with CHMTs to schedule demo sessions |

**The Easter Island Effect warning:** If you only serve the 47 users who already know about KHEM, you plateau. The 90% of CHWs who haven't opened it yet are your Future Demand. Seed them now.

## 5. The Growth Triple-Play (McKinsey)

| Lever | KHEM Application |
|-------|------------------|
| **Creativity** | The narrative: "A community-owned platform." Not a tech tool, but a citizen's key to locked data. The abstracts and platform tagline already do this. Keep reinforcing. |
| **Analytics** | Which counties have the most brief downloads? Which referral sources (WhatsApp vs flyer vs workshop) drive the highest activation? Track this. |
| **Purpose** | Every data point serves the Moral Economy — citizens holding their CHMT accountable. The platform is not a project, it's infrastructure. |

**2.7x growth opportunity:** Most health data platforms only do Analytics (charts) or only do Purpose (advocacy). KHEM already does all three. Make that explicit in every abstract, presentation, and grant application.

## 6. The Loop in Action

**DATA:** Turkana brief downloads dropped 60% this month.

**QUESTION:** Is it because the dry season means CHWs are busier with field work, or because the tooltip bug made the PGS unusable on mobile?

**HYPOTHESIS:** The gauge overlap issue (the two names blocking each other) caused confusion — users couldn't read their county's score, so they stopped trying.

**EXPERIMENT:** Fix the CSS overlap (already done with `flex-shrink-0` and `whitespace-nowrap`). Track brief downloads for Turkana next month.

**LEARNING:** If downloads recover, the UI fix was the bottleneck. Document this. Next time a county drops, check UI issues before assuming seasonal factors.

## 7. The 90-Day Purge

**Delete from your dashboard (Vanity Matrix):**
- Total page views (means nothing — someone could view 50 times and never understand PGS)
- Session duration (5-minute session could be someone confused, not engaged)
- Bounce rate (a bounce on a single-page map IS the experience)

**Keep (Business Code):**
- **Activation rate:** % of visitors who look up a specific county
- **Brief downloads:** number of county briefs generated (this is the "conversion" — someone prepared for a CHMT meeting)
- **Share clicks:** how many times the share button was used (organic referral loop)
- **Top counties viewed:** which counties drive the most engagement (advocacy hotspots)
- **Ref source performance:** which outreach channel drives the most activations

## 8. HRP Integration

| High-Reliability Professional | How KHEM empowers them | How they feed back into the system |
|-------------------------------|------------------------|-------------------------------------|
| **CHW (Community Health Worker)** | Opens the map offline, shows their county's PGS, generates a brief for the CHMT meeting | Reports missing clinics to OpenStreetMap (ground-truth loop) |
| **CHMT member** | Uses the PGS to allocate resources, compare counties, justify budget decisions | Shares the map link with fellow CHMT members across counties |
| **Citizen / community advocate** | Brings the printed brief to a baraza or HFMC meeting | Triggers demand — "Why does our county score 89?" |
| **NGO / CBO partner** | Uses KHEM to identify priority areas for intervention | Links KHEM evidence to their funding proposals |

## 9. The "One Team" Execution Matrix

| Role | Metric that Matters | Actionable Output |
|------|---------------------|-------------------|
| **Builder (you)** | Activation rate per referral source | Fix UI friction; optimize brief print layout |
| **Advocate / Presenter** | County-specific brief downloads | Focus outreach on counties with low activation |
| **Community Partner** | Ground-truth contributions (OSM edits) | Train CHWs on OpenStreetMap reporting |
| **Grant Applicant** | PGS improvement stories | Collect case studies: "Turkana scored 92 → CHMT allocated mobile clinic" |

---

**One-liner for any abstract or pitch:** *"The Kenya Health Equity Map closes the gap between national statistics and local reality — putting a verified Priority Gap Score in every citizen's hand, on any phone, with zero permission needed."*
