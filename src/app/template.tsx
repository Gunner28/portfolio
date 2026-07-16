"use client";

// Re-mounts on every route change — gives each page a soft candle-lit fade-in.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
