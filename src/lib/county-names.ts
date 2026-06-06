export function sanitizeCountyName(name: string): string {
  return name
    .toUpperCase()
    .replace(/['\u2019]/g, "")
    .replace(/[-/]/g, " ")
    .replace(" CITY", "")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchCountyName(a: string, b: string): boolean {
  return sanitizeCountyName(a) === sanitizeCountyName(b);
}
