"use client";

import { useEffect, useState } from "react";
import { UI_EVENTS } from "@/lib/ui";

export default function Toaster() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: number;
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setMessage(typeof detail === "string" ? detail : "Done");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(null), 2600);
    };
    window.addEventListener(UI_EVENTS.toast, onToast);
    return () => {
      window.removeEventListener(UI_EVENTS.toast, onToast);
      window.clearTimeout(timer);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
      <div className="toast-in flex items-center gap-2 border border-wood-line bg-panel px-4 py-2.5 text-sm text-foreground shadow-lg">
        <span className="text-brass-bright">✦</span>
        {message}
      </div>
    </div>
  );
}
