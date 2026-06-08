"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CompareView from "@/components/CompareView";
import SourcesPanel from "@/components/SourcesPanel";

interface CompareClientProps {
  counties: { id: string; name: string }[];
  indicators: any[];
}

const NEIGHBORS: Record<string, string[]> = {
  MOMBASA: ["KWALE", "KILIFI"],
  KWALE: ["MOMBASA", "KILIFI"],
  KILIFI: ["KWALE", "MOMBASA", "TANA RIVER"],
  "TANA RIVER": ["KILIFI", "LAMU", "GARISSA", "KITUI"],
  LAMU: ["TANA RIVER", "GARISSA"],
  "TAITA TAVETA": ["KWALE", "KILIFI", "MAKUENI"],
  GARISSA: ["TANA RIVER", "LAMU", "WAJIR", "ISIOLO"],
  WAJIR: ["GARISSA", "MANDERA", "MARSABIT", "ISIOLO"],
  MANDERA: ["WAJIR", "MARSABIT"],
  MARSABIT: ["WAJIR", "MANDERA", "ISIOLO", "SAMBURU"],
  ISIOLO: ["MARSABIT", "WAJIR", "GARISSA", "KITUI", "MERU", "SAMBURU"],
  MERU: ["ISIOLO", "THARAKA NITHI", "NYERI", "KIRINYAGA", "EMBU"],
  "THARAKA NITHI": ["MERU", "EMBU", "KITUI"],
  EMBU: ["THARAKA NITHI", "MERU", "KIRINYAGA", "MACHAKOS", "KITUI"],
  KITUI: ["TANA RIVER", "EMBU", "MACHAKOS", "MAKUENI"],
  MACHAKOS: ["KITUI", "EMBU", "MAKUENI", "KAJIADO", "NAIROBI", "KIAMBU"],
  MAKUENI: ["KITUI", "MACHAKOS", "KAJIADO", "TAITA TAVETA"],
  NYERI: ["MERU", "KIRINYAGA", "NYANDARUA", "NAKURU", "LAIKIPIA"],
  KIRINYAGA: ["MERU", "EMBU", "NYERI", "MURANGA"],
  MURANGA: ["KIRINYAGA", "KIAMBU", "NYANDARUA"],
  KIAMBU: ["NAIROBI", "MACHAKOS", "MURANGA", "NYANDARUA", "NAKURU"],
  NAIROBI: ["KIAMBU", "MACHAKOS", "KAJIADO"],
  KAJIADO: ["MACHAKOS", "MAKUENI", "TAITA TAVETA", "NAROK"],
  NYANDARUA: ["NYERI", "MURANGA", "KIAMBU", "NAKURU"],
  NAKURU: ["NYANDARUA", "KIAMBU", "LAIKIPIA", "BARINGO", "KERICHO", "NANDI"],
  LAIKIPIA: ["NYERI", "NAKURU", "SAMBURU", "ISIOLO"],
  SAMBURU: ["MARSABIT", "ISIOLO", "LAIKIPIA", "BARINGO", "WEST POKOT", "TURKANA"],
  BARINGO: ["NAKURU", "LAIKIPIA", "SAMBURU", "WEST POKOT"],
  "WEST POKOT": ["SAMBURU", "TURKANA", "TRANS NZOIA", "ELGEYO MARAKWET"],
  TURKANA: ["MARSABIT", "SAMBURU", "WEST POKOT"],
  "ELGEYO MARAKWET": ["BARINGO", "WEST POKOT", "TRANS NZOIA", "UASIN GISHU"],
  "TRANS NZOIA": ["WEST POKOT", "ELGEYO MARAKWET", "UASIN GISHU", "BUNGOMA"],
  "UASIN GISHU": ["ELGEYO MARAKWET", "TRANS NZOIA", "NANDI"],
  NANDI: ["NAKURU", "KERICHO", "UASIN GISHU"],
  KERICHO: ["NAKURU", "NANDI", "BOMET", "NAROK"],
  BOMET: ["KERICHO", "NAROK"],
  NAROK: ["KAJIADO", "KERICHO", "BOMET", "MIGORI"],
  "HOMA BAY": ["MIGORI", "KISUMU", "SIAYA"],
  MIGORI: ["NAROK", "HOMA BAY", "KISII"],
  KISUMU: ["HOMA BAY", "SIAYA", "VIHIGA"],
  SIAYA: ["HOMA BAY", "KISUMU", "VIHIGA"],
  VIHIGA: ["KISUMU", "SIAYA", "KAKAMEGA"],
  KAKAMEGA: ["VIHIGA", "BUSIA", "BUNGOMA"],
  BUSIA: ["KAKAMEGA", "BUNGOMA"],
  BUNGOMA: ["KAKAMEGA", "BUSIA", "TRANS NZOIA"],
  KISII: ["MIGORI", "NYAMIRA"],
  NYAMIRA: ["KISII"],
};

