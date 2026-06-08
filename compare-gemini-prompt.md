# Gemini Prompt: Perfect the Compare View (Full UX/UI Pass)

You are a senior design engineer. Apply the **production design system** below to the **entire Compare section** of this Next.js 15 + Tailwind CSS codebase. The goal is a polished, WCAG AA, production-ready comparison tool for a community-led health equity map.

---

## Files to Refactor (4 files total)

| File | Status |
|---|---|
| `src/app/compare/page.tsx` | Server component — metadata + layout wrapper |
| `src/app/compare/CompareClient.tsx` | **Already done** — use as reference for tokens/spacing/patterns |
| `src/components/CompareView.tsx` | **Needs full refactor** — renders spectrum bar, county cards, table, key drivers, advocacy takeaway |
| `src/components/SourcesPanel.tsx` | **Needs refactor** — data sources accordion at bottom |

---

## Design System Tokens

### Color Palette (exact hex — no Tailwind semantic names like `text-xs`, `border-amber-900`, `bg-stone-50`)
```
#78350F - Primary dark (headings, labels, print header)
#EA580C - Accent (subheadings, borders, focus rings, CTAs)
#FFFBEB - Cream background (cards, callouts)
#F8F5F0 - Light warm bg (selectors panel, card headers, info boxes)
#F0EDE6 - Hover warm
#E0DBD0 - Borders, dividers
#A8A08F - Muted labels, secondary text
#8A8170 - Captions, tertiary text
#6B6355 - Body secondary text
#524B3F - Body text
#292524 - Primary body text
#C8C1B3 - Footers, watermark text
#FDE68A - Amber light (neighbor button hover)
#FCD34D - Amber border (neighbor button hover)
#92400E - Amber dark (neighbor button text)
#059669 - Emerald (WhatsApp links)
#047857 - Emerald hover
#C2410C - Orange hover (CTA hover)
#451A03 - Dark hover (primary button hover)
#B45309 - Orange hover (links)
```

### Typography Scale
```
Headings (H1): text-[24px] font-bold or text-3xl font-bold
Subheadings: text-[14px] font-bold uppercase tracking-widest
Section titles: text-[12px] font-bold uppercase tracking-widest
Labels: text-[12px] font-semibold uppercase
Body: text-[14px] leading-7
Small text: text-[12px]
Footnotes: text-[12px] leading-5
Print body: text-[10px]
```

### Spacing Grid
- All spacing uses increments of 4px or 8px only
- `p-4` = 16px, `p-8` = 32px, `gap-4` = 16px, `gap-8` = 32px, `mt-4` = 16px, `mb-8` = 32px
- Padding inside cards: `p-4` (16px) or `p-8` (32px)
- Section bottom margin: `mb-8`

### Border Radius
```
All corners: rounded-[8px] (or rounded-[6px] for buttons, rounded-[4px] for focus rings)
```
Never use `rounded-sm`, `rounded-lg`, `rounded-xl`, or `rounded-md`.

### Touch Targets
- All interactive elements: `min-h-[44px] min-w-[44px] inline-flex items-center justify-center`

### Focus-visible Rings (every interactive element)
```
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]
```

### Buttons
**Primary:**
```
className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-[6px] bg-[#78350F] px-4 py-2 text-[14px] font-bold text-[#FFFBEB] shadow-sm transition-colors hover:bg-[#451A03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
```

**Secondary / Ghost link:**
```
className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 rounded-[6px] text-[14px] font-medium text-[#524B3F] underline underline-offset-2 transition-colors hover:text-[#292524] hover:bg-[#F8F5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]"
```

**Small tag/chip buttons (neighbor suggestions):**
```
className="min-h-[44px] inline-flex items-center justify-center rounded-[6px] px-4 py-2 text-[14px] font-medium shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] active:scale-[0.98]"
```
Active state: `bg-[#78350F] font-bold text-[#FFFBEB]`
Inactive state: `bg-[#FFFBEB] border border-[#E0DBD0] text-[#92400E] hover:bg-[#FDE68A] hover:border-[#FCD34D]`

### Select / Dropdown
```
className="w-full min-h-[44px] rounded-[4px] border border-[#E0DBD0] bg-white px-4 py-2 text-[14px] text-[#292524] shadow-sm hover:border-[#A8A08F] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]"
```

### Links in prose / body text
```
className="underline underline-offset-2 hover:text-[#524B3F] min-h-[44px] inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] rounded-[4px] px-1"
```

---

## Specific Refactoring Instructions

