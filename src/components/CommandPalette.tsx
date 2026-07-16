"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/data/resume";
import { projects } from "@/data/projects";
import { features } from "@/data/site";
import { UI_EVENTS, toast } from "@/lib/ui";

type Action = {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
};

// Works from any page: scrolls if the section is present, otherwise
// navigates home with the anchor.
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  else window.location.href = `/#${id}`;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = useMemo<Action[]>(
    () => [
      { id: "about", label: "Go to About", hint: "Section", run: () => scrollTo("about") },
      { id: "experience", label: "Go to Experience", hint: "Section", run: () => scrollTo("experience") },
      { id: "projects", label: "Go to Projects", hint: "Section", run: () => scrollTo("projects") },
      ...(features.archive
        ? [{ id: "archive", label: "Browse the catalogue", hint: "Page", run: () => (window.location.href = "/archive") }]
        : []),
      ...(features.now
        ? [{ id: "now", label: "On the desk, now", hint: "Page", run: () => (window.location.href = "/now") }]
        : []),
      ...(features.bookshelf
        ? [{ id: "bookshelf", label: "Open the bookshelf", hint: "Page", run: () => (window.location.href = "/bookshelf") }]
        : []),
      ...(features.notes
        ? [{ id: "notes", label: "Read the field notes", hint: "Page", run: () => (window.location.href = "/notes") }]
        : []),
      ...(features.uses
        ? [{ id: "uses", label: "Open the toolkit", hint: "Page", run: () => (window.location.href = "/uses") }]
        : []),
      ...(features.stats
        ? [{ id: "stats", label: "Balance the ledger", hint: "Page", run: () => (window.location.href = "/stats") }]
        : []),
      ...(features.colophon
        ? [{ id: "colophon", label: "Read the colophon", hint: "Page", run: () => (window.location.href = "/colophon") }]
        : []),
      ...(features.card
        ? [{ id: "card", label: "Inspect the library card", hint: "Page", run: () => (window.location.href = "/card") }]
        : []),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        label: p.name,
        hint: "Project",
        run: () => (window.location.href = `/projects/${p.slug}`),
      })),
      {
        id: "resume",
        label: "Open résumé (PDF)",
        hint: "File",
        run: () => window.open("/resume.pdf", "_blank", "noreferrer"),
      },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            toast("Email copied to clipboard");
          } catch {
            toast("Couldn't copy — long-press to select");
          }
        },
      },
      { id: "email", label: "Email me", hint: "Link", run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: "github", label: "Open GitHub", hint: "Link", run: () => window.open(profile.github, "_blank", "noreferrer") },
      { id: "linkedin", label: "Open LinkedIn", hint: "Link", run: () => window.open(profile.linkedin, "_blank", "noreferrer") },
      { id: "theme", label: "Toggle light / dark", hint: "Lamp", run: () => window.dispatchEvent(new CustomEvent(UI_EVENTS.toggleTheme)) },
      { id: "ambient", label: "Toggle fireplace ambience", hint: "Sound", run: () => window.dispatchEvent(new CustomEvent(UI_EVENTS.toggleAmbient)) },
      { id: "top", label: "Back to top", hint: "Scroll", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.hint?.toLowerCase().includes(q)
    );
  }, [actions, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(UI_EVENTS.openPalette, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(UI_EVENTS.openPalette, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const choose = (a: Action) => {
    setOpen(false);
    a.run();
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) choose(filtered[active]);
    }
  };

  return (
    <div
      className="fade-in fixed inset-0 z-[70] flex items-start justify-center bg-black/70 backdrop-blur-sm p-4 pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="modal-in w-full max-w-md border border-wood-line bg-panel shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onListKey}
      >
        <div className="flex items-center gap-3 border-b border-wood-line px-4 py-3">
          <span className="text-brass">⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to a section…"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
          />
        </div>
        <ul className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted">Nothing found.</li>
          )}
          {filtered.map((a, i) => (
            <li key={a.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(a)}
                className={
                  "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors " +
                  (i === active ? "bg-card text-foreground" : "text-muted hover:text-foreground")
                }
              >
                <span>{a.label}</span>
                {a.hint && <span className="font-mono text-[11px] text-brass/80">{a.hint}</span>}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 border-t border-wood-line px-4 py-2 font-mono text-[10px] text-muted">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
