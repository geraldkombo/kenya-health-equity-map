# Gemini Prompt: Platform Improvements to Maximize Submission Success

The revised GDHF abstract (provided below) is strong. Now I need you to identify what **concrete improvements to the platform itself** would maximize acceptance across ALL of these opportunities:

## Target Opportunities
1. **GDHF 2026** — Lightning Talk (live demo of the app)
2. **DPGA Registry** — Technical compliance checklist
3. **Kenneth C. Frazier Award for Maternal Health Equity** — Maternal health narrative
4. **Global Public Health Awards (AFREHealth)** — Early career researcher grant
5. **Data.org Africa CAN** — Fellowship / showcase
6. **Mozilla Open Source Support (MOSS)** — Open-source infrastructure grant

## Review the Current Platform
The live app is at: https://geraldkombo.github.io/kenya-health-equity-map/
Source code: https://github.com/geraldkombo/kenya-health-equity-map

## What I Need

### A. For GDHF Lightning Talk
The abstract is ready. But for the live demo, what should be prepared?
- What 3 specific features should be demo'd in a 5-minute slot?
- What would make the demo "wow" the selection committee?
- Should a short (2-min) video walkthrough be prepared as a backup?

### B. For DPGA Registry
Check each of the 9 DPGA standards against the current platform and tell me specifically what's missing:
1. **Open source** — does the repo have an OSI-approved license? (MIT / Apache 2.0 / GPL?)
2. **Open data** — are all data sources clearly documented and freely accessible?
3. **Do no harm** — is there any risk of the platform causing harm (e.g., stigma from PGS scores)?
4. **Privacy** — is there a privacy policy? Is the no-tracking, no-cookies claim documented?
5. **SDG alignment** — is SDG 3 explicitly stated on the site or in the repo?
6. **Safety** — any content moderation risks?
7. **Platform independence** — does it depend on any proprietary service that could be revoked?
8. **Transparency** — is the methodology documented in plain language?
9. **Community ownership** — is there a contribution guide or community feedback mechanism?

For each, tell me: PASS / FAIL / PARTIAL and the exact fix needed.

### C. For Frazier Award (Maternal Health)
The current app has no maternal health-specific features. What's the MINIMUM change needed to credibly submit?
- Could a single new filter/view (e.g., "maternal health access overlay" combining travel time + poverty) be enough?
- What data would need to be added?
- Could this be done client-side with existing data, or does it need new data?

### D. General Platform Gaps
- Is the README complete enough for an evaluator who has never seen the project?
- Is there a CONTRIBUTING.md or community guide?
- Is there a citation / how-to-cite file?
- Is the methodology page (method page) detailed enough for a grant reviewer?
- Should there be a short video demo linked from the README?

## Output Format

Return a **prioritized action list** ranked by:
- **P0 (Critical before any submission):** Must fix this week
- **P1 (High):** Fix before GDHF deadline (June 30)
- **P2 (Medium):** Fix before August deadline
- **P3 (Nice to have):** Fix when possible

Each item should say:
- What to change
- Which file/repo location
- Which opportunity it unblocks
- Estimated effort (minutes / hours)

Put the GDHF abstract rewrite at the top as already done, then list the platform improvements below.
