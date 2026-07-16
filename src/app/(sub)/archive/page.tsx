import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { features } from "@/data/site";

export const metadata: Metadata = {
  title: "Archive — Gagan Purushotham",
  description: "A complete index of projects, catalogued like the shelves they came from.",
};

export default function Archive() {
  if (!features.archive) notFound();

  const sorted = [...projects].sort((a, b) => b.year.localeCompare(a.year));

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
        The Catalogue
      </h1>
      <p className="mt-3 text-muted max-w-lg">
        Every project on record — the full index behind the featured shelf.
      </p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="font-mono text-xs uppercase tracking-widest text-brass">
              <th className="py-3 pr-6 font-normal border-b border-wood-line">Year</th>
              <th className="py-3 pr-6 font-normal border-b border-wood-line">Project</th>
              <th className="py-3 pr-6 font-normal border-b border-wood-line hidden sm:table-cell">
                Built with
              </th>
              <th className="py-3 font-normal border-b border-wood-line">Links</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr key={p.slug} className="group align-top">
                <td className="py-4 pr-6 font-mono text-xs text-muted border-b border-wood-line">
                  {p.year}
                </td>
                <td className="py-4 pr-6 border-b border-wood-line">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-sm font-medium text-foreground hover:text-brass-bright transition-colors"
                  >
                    {p.name}
                  </Link>
                </td>
                <td className="py-4 pr-6 border-b border-wood-line hidden sm:table-cell">
                  <span className="font-mono text-xs text-muted">
                    {p.stack.join(" · ")}
                  </span>
                </td>
                <td className="py-4 border-b border-wood-line">
                  <div className="flex gap-3 font-mono text-xs">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="text-brass hover:text-brass-bright transition-colors"
                    >
                      Detail
                    </Link>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brass hover:text-brass-bright transition-colors"
                      >
                        Code ↗
                      </a>
                    )}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brass hover:text-brass-bright transition-colors"
                      >
                        Live ↗
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
