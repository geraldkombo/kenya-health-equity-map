// MapLibre GL JS v6 ships ESM only, and Next.js (Turbopack or webpack) cannot
// resolve its module worker from inside node_modules: import.meta.url is rewritten
// to a build-time file:// path, so `new Worker("")` loads the page's own HTML and
// the map either hangs or throws "Worker failed to load".
// The documented fix is to serve the worker ourselves and call setWorkerUrl().
// Both files are copied because the worker may import its sibling shared chunk
// relative to its own URL, so they must sit in the same directory.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dist = join(process.cwd(), "node_modules", "maplibre-gl", "dist");
const pub = join(process.cwd(), "public");
mkdirSync(pub, { recursive: true });

let copiedWorker = false;
for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  const src = join(dist, file);
  if (!existsSync(src)) {
    if (file === "maplibre-gl-worker.mjs") {
      console.error(`copy-maplibre-worker: missing ${src}`);
      process.exit(1);
    }
    continue; // the shared chunk is empty/absent in some 6.x releases
  }
  if (statSync(src).size === 0) continue;
  copyFileSync(src, join(pub, file));
  console.log(`copy-maplibre-worker: public/${file}`);
  if (file === "maplibre-gl-worker.mjs") copiedWorker = true;
}

if (!copiedWorker) {
  console.error("copy-maplibre-worker: no worker was copied");
  process.exit(1);
}
