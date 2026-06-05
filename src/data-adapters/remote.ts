export async function fetchRemoteWards(): Promise<Response> {
  return fetch("https://openadmindata.org/api/v1/ke/county/nairobi-ke047.json", {
    headers: { "user-agent": "nairobi-health-equity-map/1.0" },
  });
}

export async function fetchRemoteFacilities(): Promise<Response> {
  const overpassQuery = `[out:json];area[name="Nairobi"]->.a;node(area.a)[amenity~"^(hospital|clinic|health_centre)$"];out center;`;
  return fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ data: overpassQuery }),
  });
}
