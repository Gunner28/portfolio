import type { Metadata } from "next";
import { projects } from "@/data/resume";

export const metadata: Metadata = {
  title: "Projects — Gagan Purushotham",
  description: "Data science, machine learning, and computer vision projects by Gagan Purushotham.",
};

export default function Projects() {
  return (
    <div className="py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Projects</h1>
      <p className="text-muted max-w-2xl mb-14">
        A selection of data science, machine learning, and computer vision work.
      </p>

      <div className="flex flex-col">
        {projects.map((project) => (
          <div key={project.name} className="border-t border-border py-8 flex flex-col md:flex-row md:justify-between gap-4">
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{project.blurb}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.stack.map((tag) => (
                  <span key={tag} className="font-mono text-xs px-2 py-1 border border-border text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex md:flex-col gap-4 md:items-end shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-accent hover:underline"
                >
                  GitHub →
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-accent hover:underline"
                >
                  Live →
                </a>
              )}
            </div>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </div>
  );
}
