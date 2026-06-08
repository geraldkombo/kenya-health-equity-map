# Gemini Prompt: Premium Typography System

You are a senior typography and UI design expert. The **Kenya Health Equity Map** currently uses the default Tailwind system font stack everywhere — headings, body text, labels, all the same. It needs a **premium typography system** befitting a Digital Public Good submitted to global health conferences and awards.

## Project Context
- **Framework:** Next.js 15 + Tailwind CSS (static export, no backend)
- **Design palette:** Exact hex colors (#78350F, #EA580C, #FFFBEB, #F8F5F0, #292524, etc.)
- **Spacing grid:** 4/8px increments
- **Brand:** Health equity / public health / African context (Kenya)
- **Deploy:** Static export to GitHub Pages

## What I Need

### 1. Font Pairing Recommendation
Recommend **2–3 font pairings** (heading font + body font) that are:
- **Available via Google Fonts** (self-hosted, no external requests at runtime — Next.js can inline them)
- **Premium-feeling** but free/open-source
- **Legible at small sizes** (the UI uses 12px labels and 14px body text)
- **Suitable for data-heavy dashboards** (narrow numerals, clear punctuation)
- **Culturally appropriate** for an African health equity project (not overly European/corporate)
- **Licensed for commercial/open-source use** (SIL Open Font License)

For each pairing, provide:
- Font names + weights to load
- Why this pairing works for this project
- What "vibe" it communicates (e.g., "trustworthy but approachable," "authoritative but warm")

### 2. Type Scale
Define a **4-step type scale** using the chosen fonts:

| Step | Size | Weight | Usage |
|------|------|--------|-------|
| 1 | 12px | 600/700 | Labels, captions, tab text |
| 2 | 14px | 400/500/600 | Body text, table cells |
| 3 | 20-24px | 700 | H2, card titles |
| 4 | 28-36px | 800/900 | H1, hero titles, PGS score display |

### 3. Implementation Code
Show me exactly how to implement this in:
- `src/app/layout.tsx` — how to import and configure fonts with `next/font/google`
- `tailwind.config` — how to set up font families in the Tailwind theme
- A sample component showing the fonts in use with the existing design tokens

### 4. Accessibility Check
- Ensure all font sizes meet WCAG AA at the chosen weights
- Ensure letter-spacing doesn't reduce readability
- Ensure the body font has good x-height for readability at 14px

## My Current Typography

Currently, every text element uses arbitrary Tailwind classes:
- `text-[12px] font-bold uppercase tracking-widest`
- `text-[14px] leading-7`
- `text-[24px] font-bold`

No font-family is specified — it falls back to the system stack. I want to add `font-heading` and `font-body` classes that map to real premium fonts.

## Deliverable

1. Your recommended font pairing (winner + alternatives)
2. The exact `next/font/google` import code for `layout.tsx`
3. The Tailwind config extension to add `font-heading` and `font-body`
4. A mapping table: which existing text roles map to which font-family + weight
5. Any CSS adjustments needed (line-height, letter-spacing, font-feature-settings)
6. What the pairing communicates to a GDHF reviewer / Frazier Award judge
