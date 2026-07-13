import type { Metadata } from "next";
import { profile, skills, experience, education, certifications } from "@/data/resume";

export const metadata: Metadata = {
  title: "About — Gagan Purushotham",
  description: "Background, experience, skills, and education for Gagan Purushotham.",
};

export default function About() {
  return (
    <div className="py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">About</h1>
      <p className="max-w-2xl text-base leading-relaxed text-foreground/90">{profile.bio}</p>

      <a
        href="/resume.docx"
        download
        className="inline-block mt-6 px-5 py-2.5 bg-accent text-black font-medium text-sm hover:opacity-90 transition-opacity"
      >
        Download Resume
      </a>

      <section className="mt-20">
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">Experience</h2>
        <div className="flex flex-col gap-10">
          {experience.map((job) => (
            <div key={job.title + job.company} className="border-t border-border pt-6">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <span className="text-sm text-muted">{job.company} — {job.location}</span>
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                {job.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-foreground/80 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">Skills</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((group) => (
            <div key={group.group}>
              <h3 className="text-sm font-semibold mb-2">{group.group}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-2 py-1 border border-border text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">Education</h2>
        <div className="flex flex-col gap-4">
          {education.map((edu) => (
            <div key={edu.school} className="border-t border-border pt-4">
              <h3 className="font-semibold">{edu.program}</h3>
              <p className="text-sm text-muted">{edu.field} — {edu.school}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 mb-10">
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">Certifications</h2>
        <div className="flex flex-col gap-4">
          {certifications.map((cert) => (
            <div key={cert.name} className="border-t border-border pt-4">
              <h3 className="font-semibold">{cert.name}</h3>
              <p className="text-sm text-muted">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
