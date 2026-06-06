export interface NormalizedIndicators {
  travelTime: number;
  poverty: number;
  populationPressure: number;
  facilityDensity: number;
}

const ABSOLUTE_MAX: Record<string, number> = {
  travel_time_to_facility_proxy: 100,
  poverty_proxy: 100,
  population: 5_000_000,
  facility_density_proxy: 1,
};

export function normalizeCounty(
  raw: {
    travel_time_to_facility_proxy: number;
    poverty_proxy: number;
    population: number;
    facility_density_proxy: number;
  },
): NormalizedIndicators {
  const clamp = (v: number, max: number) => Math.max(0, Math.min(1, v / max));

  return {
    travelTime: clamp(raw.travel_time_to_facility_proxy, ABSOLUTE_MAX.travel_time_to_facility_proxy),
    poverty: clamp(raw.poverty_proxy, ABSOLUTE_MAX.poverty_proxy),
    populationPressure: clamp(raw.population, ABSOLUTE_MAX.population),
    facilityDensity: 1 - clamp(raw.facility_density_proxy, ABSOLUTE_MAX.facility_density_proxy),
  };
}
