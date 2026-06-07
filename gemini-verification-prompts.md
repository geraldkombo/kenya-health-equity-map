# Gemini Pro Fact-Checking Prompts

Copy-paste these into Gemini Pro to verify every claim before submission.

---

## 1. Bootstrapping Prompt (run first)

```
You are a fact-checker for a health equity submission to an academic conference.
All data below comes from our platform. Your job is to flag anything that looks
fabricated, outdated, or inconsistent with known Kenyan health data. Be strict.
Do not guess. If you are unsure of a number, say "UNVERIFIED" next to it.

Here is the data to check:
```

---

## 2. Verify Core Statistics

```
Fact-check these claims against KNBS, KDHS, World Bank, and peer-reviewed
research on Kenya. For each, say CONFIRMED, DISPUTED, or UNVERIFIED:

1. "29% of women attend their first antenatal visit in the first trimester"
   Source: KDHS 2022
   Is this an accurate figure from KDHS 2022?

2. "Neonatal mortality stands at 21 per 1,000 live births"
   Source: KDHS 2022
   Is this correct for Kenya?

3. "Turkana: 47% home births"
   Source: KDHS 2022
   Is this the correct figure for Turkana County?

4. "Nairobi: 618 mapped health facilities"
   Source: OpenStreetMap 2026
   Does this seem plausible given known counts?

5. "Tana River: 72.5% poverty rate"
   Source: KIHBS 2021 / KNBS
   Is this correct?

6. "Mandera: 50% home births"
   Source: KDHS 2022
   Is this correct?

7. "Elgeyo-Marakwet: 1 mapped facility per 454,000 people"
   Source: OpenStreetMap 2026 + KNBS 2019 census
   Is the population figure for Elgeyo-Marakwet correct?

8. "1,699 community-mapped health facilities (approximately 10% of
    Kenya's estimated 17,400+ registered health facilities)"
   Which figure is more authoritative: 1,699 OSM facilities or
   the official count of registered facilities in Kenya? What is
   the most recent official count of health facilities in Kenya?
```

---

## 3. Verify Priority Gap Score Methodology

```
The Priority Gap Score (PGS) is calculated as:

PGS = (NormalizedTravelTime × 0.4) + (NormalizedPovertyRate × 0.3)
     + (NormalizedPopulationPerFacility × 0.3)

Where each component is min-max normalized to 0-100.

Question: Is this a defensible methodology for a health access
inequity index? What criticisms would a peer reviewer raise?
Are the weights (0.4, 0.3, 0.3) arbitrary or grounded in literature?
```

---

## 4. Verify Amref Alignment Claims

```
Fact-check these claims about Amref Health Africa:

1. "Amref has deployed iMonitor in Turkana, funded by the Global Fund
    TB grant, with 32 peer monitors trained."
   Is this program real and currently active?

2. "Amref supports 107,000+ Community Health Promoters under eCHIS
    across 20+ counties."
   Is this the correct scale of Amref's eCHIS involvement?

3. "Amref's THRIVE project operates in Nakuru and Nyeri
    (2024-2026), funded by the Moderna Charitable Foundation."
   Is this accurate?

4. "Amref is running a GenAI pilot in Machakos with Dalberg,
    funded by the Gates Foundation."
   Is this project real?

5. "Amref convenes 26+ partners under the CHU4UHC platform
    including LWALA, Medic, Living Goods, UNICEF, USAID."
   Is this partnership platform real and is this the correct
   list of partners?

6. "M-JALI has trained 3,900+ CHWs and reduced reporting lag
    from 3 months to near real-time."
   Source: Amref / MoH published materials
   Is this accurate?

7. "Dr. Githinji Gitahi is Group CEO of Amref Health Africa."
   Is this still correct as of 2026?

8. "Catherine Kamau is CSS Coordinator at Amref Health Africa."
   Is this title and role correct?

9. "CS Aden Duale recognized Amref as 'core strategic partner'
    for UHC in May 2025."
   Is this statement accurate and correctly attributed?
```

---

## 5. Verify Travel Time Data

```
The platform uses travel time estimates from:
Macharia et al. 2022 (WHO AccessMod)
"Travel time to nearest health facility in Kenya"

Question 1: Is this the correct citation? What is the full
title, journal, and year of this paper?

Question 2: The platform claims "In ASAL counties, travel
exceeds 90 minutes to the nearest clinic." Is this supported
by Macharia et al. 2022?

Question 3: Is there a direct link to the open-access version
of this paper or its dataset?
```

---

## 6. Verify OpenStreetMap Facility Count

```
The platform uses 1,699 health facilities from OpenStreetMap
for Kenya, claiming this is ~10% of the estimated 17,400+
registered facilities.

Question 1: What is the most recent official count of health
facilities in Kenya from the Kenya Health Information System
(KHIS) or Ministry of Health?

Question 2: How many health facilities are currently mapped
on OpenStreetMap for Kenya as of 2026? Is 1,699 a reasonable
number, or has OSM coverage grown?

Question 3: Is the claim "~10%" mathematically reasonable
given the most recent official count?
```

---

## 7. Verify National Policy Context

```
Fact-check these claims about Kenyan health policy:

1. "Kenya has professionalized 107,000 Community Health Promoters
    under the Community Health Promoters (CHP) program."
   Is this the correct terminology and scale?

2. "29% ANC first trimester attendance nationally"
   Is this the most recent KDHS figure?

3. "Tana River: 48% home births"
   Confirm this against KDHS 2022 county-level tables.
```

---

## 8. Tone and Framing Audit (final pass)

```
Read the following paragraph and critique it for accuracy and
fairness:

"National averages can mask critical county-level disparities.
While Kenya's health indicators improve at the national level,
a woman in Turkana faces a 92-point inequity score and a 47%
chance of giving birth at home. Her counterpart in Nairobi
lives in a county scoring 40, served by 618 mapped facilities."

Questions:
1. Is "92-point inequity score" misleading since PGS is our
   own composite (not a standard metric)? Should we qualify
   this differently?
2. Is the Nairobi/Turkana comparison fair, or does it imply
   Nairobi has no access problems?
3. Is the phrase "masks critical county-level disparities"
   defensible given the data sources we use?
```
