import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24">
      <p className="font-mono text-sm text-brass tracking-widest mb-4">404</p>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
        Lost in the stacks
      </h1>
      <p className="mt-4 max-w-md text-muted leading-relaxed">
        This shelf is empty — the page you were looking for isn&apos;t catalogued here.
        Let&apos;s walk you back to the study.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-brass text-[var(--selection-ink)] font-medium text-sm hover:bg-brass-bright transition-colors"
      >
        Return to the study
      </Link>
    </div>
  );
}
