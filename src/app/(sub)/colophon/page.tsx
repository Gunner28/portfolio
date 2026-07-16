import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { features, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Colophon — Gagan Purushotham",
  description: "How this study was built — stack, type, palette, and hidden machinery.",
};

const stack = [
  { name: "Next.js 16", detail: "App Router, fully static output" },
  { name: "TypeScript", detail: "Every shelf typed" },
  { name: "Tailwind CSS 4", detail: "Utility joinery" },
  { name: "Vercel", detail: "Hosting & analytics" },
];

const type = [
  { name: "Playfair Display", detail: "The nameplates — serif headings" },
  { name: "Geist Sans", detail: "The reading text" },
  { name: "Geist Mono", detail: "Labels, ledgers, and small print" },
];

const palette = [
  { token: "--background", hex: "#17110a", name: "Walnut" },
  { token: "--card", hex: "#241a10", name: "Old leather" },
  { token: "--wood-line", hex: "#3a2a18", name: "Shelf edge" },
  { token: "--foreground", hex: "#ece0cb", name: "Parchment" },
  { token: "--muted", hex: "#a5907a", name: "Faded ink" },
  { token: "--brass", hex: "#c99a4b", name: "Brass" },
  { token: "--brass-bright", hex: "#e0b768", name: "Polished brass" },
  { token: "--ember", hex: "#9c4530", name: "Ember" },
];

const machinery = [
  "A reading lamp that follows your cursor (dark hours only).",
  "A command palette behind ⌘K, reachable from every room.",
  "A day/night switch — lamplight or daylight, remembered between visits.",
  "A fireplace that crackles on request, synthesized from noise — no recording.",
  "A journal that only unlocks for readers who stay ten minutes.",
  "Certain words, typed anywhere, do things. The journal answers to a blue police box.",
];

export default function Colophon() {
  if (!features.colophon) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
        Colophon
      </h1>
      <p className="mt-3 text-muted max-w-lg">
        How this study was built — timber, type, pigment, and the hidden machinery.
      </p>

      <section className="mt-10">
        <h2 className="font-mono text-xs text-brass tracking-widest uppercase mb-4">Timber</h2>
        <div className="flex flex-col">
          {stack.map((s) => (
            <div key={s.name} className="border-t border-wood-line py-3 last:border-b flex items-baseline justify-between gap-4">
              <span className="text-base font-medium text-foreground">{s.name}</span>
              <span className="text-sm text-muted text-right">{s.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-mono text-xs text-brass tracking-widest uppercase mb-4">Type</h2>
        <div className="flex flex-col">
          {type.map((t) => (
            <div key={t.name} className="border-t border-wood-line py-3 last:border-b flex items-baseline justify-between gap-4">
              <span className="text-base font-medium text-foreground">{t.name}</span>
              <span className="text-sm text-muted text-right">{t.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-mono text-xs text-brass tracking-widest uppercase mb-4">Pigment</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-wood-line border border-wood-line">
          {palette.map((c) => (
            <div key={c.token} className="bg-background p-4">
              <div
                className="h-12 w-full border border-wood-line"
                style={{ backgroundColor: c.hex }}
              />
              <p className="mt-2 text-sm font-medium text-foreground">{c.name}</p>
              <p className="font-mono text-[10px] text-muted">{c.hex}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-mono text-xs text-brass tracking-widest uppercase mb-4">
          Hidden machinery
        </h2>
        <ul className="flex flex-col gap-3">
          {machinery.map((m, i) => (
            <li
              key={i}
              className="text-sm text-foreground/80 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-brass"
            >
              {m}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 font-mono text-xs text-muted">
        Set in Melbourne. Last polished {site.lastPolished}.
      </p>
    </div>
  );
}
