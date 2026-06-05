"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import MapView from "@/components/MapView";
import WardDetails from "@/components/WardDetails";
import SearchBox from "@/components/SearchBox";
import HowToUse from "@/components/HowToUse";
import SourcesPanel from "@/components/SourcesPanel";
import ModeToggle from "@/components/ModeToggle";
import WeightsControl from "@/components/WeightsControl";
import type { WardRecord, IndicatorRecord, FacilitiesGeoJSON } from "@/lib/adapters";
import { normalizeWard } from "@/lib/normalize";
import { computePGS, type PGSWeights, DEFAULT_WEIGHTS } from "@/lib/scoring";

export default function HomePage() {
  const [wards, setWards] = useState<WardRecord[] | null>(null);
  const [indicators, setIndicators] = useState<IndicatorRecord[]>([]);
  const [facilities, setFacilities] = useState<FacilitiesGeoJSON | null>(null);
  const [boundaries, setBoundaries] = useState<GeoJSON.FeatureCollection | null>(null);
  const [selectedWardId, setSelectedWardId] = useState<string | null>(null);
  const [mode, setMode] = useState<"reporting" | "research">("reporting");
  const [weights, setWeights] = useState<PGSWeights>(DEFAULT_WEIGHTS);
  const [error, setError] = useState<string | null>(null);
  const [dataFreshness, setDataFreshness] = useState<"live" | "snapshot" | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [wardsRes, indicatorsRes, facilitiesRes, boundariesRes] = await Promise.all([
          fetch("/api/wards").then((r) => r.json()),
          fetch("/data/indicators/ward_indicators.csv").then((r) => r.text()),
          fetch("/api/facilities").then((r) => r.json()),
          fetch("/data/boundaries/nairobi_wards.geojson").then((r) => r.json()),
        ]);
        setWards(wardsRes.wards ?? wardsRes);
        setFacilities(facilitiesRes.geojson ?? facilitiesRes);
        setBoundaries(boundariesRes);
        setDataFreshness("live");

        const lines = indicatorsRes.trim().split("\n");
        const headers = lines[0].split(",");
        const parsed: IndicatorRecord[] = lines.slice(1).map((line: string) => {
          const vals = line.split(",");
          const record: Record<string, string> = {};
          headers.forEach((h: string, i: number) => {
            record[h.trim()] = vals[i]?.trim() ?? "";
          });
          return {
            ward_code: record.ward_code,
            population: Number(record.population),
            poverty_proxy: Number(record.poverty_proxy),
            travel_time_to_facility_proxy: Number(record.travel_time_to_facility_proxy),
            facility_density_proxy: Number(record.facility_density_proxy),
            updated_at: record.updated_at,
          };
        });
        setIndicators(parsed);
      } catch (e: any) {
        try {
          const snapWards = await fetch("/data/snapshots/wards.json").then((r) => r.json());
          const snapFacilities = await fetch("/data/snapshots/facilities.json").then((r) => r.json());
          const boundariesRes = await fetch("/data/boundaries/nairobi_wards.geojson").then((r) => r.json());
          setWards(snapWards.wards);
          setFacilities(snapFacilities);
          setBoundaries(boundariesRes);
          setDataFreshness("snapshot");
        } catch {
          setError(e?.message ?? "Failed to load data.");
        }
      }
    }
    load();
  }, []);

  const selectedWard = useMemo(() => {
    if (!wards || !selectedWardId) return null;
    return wards.find((w) => w.id === selectedWardId) ?? null;
  }, [wards, selectedWardId]);

  const wardScores = useMemo(() => {
    if (!wards || indicators.length === 0) return {};
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

    const scores: Record<string, number> = {};
    for (const ward of wards) {
      const ind = indicators.find((i) => i.ward_code === ward.id);
      if (ind) {
        const norm = normalizeWard(ind, countyStats);
        scores[ward.id] = computePGS(ward.id, norm, weights).pgs;
      }
    }
    return scores;
  }, [wards, indicators, weights]);

  const handleSearchSelect = useCallback((wardId: string) => {
    setSelectedWardId(wardId);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {dataFreshness === "snapshot" && (
        <div className="mb-4 rounded-lg bg-warm-50 border border-warm-200 px-4 py-3 text-sm text-warm-800" role="alert">
          Using cached snapshot data. Live API endpoints were unavailable.
        </div>
      )}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-neutral-900">Nairobi Health Equity Map</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Explore health access inequities across Nairobi wards
          </p>
        </div>
        <div className="flex items-center gap-3">
          {wards && (
            <SearchBox wards={wards} onSelect={handleSearchSelect} />
          )}
          <ModeToggle mode={mode} onToggle={setMode} />
        </div>
      </div>

      <div className="mb-6">
        <HowToUse />
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {boundaries && facilities ? (
            <MapView
              boundaries={boundaries}
              facilityPoints={facilities as unknown as GeoJSON.FeatureCollection}
              wardScores={wardScores}
              onWardClick={handleSearchSelect}
              selectedWardId={selectedWardId}
            />
          ) : (
            <div className="flex h-[400px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-500">
              Loading map data...
            </div>
          )}
        </div>

        <div className="space-y-4">
          {mode === "research" && (
            <WeightsControl weights={weights} onChange={setWeights} />
          )}
          {selectedWard ? (
            <WardDetails
              ward={selectedWard}
              indicators={indicators}
              facilities={facilities}
              weights={weights}
              mode={mode}
            />
          ) : (
            <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-400">
              Click a ward on the map or search to see details.
            </div>
          )}
          <SourcesPanel />
        </div>
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-6">
        <div className="flex flex-wrap gap-3">
          <a
            href="/data/indicators/ward_indicators.csv"
            download
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Download spreadsheet (CSV)
          </a>
          <a
            href="/data/boundaries/nairobi_wards.geojson"
            download
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Download map data (GeoJSON)
          </a>
          <a
            href="/data/facilities/facilities.geojson"
            download
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Download facilities (GeoJSON)
          </a>
        </div>
      </div>
    </div>
  );
}
