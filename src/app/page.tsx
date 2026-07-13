import Link from "next/link";
import { profile, projects } from "@/data/resume";

export default function Home() {
  return (
    <div className="py-20 md:py-28">
      <p className="font-mono text-sm text-accent mb-4">{profile.location}</p>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
        {profile.name}
      </h1>
      <p className="mt-4 text-lg md:text-xl text-muted max-w-2xl">
        {profile.roles.join(" · ")}
      </p>
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/90">
        {profile.bio}
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/projects"
          className="px-5 py-2.5 bg-accent text-black font-medium text-sm hover:opacity-90 transition-opacity"
        >
          View Projects
        </Link>
        <a
          href="/resume.docx"
          download
          className="px-5 py-2.5 border border-border text-sm hover:border-foreground transition-colors"
        >
          Download Resume
        </a>
      </div>

      <div className="mt-24">
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">
          Selected Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {projects.map((project) => (
            <div key={project.name} className="bg-background p-6 flex flex-col gap-3">
              <h3 className="font-semibold text-base">{project.name}</h3>
              <p className="text-sm text-muted leading-relaxed line-clamp-4">
                {project.blurb}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {project.stack.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Link href="/projects" className="inline-block mt-6 text-sm text-accent hover:underline">
          See all projects →
        </Link>
      </div>
    </div>
  );
}
