"use client";

import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShow(false);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }

    // Show manual prompt after 10 seconds for all browsers
    const timer = setTimeout(() => setShow(true), 10000);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") setShow(false);
      setDeferredPrompt(null);
    } else {
      setShowHelp(true);
    }
  };

  const isSafari = typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);

  if (!show) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 md:bottom-4 md:right-4 md:left-auto z-50 flex items-center gap-3 bg-white border-t md:border border-stone-200 md:rounded-xl shadow-lg p-3 md:p-4 print:hidden">
        <div className="w-10 h-10 rounded-lg bg-[#78350F] flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6" viewBox="0 0 512 512" fill="none">
            <circle cx="256" cy="240" r="130" fill="#FDFBF7"/>
            <rect x="228" y="202" width="56" height="16" rx="4" fill="#EA580C"/>
            <rect x="246" y="184" width="20" height="52" rx="4" fill="#EA580C"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-stone-900 leading-tight">Install App</p>
          <p className="text-xs text-stone-500 leading-tight mt-0.5">Use offline, no data needed</p>
        </div>
        <button
          onClick={handleInstall}
          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg bg-[#EA580C] px-4 py-2 text-sm font-bold text-white hover:bg-[#C2410C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] active:scale-[0.98]"
        >
          Install
        </button>
      </div>

      {showHelp && (isSafari || isIOS) && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4 print:hidden" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-stone-900 mb-2">Install on iPhone / iPad</h3>
            <ol className="text-sm text-stone-700 space-y-2 list-decimal pl-5">
              <li>Tap the <strong>Share</strong> button <span className="inline-block w-5 h-5 bg-stone-200 rounded text-center text-xs leading-5">↑</span> at the bottom of the screen</li>
              <li>Scroll down and tap <strong>Add to Home Screen</strong></li>
              <li>Tap <strong>Add</strong> in the top right corner</li>
            </ol>
            <p className="text-xs text-stone-500 mt-4">The app will appear on your home screen and work without internet.</p>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-4 w-full min-h-[44px] rounded-lg bg-[#EA580C] text-sm font-bold text-white hover:bg-[#C2410C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {showHelp && !isSafari && !isIOS && deferredPrompt === null && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4 print:hidden" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-stone-900 mb-2">Install on your device</h3>
            <p className="text-sm text-stone-700">Open this page in <strong>Chrome</strong> or <strong>Samsung Internet</strong>, then use the browser menu (<strong>⋮</strong>) and select <strong>Add to Home Screen</strong> or <strong>Install App</strong>.</p>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-4 w-full min-h-[44px] rounded-lg bg-[#EA580C] text-sm font-bold text-white hover:bg-[#C2410C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
