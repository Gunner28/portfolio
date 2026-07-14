import {
  profile,
  skills,
  experience,
  education,
  certifications,
  projects,
} from "@/data/resume";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground whitespace-nowrap">
        {title}
      </h2>
      <span className="h-px flex-1 bg-wood-line" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full py-16 lg:py-24 flex flex-col gap-28">
      <section id="about" className="scroll-mt-24">
        <SectionHeader title="About" />
        <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
          {profile.bio}
        </p>

        <div className="mt-10 flex flex-col gap-6">
          {skills.map((group) => (
            <div key={group.group}>
              <h3 className="font-mono text-xs text-brass tracking-wider mb-2">
                {group.group.toUpperCase()}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 border border-wood-line bg-card text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-mono text-xs text-brass tracking-wider mb-2">EDUCATION</h3>
            <ul className="flex flex-col gap-3">
              {education.map((edu) => (
                <li key={edu.school}>
                  <p className="text-sm text-foreground">{edu.program}</p>
                  <p className="text-xs text-muted">{edu.field} — {edu.school}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs text-brass tracking-wider mb-2">CERTIFICATIONS</h3>
            <ul className="flex flex-col gap-3">
              {certifications.map((cert) => (
                <li key={cert.name}>
                  <p className="text-sm text-foreground">{cert.name}</p>
                  <p className="text-xs text-muted">{cert.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="experience" className="scroll-mt-24">
        <SectionHeader title="Experience" />
        <div className="flex flex-col">
          {experience.map((job) => (
            <div
              key={job.title + job.company}
              className="group relative border-l-2 border-wood-line hover:border-brass pl-6 pb-12 last:pb-0 transition-colors"
            >
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-panel border-2 border-wood-line group-hover:border-brass-bright transition-colors" />
              <p className="font-mono text-xs text-muted mb-1">{job.location}</p>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {job.title} <span className="text-brass">@ {job.company}</span>
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {job.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-foreground/80 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-muted">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 pb-8">
        <SectionHeader title="Projects" />
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="border border-wood-line bg-card p-6 hover:border-brass transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {project.name}
                </h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} on GitHub`}
                    className="shrink-0 text-muted hover:text-brass-bright transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
                    </svg>
                  </a>
                )}
              </div>
              <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                {project.blurb}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.stack.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-brass">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="pb-16 font-mono text-xs text-muted">
        Designed &amp; built by {profile.name}
      </footer>
    </div>
  );
}
