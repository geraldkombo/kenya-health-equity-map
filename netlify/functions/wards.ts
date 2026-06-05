import type { Handler } from "@netlify/functions";
import { loadWards } from "../../src/data-adapters/demo";

export const handler: Handler = async () => {
  try {
    const wards = loadWards();
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
      body: JSON.stringify({
        meta: {
          county: "Nairobi",
          level: "ward",
          fetched_at: new Date().toISOString(),
          sources: [
            {
              name: "Open Admin Data (Kenya administrative divisions)",
              url: "https://openadmindata.org/api/ke",
              license: "CC-BY-4.0",
              note: "Ward names and centroids. Polygons from demo data.",
            },
          ],
        },
        wards,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Failed to fetch wards", message: String(err) }),
    };
  }
};