### 1. CompareView.tsx — Full rewrite
- Replace ALL Tailwind utility class names (`text-xs`, `border-amber-900`, `bg-stone-50`, `text-stone-600`, `rounded-xl`, `rounded-lg`, `rounded-sm`, `border-stone-200`, `border-stone-100`, `bg-stone-100`, `text-stone-900`, `text-stone-500`, `text-stone-400`, `bg-stone-50`, `text-amber-800`, `text-amber-900`, `border-orange-200`, `border-orange-600`, `bg-orange-50`, `bg-orange-100`, `text-orange-700`, `text-orange-800`, `ring-2`, `ring-orange-500`) with the exact hex token equivalents from the palette above.
- Apply 4/8px spacing grid throughout (replace `gap-6` → `gap-8`, `p-5` → `p-8`, `mt-3` → `mt-4`, `mb-6` → `mb-8`, `mt-4` → `mt-4` or `mt-8`, `p-4` → `p-4` or `p-8`, `gap-3` → `gap-4`, `mt-2` → `mt-4`, `mb-1.5` → `mb-2`, `mt-1` → `mt-2`, `pt-3` → `pt-4`, `p-3` → `p-4`, `gap-1.5` → `gap-2`, `py-1.5` → `py-2`, `px-2.5` → `px-4`, `py-1` → `py-2`, `px-3` → `px-4`, `py-1.5` → `py-2`).
- Replace all `rounded-*` with `rounded-[8px]` (or `rounded-[6px]` for buttons, `rounded-[4px]` for inputs).
- Add `min-h-[44px] min-w-[44px]` to every interactive element.
- Add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]` to every interactive element.
- Add `active:scale-[0.98]` to all buttons.
- Apply print layout refinements: `print:text-[10px]` body, `print:p-2`, `print:m-2`, `print:hidden` on screen-only elements, `print:border-black`.
- The typography must strictly match the scale above (no `text-sm`, `text-xs`, `text-lg`, `text-2xl` in screen mode).

### 2. SourcesPanel.tsx — Refactor
- Same token replacement strategy.
- Replace `rounded-xl` → `rounded-[8px]`, `border-stone-200` → `border-[#E0DBD0]`, `bg-white` → `bg-white`.
- Replace `text-sm` → `text-[14px]`, `text-xs` → `text-[12px]`.
- Add focus-visible rings to all links and the `<summary>` element.
- Add `min-h-[44px]` to clickable elements.
- Replace `text-emerald-600` → `text-[#059669]`, `hover:text-emerald-700` → `hover:text-[#047857]`.

### 3. page.tsx — Minor
- Replace `px-4 py-8 sm:px-6` with `px-8 py-8` (consistent 32px padding).
- Keep metadata as-is.

### 4. CompareClient.tsx — already done, but verify:
- Ensure `text-sm` → `text-[14px]`, `text-xs` → `text-[12px]`.
- Ensure all spacings follow 4/8px grid (already reviewed).
- Confirm focus rings on all interactive elements.

---

## UX/UI Improvement Opportunities to Evaluate

After applying the design pass, review the **entire Compare flow** and identify additional improvements:

1. **Loading state**: When counties are selected but data hasn't loaded yet — show skeleton or inline spinner?
2. **Empty state**: When no counties selected — the current placeholder text works, but could it guide the user more actively?
3. **Spectrum bar usability**: The overlap detection (markersOverlap when diff < 8) stacks markers vertically — is this clear enough? Should there be a tooltip on hover?
4. **Mobile responsiveness**: At narrow viewports, the two county cards stack. CompareClient has `flex-col sm:flex-row` on the button group — does the card layout also need attention?
5. **Print layout**: Is the print report complete? Should the spectrum bar, key drivers, and advocacy takeaway all print legibly?
6. **Keyboard navigation**: Tab order through the two selects → neighbor buttons → print button → back link — is it logical?
7. **Error state**: If indicators data is missing for a selected county pair — how should CompareView handle it?
8. **Adjacency data**: The NEIGHBORS map in CompareClient is hardcoded — any edge cases missing?
9. **Data freshness note**: Should SourcesPanel show a "last updated" date?
10. **Announcements**: Should selecting a comparison trigger a polite screen-reader announcement?

Provide specific code snippets or structural recommendations for any improvements you identify.

---

## Verification Criteria

- No `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` (use explicit `text-[12px]`, `text-[14px]`, `text-[24px]`, `text-3xl` only)
- No `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl` (use `rounded-[8px]`, `rounded-[6px]`, `rounded-[4px]`)
- No Tailwind semantic color names (`amber-900`, `stone-600`, `orange-700`, etc.) in any className
- Every `<button>`, `<a>`, `<select>` has `min-h-[44px] min-w-[44px]` and `focus-visible:outline...`
- All spacing divisible by 4 (no 5, 6, 10, 14, etc.)
- Print: `print:hidden` on screen chrome, `print:block` on report elements, `print:` variants on sizes/colors
- Build must compile with 0 errors

---

Return the complete file contents for all 4 files above, plus a list of UX/UI improvement recommendations at the top.
