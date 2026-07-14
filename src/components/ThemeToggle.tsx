"use client";

import { useEffect, useState } from "react";
import { UI_EVENTS } from "@/lib/ui";

type Theme = "dark" | "light";

function getInitial(): Theme {
  if (typeof document === "undefined") return "dark";
  return (document.documentElement.dataset.theme as Theme) || "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(getInitial());
    const toggle = () => {
      setTheme((prev) => {
        const next: Theme = prev === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("gp-theme", next);
        } catch {}
        return next;
      });
    };
    window.addEventListener(UI_EVENTS.toggleTheme, toggle);
    return () => window.removeEventListener(UI_EVENTS.toggleTheme, toggle);
  }, []);

  const flip = () => window.dispatchEvent(new CustomEvent(UI_EVENTS.toggleTheme));

  return (
    <button
      type="button"
      onClick={flip}
      aria-label={theme === "dark" ? "Turn on daylight" : "Dim the lamps"}
      title={theme === "dark" ? "Daylight" : "Lamplight"}
      className="text-muted hover:text-brass-bright transition-colors"
    >
      {theme === "dark" ? (
        // sun — daylight is available
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // moon — return to lamplight
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
