"use client";

export function PressQuoteCard({ quote }: { quote: string }) {
  return (
    <blockquote className="rounded-lg border border-white/10 bg-white/5 p-5">
      <p className="text-xl font-black text-white">{quote}</p>
      <footer className="mt-4 text-xs font-black uppercase tracking-[0.25em] text-amber-100/60">Prensa indie mock</footer>
    </blockquote>
  );
}
