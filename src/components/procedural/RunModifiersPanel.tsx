import type { ProceduralRunModifier } from "@/logic/procedural/proceduralTypes";

type Props = {
  modifiers: ProceduralRunModifier[];
};

export function RunModifiersPanel({ modifiers }: Props) {
  return (
    <section className="rounded-2xl border border-amber-100/18 bg-black/55 p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/60">Modificadores de run</p>
      <div className="mt-4 grid gap-3">
        {modifiers.map((modifier) => (
          <article key={modifier.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <h3 className="font-black text-white">{modifier.name}</h3>
            <p className="mt-1 text-sm text-white/58">{modifier.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
