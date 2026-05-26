import { officialTaglines } from "@/data/taglines";

export function PromoCard({ format = "horizontal" }: { format?: "square" | "vertical" | "horizontal" }) {
  const size = format === "square" ? "aspect-square" : format === "vertical" ? "aspect-[4/5]" : "aspect-[16/9]";
  return (
    <article className={`relative overflow-hidden rounded-lg border border-amber-100/20 bg-[radial-gradient(circle_at_72%_22%,rgba(214,170,69,0.26),transparent_30%),linear-gradient(135deg,#050308,#1a0710,#000)] p-6 text-white ${size}`}>
      <div className="absolute right-8 top-8 h-32 w-32 rounded-full border border-amber-100/30 bg-black/40" />
      <div className="absolute bottom-8 right-10 h-1 w-48 rotate-[-12deg] bg-amber-100/50 shadow-[0_0_22px_rgba(214,170,69,0.8)]" />
      <div className="relative z-10 flex h-full flex-col justify-end">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/70">Saboteadores Mentales</p>
        <h3 className="mt-3 max-w-xl text-4xl font-black uppercase leading-none">{officialTaglines[format === "vertical" ? 4 : format === "square" ? 6 : 2].text}</h3>
      </div>
    </article>
  );
}
