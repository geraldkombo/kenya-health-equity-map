import fs from "fs";
import path from "path";
import type { WardRecord, IndicatorRecord, FacilitiesGeoJSON } from "@/lib/adapters";

const DATA_DIR = path.join(process.cwd(), "data");

export function loadWards(): WardRecord[] {
  const raw = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "snapshots", "wards.json"), "utf-8"));
  return raw.wards as WardRecord[];
}

export function loadFacilities(): FacilitiesGeoJSON {
  const raw = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "snapshots", "facilities.json"), "utf-8"));
  return raw as FacilitiesGeoJSON;
}

export function loadIndicators(): IndicatorRecord[] {
  const csv = fs.readFileSync(path.join(DATA_DIR, "indicators", "ward_indicators.csv"), "utf-8");
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const vals = line.split(",");
    const record: Record<string, string> = {};
    headers.forEach((h, i) => {
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
}

export function loadBoundariesGeoJSON() {
  const raw = fs.readFileSync(path.join(DATA_DIR, "boundaries", "nairobi_wards.geojson"), "utf-8");
  return JSON.parse(raw);
}
