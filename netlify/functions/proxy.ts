import type { Handler, HandlerEvent } from "@netlify/functions";

export const handler: Handler = async (event: HandlerEvent) => {
  const target = event.queryStringParameters?.url;
  if (!target) {
    return {
      statusCode: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Missing ?url parameter" }),
    };
  }

  try {
    const res = await fetch(target, {
      headers: { "user-agent": "nairobi-health-equity-map/1.0" },
    });
    const data = await res.json();
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=3600, s-maxage=86400",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Upstream fetch failed", message: String(err) }),
    };
  }
};
