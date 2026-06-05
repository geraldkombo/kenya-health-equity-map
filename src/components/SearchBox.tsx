"use client";

import { useState, useRef, useEffect } from "react";

interface SearchBoxProps {
  wards: { id: string; name: string; subcounty: string | null }[];
  onSelect: (wardId: string) => void;
  placeholder?: string;
}

export default function SearchBox({ wards, onSelect, placeholder = "Search ward or sub-county..." }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof wards>([]);
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShow(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleChange(val: string) {
    setQuery(val);
    if (val.length < 2) {
      setResults([]);
      setShow(false);
      return;
    }
    const q = val.toLowerCase();
    const filtered = wards.filter(
      (w) => w.name.toLowerCase().includes(q) || (w.subcounty?.toLowerCase().includes(q)),
    );
    setResults(filtered);
    setShow(true);
  }

  function handleSelect(id: string) {
    setQuery("");
    setShow(false);
    onSelect(id);
  }

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search wards"
        className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
      />
      {show && results.length > 0 && (
        <ul
          className="absolute z-50 mt-1 w-full rounded-lg border border-neutral-200 bg-white shadow-lg"
          role="listbox"
        >
          {results.map((w) => (
            <li
              key={w.id}
              onClick={() => handleSelect(w.id)}
              role="option"
              aria-selected={false}
              className="cursor-pointer px-4 py-2.5 text-sm text-neutral-800 hover:bg-neutral-100"
            >
              <span className="font-medium">{w.name}</span>
              {w.subcounty && <span className="ml-2 text-neutral-400">{w.subcounty}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
