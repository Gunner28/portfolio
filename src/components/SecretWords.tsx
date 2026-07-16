"use client";

import { useEffect } from "react";
import { UI_EVENTS, emit, toast } from "@/lib/ui";

// Certain words, typed anywhere on the site, do things.
//   tardis — the journal is bigger on the inside; unlocks and opens it
//   lamp   — toggles the lights
const WORDS: Record<string, () => void> = {
  tardis: () => {
    emit(UI_EVENTS.unlockDiary);
    toast("The journal shudders — it's bigger on the inside.");
  },
  lamp: () => {
    emit(UI_EVENTS.toggleTheme);
    toast("The lamp answers.");
  },
};

const MAX_LEN = Math.max(...Object.keys(WORDS).map((w) => w.length));

export default function SecretWords() {
  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      // Ignore typing inside inputs (command palette search, future forms)
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-MAX_LEN);
      for (const word of Object.keys(WORDS)) {
        if (buffer.endsWith(word)) {
          buffer = "";
          WORDS[word]();
          break;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
