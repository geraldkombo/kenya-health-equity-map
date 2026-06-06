"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, useCallback } from "react";
import CountyDetails from "@/components/CountyDetails";
import HowToUse from "@/components/HowToUse";
import SourcesPanel from "@/components/SourcesPanel";
import InsightsDashboard from "@/components/InsightsDashboard";
import type { CountyRecord, IndicatorRecord } from "@/lib/adapters";
import { normalizeCounty } from "@/lib/normalize";
import { computePGS, DEFAULT_WEIGHTS } from "@/lib/scoring";
import { fetchCounties, fetchIndicators } from "@/lib/data-fetch";
import MapErrorBoundary from "@/components/MapErrorBoundary";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function HomePage() {
  const [counties, setCounties] = useState<CountyRecord[] | null>(null);
  const [indicators, setIndicators] = useState<IndicatorRecord[]>([]);
  const [boundaries, setBoundaries] = useState<GeoJSON.FeatureCollection | null>(null);
  const [selectedCountyCode, setSelectedCountyCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dataFreshness, setDataFreshness] = useState<"live" | "snapshot" | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [countiesRes, indicators, boundariesRes] = await Promise.all([
          fetchCounties(),
          fetchIndicators(),
          fetch("/data/boundaries/counties.geojson").then(async (r) => {
            if (!r.ok) throw new Error(`Boundaries fetch failed: ${r.status}`);
            return r.json();
          }),
        ]);
        if (!Array.isArray(countiesRes.counties)) throw new Error("Counties data is not an array");
        if (!boundariesRes || !boundariesRes.features) throw new Error("Boundaries data missing features");
        setCounties(countiesRes.counties);
        setBoundaries(boundariesRes);
        setDataFreshness(countiesRes.source === "snapshot" ? "snapshot" : "live");
        setIndicators(indicators);
        setLoaded(true);
      } catch (e: any) {
        setError(`Data load error: ${e?.message ?? "Unknown"}`);
      }
    }
    load();
  }, []);

  const selectedCounty = useMemo(() => {
    if (!counties || !selectedCountyCode) return null;
    return counties.find((c) => c.id === selectedCountyCode) ?? null;
  }, [counties, selectedCountyCode]);

  const countyScores = useMemo(() => {
    if (!counties || indicators.length === 0) return {};
    const scores: Record<string, number> = {};
    for (const county of counties) {
      const ind = indicators.find((i) => i.county_code === county.id);
      if (ind) {
        const norm = normalizeCounty(ind);
        scores[county.id] = computePGS(county.id, norm, DEFAULT_WEIGHTS).pgs;
      }
    }
    return scores;
  }, [counties, indicators]);

  const countyNames = useMemo(() => {
    if (!counties) return {};
    const names: Record<string, string> = {};
    for (const c of counties) names[c.id] = c.name;
    return names;
  }, [counties]);

  const handleCountySelect = useCallback((countyCode: string) => {
    setSelectedCountyCode(countyCode);
  }, []);

  const totalFacilities = indicators.reduce((sum, i) => sum + i.facility_count, 0);
  const highPriorityCounties = counties ? counties.filter(c => (countyScores[c.id] ?? 0) >= 0.5).length : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {dataFreshness === "snapshot" && (
        <div className="mb-4 rounded-lg bg-warm-50 border border-warm-200 px-4 py-3 text-sm text-warm-800" role="alert">
          Using cached snapshot data. Live API endpoints were unavailable.
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      {loaded && counties && (
        <InsightsDashboard
          countyCount={counties.length}
          facilityCount={totalFacilities}
          highPriorityCount={highPriorityCounties}
          indicators={indicators}
        />
      )}

      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">Kenya Health Equity Map</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Explore health access inequities across Kenya&apos;s 47 counties. Hover the map to see scores, click a county for details.
        </p>
      </div>

      <div className="mb-6">
        <HowToUse />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {boundaries ? (
            <MapErrorBoundary>
              <MapView
                boundaries={boundaries}
                countyScores={countyScores}
                countyNames={countyNames}
                onCountyClick={handleCountySelect}
                selectedCountyCode={selectedCountyCode}
              />
            </MapErrorBoundary>
          ) : (
            <div className="flex h-[400px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-500">
              Loading map data...
            </div>
          )}

          <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm bg-[#22c55e]"></span> Low (below 0.30)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm bg-[#eab308]"></span> Medium (0.30&ndash;0.49)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm bg-[#f97316]"></span> High (0.50&ndash;0.69)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm bg-[#dc2626]"></span> Critical (0.70+)
            </span>
            <span className="ml-auto text-neutral-400">Priority Gap Score (PGS)</span>
          </div>
        </div>

        <div className="space-y-4">
          {selectedCounty ? (
            <CountyDetails
              county={selectedCounty}
              indicators={indicators}
            />
          ) : (
            <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-400">
              Click a county on the map to see details.
            </div>
          )}
          <SourcesPanel />
        </div>
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-6">
        <div className="flex flex-wrap gap-3">
          <a
            href="/brief?county=1"
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            View sample brief
          </a>
          <a
            href="/method"
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            View methodology
          </a>
          <a
            href="/compare"
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Compare counties
          </a>
        </div>
      </div>
    </div>
  );
}
