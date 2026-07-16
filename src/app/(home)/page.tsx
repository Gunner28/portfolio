import Link from "next/link";
import {
  profile,
  skills,
  experience,
  education,
  certifications,
} from "@/data/resume";
import { featuredProjects } from "@/data/projects";
import { features, site } from "@/data/site";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

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

const stats = [
  { end: 89, suffix: "%", label: "CV model accuracy" },
  { end: 75, suffix: "K", label: "Images trained on" },
  { end: 35, suffix: "%", label: "Manual effort cut" },
  { end: 25, suffix: "%", label: "Risk detection ↑" },
];

export default function Home() {
  return (
    <div className="w-full py-16 lg:py-24 flex flex-col gap-28">
      <section id="about" className="scroll-mt-24">
        <SectionHeader title="About" />

        <Reveal>
          <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
            {profile.bio}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-wood-line border border-wood-line">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-4 text-center">
                <dd className="font-serif text-2xl sm:text-3xl font-bold text-brass-bright">
                  <CountUp end={s.end} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-[11px] text-muted leading-tight">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={80}>
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
        </Reveal>

        <Reveal delay={80}>
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
        </Reveal>
      </section>

      <section id="experience" className="scroll-mt-24">
        <SectionHeader title="Experience" />
        <div className="flex flex-col">
          {experience.map((job, idx) => (
            <Reveal key={job.title + job.company} delay={idx * 60}>
              <div className="group relative border-l-2 border-wood-line hover:border-brass pl-6 pb-12 last:pb-0 transition-colors">
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
            </Reveal>
          ))}
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 pb-8">
        <SectionHeader title="Projects" />
        <div className="flex flex-col gap-6">
          {featuredProjects.map((project, idx) => (
            <Reveal key={project.slug} delay={idx * 60}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block border border-wood-line bg-card p-6 hover:border-brass hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-brass-bright transition-colors">
                    {project.name}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
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
                <span className="mt-4 inline-block font-mono text-xs text-brass group-hover:text-brass-bright transition-colors">
                  Read the full entry →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        {features.archive && (
          <Link
            href="/archive"
            className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.2em] text-brass hover:text-brass-bright transition-colors"
          >
            Browse the full catalogue →
          </Link>
        )}
      </section>

      {(features.now || features.bookshelf || features.notes) && (
        <section className="scroll-mt-24">
          <SectionHeader title="Elsewhere in the study" />
          <div className="grid sm:grid-cols-2 gap-px bg-wood-line border border-wood-line">
            {features.now && (
              <Link href="/now" className="group bg-background p-6 hover:bg-card transition-colors">
                <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-brass-bright transition-colors">
                  On the desk, now
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  What&apos;s actually being worked on at the moment.
                </p>
              </Link>
            )}
            {features.bookshelf && (
              <Link href="/bookshelf" className="group bg-background p-6 hover:bg-card transition-colors">
                <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-brass-bright transition-colors">
                  The bookshelf
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Currently open, finished, and queued — with margin notes.
                </p>
              </Link>
            )}
            {features.notes && (
              <Link href="/notes" className="group bg-background p-6 hover:bg-card transition-colors">
                <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-brass-bright transition-colors">
                  Field notes
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Writing from the study.
                </p>
              </Link>
            )}
            {features.uses && (
              <Link href="/uses" className="group bg-background p-6 hover:bg-card transition-colors">
                <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-brass-bright transition-colors">
                  The toolkit
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Hardware, software, and the daily instruments.
                </p>
              </Link>
            )}
            {features.stats && (
              <Link href="/stats" className="group bg-background p-6 hover:bg-card transition-colors">
                <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-brass-bright transition-colors">
                  The ledger
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  The study, counted — live from its own records.
                </p>
              </Link>
            )}
            {features.colophon && (
              <Link href="/colophon" className="group bg-background p-6 hover:bg-card transition-colors">
                <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-brass-bright transition-colors">
                  Colophon
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Timber, type, pigment — how this place was built.
                </p>
              </Link>
            )}
            {features.card && (
              <Link href="/card" className="group bg-background p-6 hover:bg-card transition-colors">
                <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-brass-bright transition-colors">
                  Library card
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  The reader&apos;s record — member since MMXXVI.
                </p>
              </Link>
            )}
          </div>
        </section>
      )}

      <footer className="pb-16 font-mono text-xs text-muted">
        Designed &amp; built by {profile.name} · Last polished {site.lastPolished} · Press{" "}
        <kbd className="px-1.5 py-0.5 border border-wood-line text-brass">⌘K</kbd> for commands
      </footer>
    </div>
  );
}
