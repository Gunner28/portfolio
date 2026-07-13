import type { Metadata } from "next";
import { profile } from "@/data/resume";

export const metadata: Metadata = {
  title: "Contact — Gagan Purushotham",
  description: "Get in touch with Gagan Purushotham.",
};

export default function Contact() {
  return (
    <div className="py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Contact</h1>
      <p className="max-w-xl text-foreground/90 leading-relaxed mb-12">
        Open to data analyst, data scientist, computer vision, and AI engineering opportunities.
        Reach out via email or connect on LinkedIn / GitHub below.
      </p>

      <div className="flex flex-col gap-4 max-w-md">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center justify-between border-t border-border py-4 hover:text-accent transition-colors"
        >
          <span className="font-mono text-sm">Email</span>
          <span className="text-sm">{profile.email}</span>
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between border-t border-border py-4 hover:text-accent transition-colors"
        >
          <span className="font-mono text-sm">LinkedIn</span>
          <span className="text-sm">gagan-purushotham</span>
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between border-t border-b border-border py-4 hover:text-accent transition-colors"
        >
          <span className="font-mono text-sm">GitHub</span>
          <span className="text-sm">Gunner28</span>
        </a>
      </div>
    </div>
  );
}
