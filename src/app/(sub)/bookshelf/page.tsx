import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { books, type BookStatus } from "@/data/bookshelf";
import { features } from "@/data/site";

export const metadata: Metadata = {
  title: "Bookshelf — Gagan Purushotham",
  description: "The study's reading shelf — currently open, finished, and queued.",
};

const shelves: { status: BookStatus; label: string }[] = [
  { status: "reading", label: "Currently open" },
  { status: "read", label: "Finished" },
  { status: "queued", label: "Waiting on the shelf" },
];

export default function Bookshelf() {
  if (!features.bookshelf) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
        The Bookshelf
      </h1>
      <p className="mt-3 text-muted max-w-lg">
        What&apos;s being read in this study — with the occasional margin note.
      </p>

      <div className="mt-10 flex flex-col gap-12">
        {shelves.map(({ status, label }) => {
          const shelf = books.filter((b) => b.status === status);
          if (shelf.length === 0) return null;
          return (
            <section key={status}>
              <h2 className="font-mono text-xs text-brass tracking-widest uppercase mb-4">
                {label}
              </h2>
              <div className="flex flex-col">
                {shelf.map((book) => (
                  <div
                    key={book.title}
                    className="border-t border-wood-line py-4 last:border-b"
                  >
                    <p className="font-serif text-lg font-semibold text-foreground">
                      {book.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{book.author}</p>
                    {book.note && (
                      <p className="mt-2 text-sm italic text-foreground/70">
                        “{book.note}”
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
