/**
 * build-snapshots.ts
 *
 * Reads aggregated county data and writes the final JSON snapshots
 * that the frontend consumes from /data/snapshots/.
 *
 * Usage: npx tsx scripts/etl/build-snapshots.ts
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import type { IndicatorRecord, CountyRecord } from "../../src/lib/adapters";

const RAW_DIR = join(import.meta.dirname, "../../data/raw");
const SNAPSHOTS_DIR = join(import.meta.dirname, "../../data/snapshots");
const BOUNDARIES_DIR = join(import.meta.dirname, "../../data/boundaries");
const FACILITIES_DIR = join(import.meta.dirname, "../../data/facilities");

function ensureDir(path: string) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function loadJSON<T>(path: string): T | null {
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as T;
  } catch {
    return null;
  }
}

function loadCSV(path: string): Record<string, string>[] {
  try {
    const text = readFileSync(path, "utf-8").trim();
    const [header, ...rows] = text.split("\n");
    if (!header) return [];
    const cols = header.split(",");
    return rows.map((row) => {
      const vals = row.split(",");
      const obj: Record<string, string> = {};
      cols.forEach((c, i) => { obj[c.trim()] = vals[i]?.trim() ?? ""; });
      return obj;
    });
  } catch {
    return [];
  }
}

async function main() {
  ensureDir(SNAPSHOTS_DIR);

  // ── Counties ──────────────────────────────────────────────
  const boundariesRaw = loadJSON<{ features: { properties: { county_code: number; county_name: string } }[] }>(
    join(BOUNDARIES_DIR, "counties.geojson"),
  );
  const counties: CountyRecord[] =
    boundariesRaw?.features.map((f) => ({
      id: String(f.properties.county_code),
      name: f.properties.county_name,
    })) ?? [];

  if (counties.length === 0) {
    console.error("No counties found in boundaries GeoJSON.");
    process.exit(1);
  }
  writeFileSync(join(SNAPSHOTS_DIR, "counties.json"), JSON.stringify(counties, null, 2));
  console.log(`✓ counties.json — ${counties.length} counties`);

  // ── County indicators ─────────────────────────────────────
  const csvData = loadCSV(join(RAW_DIR, "county_indicators.csv"));
  const indicators: IndicatorRecord[] = csvData.map((row) => ({
    county_code: row.county_code ?? "",
    county_name: row.county_name ?? "",
    population: Number(row.population) || 0,
    poverty_proxy: Number(row.poverty_proxy) || 0,
    facility_count: Number(row.facility_count) || 0,
    facility_density_proxy: Number(row.facility_density_proxy) || 0,
    travel_time_to_facility_proxy: Number(row.travel_time_to_facility_proxy) || 0,
    immunization_coverage: Number(row.immunization_coverage) || 0,
    skilled_birth_attendance: Number(row.skilled_birth_attendance) || 0,
    updated_at: row.updated_at ?? new Date().toISOString().slice(0, 10),
  }));
  writeFileSync(join(SNAPSHOTS_DIR, "county_indicators.json"), JSON.stringify(indicators, null, 2));
  console.log(`✓ county_indicators.json — ${indicators.length} counties`);

  // ── Facilities ────────────────────────────────────────────
  const facilitiesRaw = loadJSON<{ type: string; features: unknown[] }>(
    join(FACILITIES_DIR, "facilities.geojson"),
  );
  if (facilitiesRaw) {
    writeFileSync(join(SNAPSHOTS_DIR, "facilities.json"), JSON.stringify(facilitiesRaw, null, 2));
    console.log(`✓ facilities.json — ${facilitiesRaw.features.length} features`);
  } else {
    console.warn("⚠ No facilities.geojson found — skipping");
  }

  console.log("\nAll snapshots built successfully.");
}

main().catch(console.error);
