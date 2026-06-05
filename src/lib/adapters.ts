export interface WardRecord {
  id: string;
  name: string;
  lat: number;
  lon: number;
  subcounty: string | null;
  subcounty_id: string | null;
  county: string;
}

export interface IndicatorRecord {
  ward_code: string;
  population: number;
  poverty_proxy: number;
  travel_time_to_facility_proxy: number;
  facility_density_proxy: number;
  updated_at: string;
}

export interface FacilityFeature {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: { name: string | null; amenity?: string | null; type?: string; owner?: string; services?: string };
}

export interface FacilitiesGeoJSON {
  type: "FeatureCollection";
  features: FacilityFeature[];
}

export interface DataSources {
  wards: { name: string; url: string; license: string; note: string }[];
  facilities: { name: string; url: string; license: string; note: string }[];
  indicators: { name: string; url: string; license: string; note: string }[];
}

export const DEMO_SOURCES: DataSources = {
  wards: [
    { name: "Open Admin Data (Kenya)", url: "https://openadmindata.org/api/ke", license: "CC-BY-4.0", note: "Ward names and centroids. Polygons are demo geometry." },
  ],
  facilities: [
    { name: "OpenStreetMap", url: "https://www.openstreetmap.org", license: "ODbL", note: "Health facilities mapped in OSM. Coverage may be incomplete." },
  ],
  indicators: [
    { name: "Demo indicators (synthetic)", url: "#", license: "CC-BY-4.0", note: "Synthetic data for demonstration. Replace with real sources for production." },
  ],
};
