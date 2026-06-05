"use client";

import { useState } from "react";

export default function HowToUse() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-neutral-200 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-3 text-left text-sm font-semibold text-neutral-800"
        aria-expanded={open}
        aria-controls="how-to-use-content"
      >
        How to use this map
        <span className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>
      {open && (
        <div id="how-to-use-content" className="border-t border-neutral-100 px-5 py-4 text-sm leading-6 text-neutral-600">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Hover</strong> over a ward to see its name and Priority Gap Score.
            </li>
            <li>
              <strong>Click</strong> a ward to open its details panel with key facts, drivers, and data provenance.
            </li>
            <li>
              Use the <strong>Compare</strong> page to place two wards side by side.
            </li>
            <li>
              Use the <strong>Brief</strong> button on a selected ward to generate a printable one-page summary.
            </li>
            <li>
              Under <strong>Research mode</strong>, adjust PGS weights to explore sensitivity.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
