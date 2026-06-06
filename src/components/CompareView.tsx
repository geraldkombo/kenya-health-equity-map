"use client";

import { useMemo } from "react";
import type { CountyRecord, IndicatorRecord } from "@/lib/adapters";
import { normalizeCounty } from "@/lib/normalize";
import { computePGS, DEFAULT_WEIGHTS } from "@/lib/scoring";

interface CompareViewProps {
  countyA: CountyRecord;
  countyB: CountyRecord;
  indicators: IndicatorRecord[];
}

export default function CompareView({ countyA, countyB, indicators }: CompareViewProps) {
  const stats = useMemo(() => {
    const iA = indicators.find((i) => i.county_code === countyA.id);
    const iB = indicators.find((i) => i.county_code === countyB.id);

    const sA = iA ? computePGS(countyA.id, normalizeCounty(iA), DEFAULT_WEIGHTS) : null;
    const sB = iB ? computePGS(countyB.id, normalizeCounty(iB), DEFAULT_WEIGHTS) : null;

    return { sA, sB, iA, iB };
  }, [countyA, countyB, indicators]);

  const narrative = useMemo(() => {
    if (!stats.sA || !stats.sB) return null;
    const diff = stats.sA.pgs - stats.sB.pgs;
    if (Math.abs(diff) < 0.01) return "Both counties have a similar assessed priority level.";
    const higher = diff > 0 ? countyA.name : countyB.name;
    const lower = diff > 0 ? countyB.name : countyA.name;
    return `${higher} is assessed as higher priority than ${lower}.`;
  }, [stats, countyA.name, countyB.name]);

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {[countyA, countyB].map((county) => {
          const s = county.id === countyA.id ? stats.sA : stats.sB;
          const ind = county.id === countyA.id ? stats.iA : stats.iB;
          return (
            <div key={county.id} className="rounded-xl border border-neutral-200 bg-white p-5">
              <h3 className="font-semibold text-neutral-900">{county.name}</h3>
              <p className="text-sm text-neutral-500">County</p>
              {s && (
                <div className="mt-3">
                  <div className="text-3xl font-bold text-neutral-900">{(s.pgs * 100).toFixed(0)}</div>
                  <div className="text-xs text-neutral-400">Priority Gap Score</div>
                </div>
              )}
              {ind && (
                <div className="mt-4 space-y-2 text-sm text-neutral-700">
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span>Population</span>
                    <span className="font-medium">{ind.population.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span>Poverty proxy</span>
                    <span className="font-medium">{ind.poverty_proxy}%</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span>Travel time proxy</span>
                    <span className="font-medium">{ind.travel_time_to_facility_proxy} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Facility density</span>
                    <span className="font-medium">{ind.facility_density_proxy} /km2</span>
                  </div>
                </div>
              )}
              {s && (
                <div className="mt-3 text-xs text-neutral-500">
                  <strong>Drivers:</strong> {s.drivers.slice(0, 2).join("; ") || "All indicators within range"}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {narrative && (
        <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-6 text-neutral-700" role="note">
          <strong>Comparison summary:</strong> {narrative}
        </div>
      )}
    </div>
  );
}
