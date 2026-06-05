"use client";

import { DEMO_SOURCES, type DataSources } from "@/lib/adapters";

interface SourcesPanelProps {
  sources?: DataSources;
}

function SourceList({ label, items }: { label: string; items: DataSources[keyof DataSources] }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{label}</h4>
      <ul className="mt-2 space-y-2">
        {items.map((s, i) => (
          <li key={i} className="text-xs leading-5 text-neutral-600">
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-neutral-900"
            >
              {s.name}
            </a>
            <span className="ml-1 text-neutral-400">({s.license})</span>
            {s.note && <p className="mt-0.5 text-neutral-400">{s.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SourcesPanel({ sources }: SourcesPanelProps) {
  const data = sources ?? DEMO_SOURCES;
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-neutral-800">Data sources & provenance</h3>
      <div className="mt-4 space-y-4">
        <SourceList label="Wards" items={data.wards} />
        <SourceList label="Facilities" items={data.facilities} />
        <SourceList label="Indicators" items={data.indicators} />
      </div>
      <p className="mt-4 border-t border-neutral-100 pt-3 text-xs text-neutral-400">
        Last updated: Demo data (synthetic). Replace with real sources for production use.
      </p>
    </div>
  );
}
