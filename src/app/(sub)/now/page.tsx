import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { now, nowUpdated } from "@/data/now";
import { features } from "@/data/site";

export const metadata: Metadata = {
  title: "Now — Gagan Purushotham",
  description: "What's on the desk at the moment.",
};

export default function Now() {
  if (!features.now) notFound();

  return (
    <div>
      <p className="font-mono text-xs text-brass tracking-widest uppercase">
        Updated {nowUpdated}
      </p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-foreground">
        On the desk, now
      </h1>
      <p className="mt-3 text-muted max-w-lg">
        A living page — what I&apos;m actually working on at the moment, in the spirit
        of nownownow.com.
      </p>

      <ul className="mt-10 flex flex-col gap-5">
        {now.map((item, i) => (
          <li
            key={i}
            className="text-base leading-relaxed text-foreground/90 pl-5 relative before:content-['✦'] before:absolute before:left-0 before:text-brass before:text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
