"use client";

export function JSONPreviewPanel({ title, data }: { title: string; data: unknown }) {
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4 text-white">
      <h2 className="text-2xl font-black">{title}</h2>
      <pre className="mt-3 max-h-96 overflow-auto rounded bg-zinc-950 p-3 text-xs text-white/65">{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
