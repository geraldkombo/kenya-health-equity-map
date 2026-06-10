"use client";

import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === "accepted") setDeferredPrompt(null);
  };

  if (!deferredPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 bg-white border-t border-stone-200 shadow-lg p-3 print:hidden">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-stone-900">Install for offline use</p>
      </div>
      <button
        onClick={handleInstall}
        className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg bg-[#EA580C] px-4 py-2 text-sm font-bold text-white hover:bg-[#C2410C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] active:scale-[0.98]"
      >
        Install
      </button>
    </div>
  );
}
