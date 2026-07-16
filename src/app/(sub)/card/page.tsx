import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { profile } from "@/data/resume";
import { projects } from "@/data/projects";
import { features } from "@/data/site";

export const metadata: Metadata = {
  title: "Library Card — Gagan Purushotham",
  description: "The reader's card for this study — member since MMXXVI.",
};

export default function LibraryCard() {
  if (!features.card) notFound();

  const sorted = [...projects].sort((a, b) => b.year.localeCompare(a.year));

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
        Library Card
      </h1>
      <p className="mt-3 text-muted max-w-lg">
        Every study keeps a record of its reader.
      </p>

      {/* The card itself — parchment, stamped, slightly worn */}
      <div className="parchment mt-10 max-w-xl p-8 sm:p-10 shadow-2xl rotate-[-0.5deg]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#7a5c33]">
              The Study of
            </p>
            <p className="font-serif text-2xl font-bold text-[#2c1f10]">{profile.name}</p>
          </div>
          <div className="border-2 border-[#7a5c33] px-3 py-1.5 rotate-[4deg]">
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#7a5c33]">
              Member since
            </p>
            <p className="font-serif text-lg font-bold text-[#4a3822] text-center">MMXXVI</p>
          </div>
        </div>

        <div className="mt-6 h-px bg-[#c2ab7f]" />

        <div className="mt-4 grid grid-cols-2 gap-4 font-mono text-[11px] text-[#4a3822]">
          <div>
            <p className="uppercase tracking-widest text-[#7a5c33]">Reader class</p>
            <p className="mt-1">Data Scientist · AI Engineer</p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-[#7a5c33]">Home branch</p>
            <p className="mt-1">Melbourne, Australia</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7a5c33] mb-2">
            Borrowing record
          </p>
          <table className="w-full text-left">
            <thead>
              <tr className="font-mono text-[10px] uppercase tracking-widest text-[#7a5c33]">
                <th className="py-1.5 pr-4 font-normal border-b border-[#c2ab7f]">Vol.</th>
                <th className="py-1.5 pr-4 font-normal border-b border-[#c2ab7f]">Title</th>
                <th className="py-1.5 font-normal border-b border-[#c2ab7f] text-right">Stamped</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => (
                <tr key={p.slug}>
                  <td className="py-2 pr-4 font-mono text-[11px] text-[#7a5c33] border-b border-[#d8c9a3] align-top">
                    {String(sorted.length - i).padStart(2, "0")}
                  </td>
                  <td className="py-2 pr-4 text-sm text-[#2c1f10] border-b border-[#d8c9a3]">
                    {p.name}
                  </td>
                  <td className="py-2 font-mono text-[11px] text-[#4a3822] border-b border-[#d8c9a3] text-right align-top">
                    {p.year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <p className="font-mono text-[10px] text-[#7a5c33]">
            Fines owed: none — everything returned improved.
          </p>
          <p className="font-serif italic text-lg text-[#4a3822] -rotate-2">G. Purushotham</p>
        </div>
      </div>

      <p className="mt-8 font-mono text-xs text-muted">
        The borrowing record grows with the catalogue — new projects stamp themselves in.
      </p>
    </div>
  );
}
