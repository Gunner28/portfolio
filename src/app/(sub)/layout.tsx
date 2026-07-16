import Link from "next/link";
import { profile } from "@/data/resume";

export default function SubLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-3xl px-6 sm:px-10 py-14 lg:py-20">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-brass-bright transition-colors"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        Back to the study
      </Link>
      <main className="relative z-10 mt-10">{children}</main>
      <footer className="mt-24 pb-4 font-mono text-xs text-muted">
        {profile.name} · Melbourne, Australia
      </footer>
    </div>
  );
}
