"use client";

import { useMemo } from "react";
import type { WardRecord, IndicatorRecord } from "@/lib/adapters";
import { normalizeWard } from "@/lib/normalize";
import { computePGS, type PGSWeights } from "@/lib/scoring";

interface CompareViewProps {
  wardA: WardRecord;
  wardB: WardRecord;
  indicators: IndicatorRecord[];
  weights: PGSWeights;
}

export default function CompareView({ wardA, wardB, indicators, weights }: CompareViewProps) {
  const stats = useMemo(() => {
    const allTravel = indicators.map((i) => i.travel_time_to_facility_proxy);
    const allPoverty = indicators.map((i) => i.poverty_proxy);
    const allPop = indicators.map((i) => i.population);
    const allDensity = indicators.map((i) => i.facility_density_proxy);

    const countyStats = {
      travelTimeRange: [Math.min(...allTravel), Math.max(...allTravel)] as [number, number],
      povertyRange: [Math.min(...allPoverty), Math.max(...allPoverty)] as [number, number],
      populationRange: [Math.min(...allPop), Math.max(...allPop)] as [number, number],
      facilityDensityRange: [Math.min(...allDensity), Math.max(...allDensity)] as [number, number],
    };

    const iA = indicators.find((i) => i.ward_code === wardA.id);
    const iB = indicators.find((i) => i.ward_code === wardB.id);

    const sA = iA ? computePGS(wardA.id, normalizeWard(iA, countyStats), weights) : null;
    const sB = iB ? computePGS(wardB.id, normalizeWard(iB, countyStats), weights) : null;

    return { sA, sB, iA, iB };
  }, [wardA, wardB, indicators, weights]);

  const narrative = useMemo(() => {
    if (!stats.sA || !stats.sB) return null;
    const diff = stats.sA.pgs - stats.sB.pgs;
    if (Math.abs(diff) < 0.01) return "Both wards have a similar assessed priority level.";
    const higher = diff > 0 ? wardA.name : wardB.name;
    const lower = diff > 0 ? wardB.name : wardA.name;
    return `${higher} is assessed as higher priority than ${lower}.`;
  }, [stats, wardA.name, wardB.name]);

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {[wardA, wardB].map((ward) => {
          const s = ward.id === wardA.id ? stats.sA : stats.sB;
          const ind = ward.id === wardA.id ? stats.iA : stats.iB;
          return (
            <div key={ward.id} className="rounded-xl border border-neutral-200 bg-white p-5">
              <h3 className="font-semibold text-neutral-900">{ward.name}</h3>
              <p className="text-sm text-neutral-500">{ward.subcounty}</p>
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
                    <span className="font-medium">{ind.facility_density_proxy} /km²</span>
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
