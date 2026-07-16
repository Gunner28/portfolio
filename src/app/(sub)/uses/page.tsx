import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { uses } from "@/data/uses";
import { features } from "@/data/site";

export const metadata: Metadata = {
  title: "The Toolkit — Gagan Purushotham",
  description: "Hardware, software, and daily instruments of the study.",
};

export default function Uses() {
  if (!features.uses) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
        The Toolkit
      </h1>
      <p className="mt-3 text-muted max-w-lg">
        The instruments this study runs on — hardware, software, and the daily kit.
      </p>

      <div className="mt-10 flex flex-col gap-12">
        {uses.map((group) => (
          <section key={group.group}>
            <h2 className="font-mono text-xs text-brass tracking-widest uppercase mb-4">
              {group.group}
            </h2>
            <div className="flex flex-col">
              {group.items.map((tool) => (
                <div key={tool.name} className="border-t border-wood-line py-4 last:border-b">
                  <p className="text-base font-medium text-foreground">{tool.name}</p>
                  {tool.detail && (
                    <p className="mt-1 text-sm text-muted leading-relaxed">{tool.detail}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
