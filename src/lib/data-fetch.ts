import type { CountyRecord, IndicatorRecord, FacilitiesGeoJSON } from "@/lib/adapters";

export async function fetchCounties(): Promise<{ counties: CountyRecord[]; source: "live" | "snapshot" }> {
  try {
    const res = await fetch("/api/wards");
    const data = await res.json();
    return { counties: data.counties ?? data, source: "live" };
  } catch {
    const snap = await fetch("/data/snapshots/counties.json").then((r) => r.json());
    return { counties: snap, source: "snapshot" };
  }
}

function cleanFacilities(raw: any): FacilitiesGeoJSON {
  const fc = raw.geojson ?? raw;
  if (!fc || !fc.features) return fc;
  return { ...fc, features: fc.features.filter((f: any) => f?.geometry?.type === "Point") };
}

export async function fetchFacilities(): Promise<{ geojson: FacilitiesGeoJSON; source: "live" | "snapshot" }> {
  try {
    const res = await fetch("/api/facilities");
    const data = await res.json();
    return { geojson: cleanFacilities(data), source: "live" };
  } catch {
    const snap = await fetch("/data/snapshots/facilities.json").then((r) => r.json());
    return { geojson: cleanFacilities(snap), source: "snapshot" };
  }
}

function parseIndicator(record: any): IndicatorRecord {
  return {
    county_code: String(record.county_code),
    county_name: String(record.county_name ?? ""),
    population: Number(record.population),
    poverty_proxy: Number(record.poverty_proxy),
    facility_count: Number(record.facility_count),
    facility_density_proxy: Number(record.facility_density_proxy),
    travel_time_to_facility_proxy: Number(record.travel_time_to_facility_proxy),
    immunization_coverage: Number(record.immunization_coverage ?? 0),
    skilled_birth_attendance: Number(record.skilled_birth_attendance ?? 0),
    updated_at: String(record.updated_at ?? ""),
  };
}

export async function fetchIndicators(): Promise<IndicatorRecord[]> {
  try {
    const res = await fetch("/api/indicators");
    if (!res.ok) throw new Error(`Indicators API error: ${res.status}`);
    const data = await res.json();
    return data.map(parseIndicator);
  } catch {
    const snap = await fetch("/data/snapshots/indicator_records.json").then((r) => r.json());
    return snap.map(parseIndicator);
  }
}
