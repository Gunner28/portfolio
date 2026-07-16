import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, type ProjectStatus } from "@/data/projects";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Gagan Purushotham`,
    description: project.blurb,
  };
}

const statusLabel: Record<ProjectStatus, string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <article>
      <p className="font-mono text-xs text-brass tracking-widest uppercase">
        {project.year} · {statusLabel[project.status]}
      </p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight">
        {project.name}
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 border border-wood-line bg-card text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-brass hover:text-brass-bright border border-wood-line hover:border-brass px-3 py-1.5 transition-colors"
          >
            GitHub ↗
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-brass hover:text-brass-bright border border-wood-line hover:border-brass px-3 py-1.5 transition-colors"
          >
            Live ↗
          </a>
        )}
        {project.writeup && (
          <a
            href={project.writeup}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-brass hover:text-brass-bright border border-wood-line hover:border-brass px-3 py-1.5 transition-colors"
          >
            Write-up ↗
          </a>
        )}
      </div>

      <div className="mt-10 h-px bg-wood-line" />

      <Reveal>
        <div className="mt-10 flex flex-col gap-5">
          {project.description.map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-foreground/90">
              {para}
            </p>
          ))}
        </div>
      </Reveal>

      {project.highlights.length > 0 && (
        <Reveal delay={80}>
          <h2 className="mt-12 font-mono text-xs text-brass tracking-widest uppercase">
            Highlights
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="text-sm text-foreground/80 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-brass"
              >
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {others.length > 0 && (
        <Reveal delay={80}>
          <div className="mt-16 border-t border-wood-line pt-8">
            <h2 className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
              More from the shelf
            </h2>
            <div className="flex flex-col gap-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-2"
                >
                  <span className="text-sm text-foreground group-hover:text-brass-bright transition-colors">
                    {p.name}
                  </span>
                  <span className="font-mono text-xs text-muted shrink-0">{p.year}</span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </article>
  );
}