export default function CompareClient({ counties, indicators }: CompareClientProps) {
  const [countyA, setCountyA] = useState("");
  const [countyB, setCountyB] = useState("");

  const selA = useMemo(() => counties.find((c) => c.id === countyA) ?? null, [counties, countyA]);
  const selB = useMemo(() => counties.find((c) => c.id === countyB) ?? null, [counties, countyB]);

  const suggestedNeighbors = useMemo(() => {
    if (!selA) return [];
    const neighborNames = NEIGHBORS[selA.name.toUpperCase()] || [];
    return counties.filter((c) => neighborNames.includes(c.name.toUpperCase()));
  }, [selA, counties]);

  const handlePrint = () => window.print();

  return (
    <>
      <div className="mb-8 pb-4 border-b border-[#E0DBD0] print:hidden flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#78350F]">Compare Counties</h1>
          <p className="text-[#524B3F] mt-2 text-[14px]">
            Select two counties to evaluate their infrastructure disparities side-by-side.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {(countyA || countyB) && (
            <button
              onClick={() => { setCountyA(""); setCountyB(""); }}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-2 bg-[#F8F5F0] border border-[#E0DBD0] hover:bg-[#F0EDE6] text-[#292524] font-bold px-4 py-2 rounded-[6px] transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] active:scale-[0.98]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Reset Selection
            </button>
          )}
          {selA && selB && (
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] gap-2 rounded-[6px] bg-[#EA580C] px-4 py-2 text-[14px] font-semibold text-[#FFFBEB] shadow-sm transition-colors hover:bg-[#C2410C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#92400E] print:hidden active:scale-[0.98]"
            >
              Print advocacy report
            </button>
          )}
        </div>
      </div>

      {/* Selectors */}
      <div className="mt-8 rounded-[8px] border border-[#E0DBD0] bg-[#F8F5F0] p-4 sm:p-8 shadow-sm print:hidden">
        <div className="mb-4 flex items-center justify-between border-b border-[#E0DBD0] pb-4">
          <h2 className="text-[14px] font-bold uppercase tracking-wide text-[#524B3F]">
            Configure Comparison
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-[#292524]">
              Select Primary County
            </label>
            <select
              value={countyA}
              onChange={(e) => { setCountyA(e.target.value); setCountyB(""); }}
              className="w-full min-h-[44px] rounded-[4px] border border-[#E0DBD0] bg-white px-4 py-2 text-[14px] text-[#292524] shadow-sm hover:border-[#A8A08F] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]"
            >
              <option value="">-- Choose a County --</option>
              {counties.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-[#292524]">
              Select Comparison County
            </label>
            <select
              value={countyB}
              onChange={(e) => setCountyB(e.target.value)}
              disabled={!countyA}
              className="w-full min-h-[44px] rounded-[4px] border border-[#E0DBD0] bg-white px-4 py-2 text-[14px] text-[#292524] shadow-sm hover:border-[#A8A08F] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] disabled:opacity-50"
            >
              <option value="">-- Choose a County --</option>
              {counties.filter((c) => c.id !== countyA).map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {selA && suggestedNeighbors.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#6B6355]">
                  Suggested neighboring counties:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedNeighbors.map((n) => {
                    const isActive = selB?.id === n.id;
                    return (
                      <button
                        key={n.id}
                        onClick={() => setCountyB(n.id)}
                        className={`min-h-[44px] inline-flex items-center justify-center rounded-[6px] px-4 py-2 text-[14px] font-medium shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] active:scale-[0.98] ${
                          isActive
                            ? "bg-[#78350F] font-bold text-[#FFFBEB]"
                            : "bg-[#FFFBEB] border border-[#E0DBD0] text-[#92400E] hover:bg-[#FDE68A] hover:border-[#FCD34D]"
                        }`}
                      >
                        {isActive ? "Comparing " : "+ "}{n.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selA && selB && selA.id !== selB.id ? (
        <div className="mt-8 print:mt-4">
          <CompareView countyA={selA} countyB={selB} indicators={indicators} />
        </div>
      ) : (
        <div className="mt-8 rounded-[8px] border border-[#E0DBD0] bg-white p-8 text-center text-[14px] text-[#8A8170]">
          Select two counties to see a comparison.
        </div>
      )}

      <div className="hidden print:block text-center text-[14px] font-bold text-[#292524] mb-4">
        County Comparison Report - {selA?.name} vs {selB?.name}
      </div>

      <div className="mt-8 print:hidden">
        <SourcesPanel />
      </div>

      <div className="mt-8 text-center text-[12px] text-[#A8A08F] print:hidden flex justify-center">
        <Link href="/" className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-[6px] px-4 py-2 text-[#EA580C] hover:bg-[#F8F5F0] hover:text-[#C2410C] underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]">
          &larr; Return to map
        </Link>
      </div>
    </>
  );
}
