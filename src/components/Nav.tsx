"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-border relative">
      <nav className="max-w-5xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          gagan<span className="text-accent">.</span>purushotham
        </Link>

        <ul className="hidden sm:flex items-center gap-6 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    active
                      ? "text-accent"
                      : "text-muted hover:text-foreground transition-colors"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden text-foreground text-sm font-mono border border-border px-3 py-1.5"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className="sm:hidden flex flex-col border-t border-border bg-background">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="border-b border-border last:border-b-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    "block px-6 py-4 text-sm " +
                    (active ? "text-accent" : "text-muted hover:text-foreground transition-colors")
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
