import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { notes } from "@/data/writing";
import { features } from "@/data/site";

export const metadata: Metadata = {
  title: "Notes — Gagan Purushotham",
  description: "Field notes and writing from the study.",
};

// Hidden until features.notes flips true in src/data/site.ts and the first
// note lands in src/data/writing.ts — then this index lights up on its own.
export default function Notes() {
  if (!features.notes || notes.length === 0) notFound();

  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
        Field Notes
      </h1>
      <p className="mt-3 text-muted max-w-lg">Writing from the study.</p>

      <div className="mt-10 flex flex-col">
        {sorted.map((note) => (
          <article key={note.slug} className="border-t border-wood-line py-6 last:border-b">
            <p className="font-mono text-xs text-muted">{note.date}</p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">
              {note.title}
            </h2>
            <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
              {note.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs text-brass">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
