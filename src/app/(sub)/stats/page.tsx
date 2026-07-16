import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { skills, experience, education, certifications } from "@/data/resume";
import { projects } from "@/data/projects";
import { books } from "@/data/bookshelf";
import { journalEntries } from "@/data/journal";
import { features, site } from "@/data/site";
import CountUp from "@/components/CountUp";

export const metadata: Metadata = {
  title: "The Ledger — Gagan Purushotham",
  description: "The study, counted — every figure derived live from the site's own records.",
};

export default function Stats() {
  if (!features.stats) notFound();

  const skillCount = skills.reduce((n, g) => n + g.items.length, 0);
  const highlightCount = projects.reduce((n, p) => n + p.highlights.length, 0);
  const bulletCount = experience.reduce((n, j) => n + j.bullets.length, 0);

  const ledger = [
    { value: projects.length, label: "Projects catalogued" },
    { value: experience.length, label: "Roles held" },
    { value: skillCount, label: "Skills on record" },
    { value: bulletCount, label: "Achievements logged" },
    { value: highlightCount, label: "Project highlights" },
    { value: education.length, label: "Degrees earned" },
    { value: certifications.length, label: "Certifications" },
    { value: books.length, label: "Books on the shelf" },
    { value: journalEntries.length, label: "Journal entries written" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
        The Ledger
      </h1>
      <p className="mt-3 text-muted max-w-lg">
        The study, counted. Every figure on this page is derived live from the
        site&apos;s own records — nothing hand-tallied.
      </p>

      <dl className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-px bg-wood-line border border-wood-line">
        {ledger.map((row) => (
          <div key={row.label} className="bg-background p-6 text-center">
            <dd className="font-serif text-3xl sm:text-4xl font-bold text-brass-bright">
              <CountUp end={row.value} />
            </dd>
            <dt className="mt-2 text-xs text-muted leading-tight">{row.label}</dt>
          </div>
        ))}
      </dl>

      <p className="mt-8 font-mono text-xs text-muted">
        Ledger last balanced {site.lastPolished}.
      </p>
    </div>
  );
}
