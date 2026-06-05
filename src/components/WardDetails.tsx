"use client";

import { useMemo } from "react";
import type { WardRecord, IndicatorRecord, FacilitiesGeoJSON } from "@/lib/adapters";
import { haversineKm } from "@/lib/geo";
import { computePGS, type PGSWeights } from "@/lib/scoring";
import { normalizeWard } from "@/lib/normalize";
import Link from "next/link";

interface WardDetailsProps {
  ward: WardRecord;
  indicators: IndicatorRecord[];
  facilities: FacilitiesGeoJSON | null;
  weights: PGSWeights;
  mode: "reporting" | "research";
}

export default function WardDetails({ ward, indicators, facilities, weights, mode }: WardDetailsProps) {
  const indicator = indicators.find((i) => i.ward_code === ward.id);

  const score = useMemo(() => {
    if (!indicator) return null;
    const allTravel = indicators.map((i) => i.travel_time_to_facility_proxy);
    const allPoverty = indicators.map((i) => i.poverty_proxy);
    const allPop = indicators.map((i) => i.population);
    const allDensity = indicators.map((i) => i.facility_density_proxy);

    const norm = normalizeWard(indicator, {
      travelTimeRange: [Math.min(...allTravel), Math.max(...allTravel)],
      povertyRange: [Math.min(...allPoverty), Math.max(...allPoverty)],
      populationRange: [Math.min(...allPop), Math.max(...allPop)],
      facilityDensityRange: [Math.min(...allDensity), Math.max(...allDensity)],
    });
    return computePGS(ward.id, norm, weights);
  }, [indicator, indicators, ward.id, weights]);

  const nearest = useMemo(() => {
    if (!facilities) return null;
    let min = Infinity;
    let name: string | null = null;
    let amenity: string | null = null;
    for (const f of facilities.features) {
      const [lon, lat] = f.geometry.coordinates;
      const d = haversineKm(ward.lat, ward.lon, lat, lon);
      if (d < min) {
        min = d;
        name = f.properties.name;
        amenity = f.properties.amenity ?? null;
      }
    }
    return { distanceKm: min, name, amenity };
  }, [facilities, ward]);

  const narrative =
    mode === "reporting" && score
      ? score.drivers.length > 0
        ? `This ward's assessed priority score is driven by ${score.drivers[0].toLowerCase()}.`
        : "All indicator proxies are within typical county range."
      : null;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">{ward.name}</h2>
          <p className="text-sm text-neutral-500">
            {ward.subcounty ?? "Nairobi"} &middot; {ward.county}
          </p>
        </div>
        {score && (
          <div className="text-right">
            <div className="text-2xl font-bold tracking-tight text-neutral-900">{(score.pgs * 100).toFixed(0)}</div>
            <div className="text-xs text-neutral-400">Priority Gap Score</div>
          </div>
        )}
      </div>

      {narrative && (
        <div className="mt-4 rounded-lg bg-neutral-50 p-4 text-sm leading-6 text-neutral-700 border border-neutral-100" role="note">
          <strong>What this means:</strong> {narrative}
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-4">
        {nearest && (
          <div>
            <div className="text-xs font-semibold text-neutral-500">Nearest facility</div>
            <div className="mt-1 text-sm font-medium text-neutral-800">
              {nearest.distanceKm < Infinity ? `${nearest.distanceKm.toFixed(2)} km` : "N/A"}
            </div>
            <div className="text-xs text-neutral-400">{nearest.name ?? "Unnamed"}{nearest.amenity ? ` (${nearest.amenity})` : ""}</div>
          </div>
        )}
        {indicator && (
          <div>
            <div className="text-xs font-semibold text-neutral-500">Pop. proxy</div>
            <div className="mt-1 text-sm font-medium text-neutral-800">{indicator.population.toLocaleString()}</div>
          </div>
        )}
      </div>

      {mode === "research" && score && (
        <div className="mt-4 border-t border-neutral-100 pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Score components</h3>
          <div className="mt-2 space-y-2 text-sm text-neutral-700">
            <div className="flex justify-between">
              <span>Travel time proxy</span>
              <span className="font-mono">{(score.components.travelTime * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Poverty proxy</span>
              <span className="font-mono">{(score.components.poverty * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Population pressure</span>
              <span className="font-mono">{(score.components.populationPressure * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Facility density (inverted)</span>
              <span className="font-mono">{(score.components.facilityDensity * 100).toFixed(0)}%</span>
            </div>
          </div>

          <h3 className="mt-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">Key drivers</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
            {score.drivers.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>

          <h3 className="mt-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">Completeness</h3>
          <p className="mt-1 text-sm text-neutral-600">
            {indicator ? "All indicator fields present" : "Missing indicator data"}
          </p>
        </div>
      )}

      {indicator && (
        <div className="mt-4 flex gap-2">
          <Link
            href={`/brief?ward=${ward.id}`}
            className="rounded-lg bg-neutral-900 px-3 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Generate brief
          </Link>
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify({ ward, score, indicator }, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${ward.id}-data.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="rounded-lg border border-neutral-300 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Download JSON
          </button>
        </div>
      )}
    </div>
  );
}
