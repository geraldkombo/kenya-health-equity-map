"use client";

import { useMemo, useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { normalizeCounty } from "@/lib/normalize";
import { computePGS, DEFAULT_WEIGHTS, getPGSBadgeClass } from "@/lib/scoring";
import type { IndicatorRecord, CountyRecord } from "@/lib/adapters";
import { fetchCounties, fetchIndicators } from "@/lib/data-fetch";
import { matchCountyName } from "@/lib/county-names";

function PrintableBrief({
  county,
  indicator,
  authorName,
  authorTitle,
  authorOrg,
  notes,
  setNotes,
}: {
  county: CountyRecord;
  indicator: IndicatorRecord;
  authorName: string;
  authorTitle: string;
  authorOrg: string;
  notes: string[];
  setNotes: (notes: string[]) => void;
}) {
  const norm = normalizeCounty(indicator);
  const score = computePGS(county.id, norm, DEFAULT_WEIGHTS);
  const badgeClass = getPGSBadgeClass(score.pgs);
  const today = new Date().toLocaleDateString("en-KE", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="p-8 print:p-0 flex flex-col justify-between min-h-[277mm]">
      <div className="space-y-5 print:space-y-4">

        {/* Header */}
        <header className="border-b-4 border-[#EA580C] pb-3 flex justify-between items-end break-inside-avoid">
          <div>
            <h1 className="text-xl font-black text-stone-900 tracking-tight uppercase leading-none mb-1">Kenya Health Equity Map</h1>
            <p className="text-stone-600 font-medium text-[11px] uppercase tracking-wider">Community-Led Monitoring Evidence Brief</p>
          </div>
          <div className="text-right text-[11px] text-stone-700 leading-tight">
            {authorName && <p className="font-bold text-stone-900">{authorName}</p>}
            {authorTitle && <p>{authorTitle}</p>}
            {authorOrg && <p>{authorOrg}</p>}
            <p className="text-stone-500 mt-1">{today}</p>
          </div>
        </header>

        {/* County Name + PGS Badge */}
        <div className="flex gap-4 items-stretch break-inside-avoid">
          <div className="flex-1 bg-stone-50 p-5 print:p-4 border border-stone-200 rounded-lg flex flex-col justify-center">
            <h2 className="text-4xl print:text-[28pt] font-black text-stone-900 leading-none tracking-tight">{county.name} County</h2>
            <p className="text-sm print:text-[10pt] text-stone-600 mt-1 font-medium">Priority Gap Score: {score.pgs} out of 100</p>
          </div>
          <div className={`w-44 print:w-36 flex flex-col items-center justify-center rounded-lg border-2 ${badgeClass} shadow-sm`}>
            <span className="text-[10px] print:text-[8pt] font-bold uppercase tracking-wider opacity-90 mb-0.5">Priority Gap Score</span>
            <span className="text-5xl print:text-[36pt] font-black leading-none">{score.pgs}</span>
          </div>
        </div>

        {/* Key Drivers */}
        {score.drivers.length > 0 && (
          <div className="break-inside-avoid border-l-4 border-[#EA580C] bg-stone-50 p-5 print:p-3 rounded-r-lg">
            <h3 className="text-[11px] print:text-[8pt] font-bold text-stone-900 uppercase tracking-wider mb-2">Key Advocacy Drivers</h3>
            <ul className="space-y-2 print:space-y-1 text-[13px] print:text-[9pt] text-stone-800 leading-snug">
              {score.drivers.map((d, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-[#EA580C] mt-0.5 flex-shrink-0">
                    <svg className="w-4 h-4 print:w-3 print:h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Core Metrics */}
        <div className="grid grid-cols-4 gap-3 print:gap-2 break-inside-avoid">
          <div className="border border-stone-200 rounded-lg p-4 print:p-3 bg-white">
            <p className="text-2xl print:text-[16pt] font-black text-stone-900 leading-none">{indicator.population.toLocaleString()}</p>
            <p className="text-[11px] print:text-[7pt] text-stone-600 font-medium mt-1 leading-tight">Total population</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-4 print:p-3 bg-white">
            <p className="text-2xl print:text-[16pt] font-black text-stone-900 leading-none">{indicator.poverty_proxy}%</p>
            <p className="text-[11px] print:text-[7pt] text-stone-600 font-medium mt-1 leading-tight">Poverty rate</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-4 print:p-3 bg-white">
            <p className="text-2xl print:text-[16pt] font-black text-stone-900 leading-none">{indicator.travel_time_to_facility_proxy} <span className="text-sm font-normal text-stone-500">min</span></p>
            <p className="text-[11px] print:text-[7pt] text-stone-600 font-medium mt-1 leading-tight">Travel time to clinic</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-4 print:p-3 bg-white">
            <p className="text-2xl print:text-[16pt] font-black text-stone-900 leading-none">{indicator.facility_count}</p>
            <p className="text-[11px] print:text-[7pt] text-stone-600 font-medium mt-1 leading-tight">Mapped facilities</p>
          </div>
        </div>

        {/* Action Notes */}
        <div className="break-inside-avoid border border-stone-300 rounded-lg p-4 print:p-2 bg-white">
          <h3 className="text-[11px] print:text-[7pt] font-bold text-stone-900 uppercase tracking-wider mb-2 print:mb-1">County Health Management Team Action Notes</h3>
          <div className="space-y-3 print:space-y-1">
            {notes.map((note, i) => (
              <input
                key={i}
                type="text"
                value={note}
                onChange={(e) => {
                  const next = [...notes];
                  next[i] = e.target.value;
                  setNotes(next);
                }}
                placeholder="Type an action item..."
                className="w-full border-0 border-b border-stone-300 bg-transparent px-1 py-2 text-[13px] text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#EA580C] print:border-stone-400 print:text-[7pt] print:py-0.5"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-3 border-t-2 border-stone-200 break-inside-avoid">
        <div className="flex justify-between items-end">
          <div className="text-[10px] print:text-[6.5pt] text-stone-500 leading-tight max-w-xl">
            <p className="font-bold text-stone-700 mb-0.5">Methodology:</p>
            <p>The Priority Gap Score (0-100) combines travel time to the nearest clinic (40%), poverty rate (30%), and population-to-facility pressure (30%). Higher scores mean bigger barriers to health care. This is a verifiable paper calculation.</p>
            <p className="mt-0.5">Data: KNBS 2019 Census, KIHBS 2015/16, ICPAC/KEMRI Health Facilities, WHO AccessMod. {county.name} County Community-Led Monitoring Evidence Brief.</p>
          </div>
          <div className="text-right text-[10px] print:text-[6.5pt] font-medium text-stone-400">
            <p>Kenya Health Equity Map</p>
            <p>geraldkombo.github.io/kenya-health-equity-map</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BriefContent() {
  const params = useSearchParams();
  const countyCode = params.get("county");
  const printRef = useRef<HTMLDivElement>(null);

  const [counties, setCounties] = useState<CountyRecord[] | null>(null);
  const [indicators, setIndicators] = useState<IndicatorRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [authorName, setAuthorName] = useState("");
  const [authorTitle, setAuthorTitle] = useState("");
  const [authorOrg, setAuthorOrg] = useState("");
  const [notes, setNotes] = useState<string[]>(["", "", "", "", ""]);

  useEffect(() => {
    async function load() {
      try {
        setError(null);
        const [countiesRes, indicators] = await Promise.all([
          fetchCounties(),
          fetchIndicators(),
        ]);
        setCounties(countiesRes.counties);
        setIndicators(indicators);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load data.");
      }
    }
    load();
  }, []);

  const selected = useMemo(() => {
    if (!counties || !countyCode) return null;
    return counties.find((c) => c.id === countyCode) ?? null;
  }, [counties, countyCode]);

  const indicator = useMemo(() => {
    if (!selected) return null;
    return indicators.find((i) => matchCountyName(i.county_name, selected.name)) ?? null;
  }, [selected, indicators]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `kenya-health-equity-brief-${selected?.name?.toLowerCase().replace(/\s+/g, "-") ?? countyCode}`,
    pageStyle: `
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `,
  });

  const ready = selected && indicator;

  return (
    <div className="min-h-[100svh] bg-stone-100 text-[#292524]">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-8 sm:py-8">

        {/* Top nav */}
        <div className="mb-6 flex items-center gap-4 print:hidden">
          <Link
            href="/"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-[6px] text-[14px] font-medium text-[#524B3F] underline underline-offset-2 transition-colors hover:text-[#292524] hover:bg-[#F8F5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]"
          >
            &larr; Return to map
          </Link>
        </div>

        {/* Metadata Form */}
        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm print:hidden">
          <h2 className="text-lg font-bold text-stone-900 mb-1">Prepare Printed Brief</h2>
          <p className="text-sm text-stone-500 mb-5">Your details will appear on the printed document for County Health Management Team meetings.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="brief-name" className="block text-sm font-medium text-stone-700 mb-1">Your name</label>
              <input id="brief-name" type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="e.g. Jane Doe" className="w-full min-h-[44px] rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]" />
            </div>
            <div>
              <label htmlFor="brief-title" className="block text-sm font-medium text-stone-700 mb-1">Your title</label>
              <input id="brief-title" type="text" value={authorTitle} onChange={(e) => setAuthorTitle(e.target.value)} placeholder="e.g. Community Health Promoter" className="w-full min-h-[44px] rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]" />
            </div>
            <div>
              <label htmlFor="brief-org" className="block text-sm font-medium text-stone-700 mb-1">Organization / County</label>
              <input id="brief-org" type="text" value={authorOrg} onChange={(e) => setAuthorOrg(e.target.value)} placeholder="e.g. Turkana CHMT" className="w-full min-h-[44px] rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]" />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              onClick={() => handlePrint()}
              disabled={!ready}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-md bg-[#EA580C] px-5 py-2 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#C2410C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#92400E] disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print A4 Brief
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-[14px] text-red-700 print:hidden" role="alert">
            {error}
          </div>
        )}

        {/* Print Area */}
        {!countyCode ? (
          <div className="mt-8 rounded-[8px] border border-[#E0DBD0] bg-white p-8 text-[14px] text-[#524B3F] print:hidden">
            To access this page, select a county from the map interface and choose <strong>Generate county brief</strong>.
          </div>
        ) : !ready ? (
          <div className="mt-8 rounded-[8px] border border-[#E0DBD0] bg-white p-8 text-[14px] text-[#524B3F] print:hidden">
            Loading county metrics&hellip;
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-stone-200 bg-white shadow-xl print:shadow-none print:border-0" ref={printRef}>
            <PrintableBrief
              county={selected}
              indicator={indicator}
              authorName={authorName}
              authorTitle={authorTitle}
              authorOrg={authorOrg}
              notes={notes}
              setNotes={setNotes}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function BriefPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-6 sm:px-8 sm:py-8 text-[14px] text-[#524B3F]">Loading brief...</div>}>
      <BriefContent />
    </Suspense>
  );
}
