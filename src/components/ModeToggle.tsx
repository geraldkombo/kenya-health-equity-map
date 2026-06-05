"use client";

interface ModeToggleProps {
  mode: "reporting" | "research";
  onToggle: (mode: "reporting" | "research") => void;
}

export default function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-neutral-300 bg-neutral-50 p-0.5" role="radiogroup" aria-label="Display mode">
      <button
        onClick={() => onToggle("reporting")}
        role="radio"
        aria-checked={mode === "reporting"}
        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          mode === "reporting"
            ? "bg-white text-neutral-900 shadow-sm"
            : "text-neutral-500 hover:text-neutral-800"
        }`}
      >
        Reporting
      </button>
      <button
        onClick={() => onToggle("research")}
        role="radio"
        aria-checked={mode === "research"}
        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          mode === "research"
            ? "bg-white text-neutral-900 shadow-sm"
            : "text-neutral-500 hover:text-neutral-800"
        }`}
      >
        Research
      </button>
    </div>
  );
}
