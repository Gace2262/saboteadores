import { aiBossProfiles } from "@/data/aiBossProfiles";
import { getFaction, type FactionId } from "@/data/factions";
import { getAIProfile } from "@/logic/ai/aiProfiles";

type Props = {
  bossId: FactionId;
};

export function AIPersonalityPanel({ bossId }: Props) {
  const boss = aiBossProfiles[bossId];
  const legacy = getAIProfile(bossId);
  const faction = getFaction(bossId);

  return (
    <section className="rounded-2xl border border-amber-300/20 bg-gradient-to-br from-zinc-950 to-zinc-900 p-5 shadow-2xl shadow-black/30">
      <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Personalidad de IA</p>
      <h2 className="mt-2 text-2xl font-black text-white">{boss.title}</h2>
      <p className="mt-1 text-sm text-zinc-300">{legacy.personality.style}</p>
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Peligro</span>
          <p className="mt-1 text-zinc-200">{legacy.personality.danger}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Debilidad</span>
          <p className="mt-1 text-zinc-200">{boss.weaknesses.join(", ")}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(boss.weights)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 6)
          .map(([key, value]) => (
            <span key={key} className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
              {key}: {value}
            </span>
          ))}
      </div>
      <p className="mt-4 text-xs text-zinc-500">
        Faccion: {faction?.name ?? bossId}. La IA adapta pesos, no inventa cartas. El fraude queda fuera del presupuesto ceremonial.
      </p>
    </section>
  );
}
