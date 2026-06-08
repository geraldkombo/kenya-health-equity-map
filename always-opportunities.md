# Always-On Opportunity Radar

For every interaction with this project, always scan for:

## Submissions & Deadlines
- GDHF 2026 (Jun 30), Frazier Award (Jun 30), DPGA Registry (rolling)
- Africa Health-Tech Accelerator, other health equity / DPG / African innovation calls
- Any conference, award, grant, or accelerator whose window overlaps the current date

## Design & UX Improvements
- Elements that look unfinished, misaligned, or inconsistent with the production design system (4/8px grid, exact hex tokens, 44px touch targets, focus rings, WCAG AA)
- Any remaining default Tailwind semantic color names (`text-xs`, `border-amber-900`, etc.) that should be exact hex
- Typography inconsistencies (wrong font family, wrong weight, wrong tracking)
- Print layout breakage
- Mobile/touch usability gaps

## Code Quality
- Hardcoded strings that should be constants or config
- Import patterns that could be cleaner
- TypeScript strictness gaps (`any`, missing types)
- Dead code, unused imports, commented-out code
- Accessibility violations (missing aria labels, semantic HTML, focus management)

## Data & Content
- Stale or missing data fields
- Narrative that uses second-person pronouns or casual language (must be professional public-health register)
- Abbreviations not spelled out on first use
- Em dashes (U+2014) in user-facing files
- Kenya-system terminology accuracy

## DPG / Submission Readiness
- Any of the 9 DPGA indicators that could slip from COMPLIANT to NON-COMPLIANT
- Privacy, tracking, or cookie issues
- License/citation gaps
- Missing CONTRIBUTING, CITATION.cff, or README sections

## Strategic
- New data sources that could strengthen the platform
- Partnerships or integrations worth exploring
- Features that would strengthen a future grant application (offline mode, maternal health overlay, etc.)
- Competitor or peer projects doing something better

For each finding, report:
1. **What** the issue or opportunity is
2. **Where** (file path + line number)
3. **Why it matters** (impact on submission, UX, credibility, etc.)
4. **Suggested action** (specific edit or decision needed)
