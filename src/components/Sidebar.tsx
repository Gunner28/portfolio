"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/resume";

const sections = [
  { id: "about", num: "01", label: "About" },
  { id: "experience", num: "02", label: "Experience" },
  { id: "projects", num: "03", label: "Projects" },
  { id: "contact", num: "04", label: "Contact" },
];

export default function Sidebar() {
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const NavList = ({ onNavigate }: { onNavigate?: () => void }) => (
    <ul className="flex flex-col gap-1">
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={onNavigate}
              className="group flex items-center gap-3 py-2.5"
            >
              <span
                className={
                  "font-mono text-xs transition-colors " +
                  (isActive ? "text-brass-bright" : "text-muted group-hover:text-brass")
                }
              >
                {s.num}
              </span>
              <span
                className={
                  "h-px transition-all " +
                  (isActive ? "w-8 bg-brass-bright" : "w-4 bg-wood-line group-hover:w-8 group-hover:bg-brass")
                }
              />
              <span
                className={
                  "text-sm tracking-wide transition-colors " +
                  (isActive ? "text-foreground" : "text-muted group-hover:text-foreground")
                }
              >
                {s.label}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-wood-line bg-panel/95 backdrop-blur px-6 py-4">
        <a href="#about" className="font-serif text-lg text-foreground">
          Gagan Purushotham
        </a>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="font-mono text-xs border border-wood-line text-muted px-3 py-1.5"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>
      {open && (
        <div className="lg:hidden border-b border-wood-line bg-panel px-6 py-4">
          <NavList onNavigate={() => setOpen(false)} />
        </div>
      )}

      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-[380px] lg:justify-between lg:py-16 lg:pl-16 lg:pr-10 border-r border-wood-line bg-panel wood-grain">
        <div className="lamp-glow">
          <p className="font-mono text-xs text-brass mb-3 tracking-wider">
            {profile.location.toUpperCase()}
          </p>
          <h1 className="font-serif text-4xl font-bold text-foreground leading-tight">
            {profile.name}
          </h1>
          <p className="mt-3 text-base text-muted leading-relaxed max-w-xs">
            {profile.roles.join(" · ")}
          </p>
        </div>

        <nav className="mt-10">
          <NavList />
        </nav>

        <div className="flex items-center gap-5 mt-10">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-muted hover:text-brass-bright transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m4 6 8 6 8-6" />
            </svg>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-brass-bright transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5C4.98 4.88 3.94 6 2.5 6S0 4.88 0 3.5 1.04 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.87c0-1.64-.03-3.75-2.29-3.75-2.29 0-2.64 1.79-2.64 3.63V23h-4V8z" />
            </svg>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-brass-bright transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
            </svg>
          </a>
          <a
            href="/resume.docx"
            download
            className="ml-auto font-mono text-xs text-brass hover:text-brass-bright border border-wood-line hover:border-brass px-3 py-1.5 transition-colors"
          >
            Résumé
          </a>
        </div>
      </aside>
    </>
  );
}
