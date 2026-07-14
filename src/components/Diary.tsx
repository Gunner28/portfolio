"use client";

import { useEffect, useState } from "react";

// The journal reveals itself only after the reader has lingered long enough.
// For now it holds a placeholder entry; future content gets slotted into ENTRIES.
const UNLOCK_SECONDS = 600; // 10 minutes on the site
const SECONDS_KEY = "gp-diary-seconds";
const UNLOCKED_KEY = "gp-diary-unlocked";

const ENTRIES = [
  {
    date: "Entry the First",
    body: [
      "If you are reading this, you stayed a while — long enough for the lamp to find you.",
      "This page is a work in progress, the way a study is never quite finished. More will be written here in time: notes from projects, things learned, doors that open only to the patient.",
      "Consider this the first of them. Come back later — it grows.",
    ],
  },
];

export default function Diary() {
  const [unlocked, setUnlocked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(UNLOCKED_KEY) === "1") {
      setUnlocked(true);
      return;
    }

    // Local demo/testing override — production still requires the full 10 minutes.
    if (
      location.hostname === "localhost" &&
      new URLSearchParams(location.search).has("diary")
    ) {
      localStorage.setItem(UNLOCKED_KEY, "1");
      setUnlocked(true);
      return;
    }

    let secs = Number(localStorage.getItem(SECONDS_KEY) || "0");
    const id = window.setInterval(() => {
      secs += 1;
      localStorage.setItem(SECONDS_KEY, String(secs));
      if (secs >= UNLOCK_SECONDS) {
        localStorage.setItem(UNLOCKED_KEY, "1");
        setUnlocked(true);
        window.clearInterval(id);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!unlocked) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open the hidden journal"
        title="A journal has appeared…"
        className="diary-appear ember-pulse fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-brass/60 bg-panel text-brass-bright hover:text-foreground hover:border-brass transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5z" />
          <path d="M4 4.5A2.5 2.5 0 0 0 6.5 7H20" />
          <path d="M9 12h7M9 15.5h5" />
        </svg>
      </button>

      {open && (
        <div
          className="fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="modal-in parchment relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-sm p-8 sm:p-10 shadow-2xl"
            style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.6)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close journal"
              className="absolute top-4 right-4 text-[#5a4326] hover:text-[#3a2a16] transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <p className="font-mono text-[11px] tracking-widest uppercase text-[#7a5c33]">
              The Journal
            </p>
            <h2 className="font-serif text-3xl font-bold mt-1 text-[#2c1f10]">
              Unlocked
            </h2>
            <div className="mt-6 h-px bg-[#c2ab7f]" />

            {ENTRIES.map((entry) => (
              <div key={entry.date} className="mt-6">
                <h3 className="font-serif text-lg italic text-[#4a3822]">{entry.date}</h3>
                <div className="mt-3 flex flex-col gap-3">
                  {entry.body.map((p, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-[#3a2a16]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
