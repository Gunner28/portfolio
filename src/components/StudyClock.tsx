"use client";

import { useEffect, useState } from "react";

// The study keeps Melbourne hours.
export default function StudyClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Australia/Melbourne",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="font-mono text-[11px] text-muted" title="The study keeps Melbourne hours">
      MEL {time}
    </span>
  );
}
