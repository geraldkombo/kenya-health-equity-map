import type { Handler } from "@netlify/functions";

const BASE_URL = process.env.SITE_URL || "https://uhcke.netlify.app";

export const handler: Handler = async () => {
  try {
    const res = await fetch(`${BASE_URL}/data/snapshots/indicator_records.json`);
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=86400" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, headers: { "content-type": "application/json; charset=utf-8" }, body: JSON.stringify({ error: "Failed to fetch indicators", message: String(err) }) };
  }
};
