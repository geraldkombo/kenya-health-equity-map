import Link from "next/link";
import countiesData from "@/../data/snapshots/counties.json";

export const metadata = {
  title: "Forum Exhibition | Kenya Health Equity Map",
  description:
    "Quick access to county evidence briefs for the 3rd CSS Knowledge Dissemination Forum at Lake Naivasha.",
};

const SITE = "https://geraldkombo.github.io/kenya-health-equity-map";

export default function ForumPage() {
  const counties = (countiesData as { id: string; name: string }[]).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div className="min-h-screen bg-white text-stone-900">
      {/* Booth header */}
      <div className="bg-amber-900 text-white print:bg-black">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400">
            3rd CSS Knowledge Dissemination Forum &middot; Lake Naivasha
          </p>
          <h1 className="mt-2 text-3xl font-serif font-extrabold">
            Kenya Health Equity Map
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-stone-300">
            An offline-first digital public good for Community-Led Monitoring.
            Select a county below to generate a printable evidence brief you can
            take directly to your CHMT or budget hearing.
          </p>
        </div>
      </div>

      {/* QR + instructions */}
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start print:hidden">
          <div className="flex-shrink-0 rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
            {/* Google Charts QR (no API key needed, stable) */}
            <img
              src={`https://chart.googleapis.com/chart?cht=qr&chs=160x160&chl=${encodeURIComponent(SITE)}&choe=UTF-8`}
              alt="QR code"
              width="160"
              height="160"
              className="h-40 w-40"
            />
          </div>
          <div className="text-sm text-stone-600">
            <p className="font-semibold text-amber-900">Try it on your phone:</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Scan the QR code with your phone camera</li>
              <li>Pick any county to view its health equity data</li>
              <li>Tap &ldquo;Download PDF&rdquo; to save the evidence brief</li>
              <li>The tool works offline once loaded &mdash; no app store, no login required</li>
            </ol>
          </div>
        </div>

        {/* County grid */}
        <div className="mt-8">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-amber-900">
            All 47 counties - tap to open its brief
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {counties.map((c) => (
              <Link
                key={c.id}
                href={`/brief?county=${c.id}`}
                className="rounded-md border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-amber-900 hover:bg-amber-50 hover:text-amber-900"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* print-only footer for handout */}
      <div className="hidden print:block mx-auto max-w-5xl px-6 pb-4 text-[10px] text-stone-500">
        <p className="font-bold text-amber-900">Kenya Health Equity Map</p>
        <p>
          Visit <span className="underline">{SITE}</span> on any device. Scan
          the QR code at the booth to access all 47 county briefs. The tool is
          fully offline-capable and requires no installation.
        </p>
        <p className="mt-1">Data: KNBS 2019 Census &middot; KIHBS 2015/16 &middot; OpenStreetMap/ICPAC</p>
      </div>

      {/* screen footer */}
      <div className="border-t border-stone-200 py-4 text-center text-[10px] text-stone-400 print:hidden">
        <span className="font-semibold text-amber-900">Kenya Health Equity Map</span>
        &nbsp;&middot;&nbsp;
        <a href={SITE} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-stone-600">
          {SITE}
        </a>
        &nbsp;&middot;&nbsp;CC-BY-4.0 open data
      </div>
    </div>
  );
}
