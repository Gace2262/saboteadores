"use client";

import { officialBranding } from "@/data/branding";

export function TaglineDisplay() {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      {officialBranding.taglines.map((tagline) => (
        <div key={tagline} className="rounded-lg border border-white/10 bg-black/48 p-4 text-sm font-black uppercase text-white/72">
          {tagline}
        </div>
      ))}
    </section>
  );
}
