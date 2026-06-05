import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      status: "ok",
      project: "Nairobi Health Equity Map",
      version: "1.0.0",
      built_at: new Date().toISOString(),
      node_version: process.version,
    }),
  };
};
