import type { AIMemorySnapshot } from "@/logic/ai/advancedAITypes";

type Props = {
  memory: AIMemorySnapshot;
};

export function BossMemoryBubble({ memory }: Props) {
  const favorite = memory.favoriteCards[0] ?? "ninguna carta favorita";

  return (
    <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-sm text-zinc-300">
      <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">Memoria contextual</p>
      <p className="mt-2">
        El Tribunal cree que tu estilo dominante es <span className="font-semibold text-amber-100">{memory.dominantStyle.replace(/_/g, " ")}</span>.
      </p>
      <p className="mt-1 text-xs text-zinc-500">Carta observada: {favorite}. Todo esto es gameplay local, nada personal.</p>
    </div>
  );
}
