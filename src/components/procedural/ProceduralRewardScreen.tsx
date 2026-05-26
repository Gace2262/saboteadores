import { proceduralRewards } from "@/data/procedural/rewardPools";

type Props = {
  rewardId?: string;
};

export function ProceduralRewardScreen({ rewardId }: Props) {
  const reward = proceduralRewards.find((item) => item.id === rewardId) ?? proceduralRewards[0];
  return (
    <section className="rounded-2xl border border-emerald-100/20 bg-emerald-100/10 p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-100/60">Recompensa dinamica</p>
      <h2 className="mt-2 text-2xl font-black">{reward.label}</h2>
      <p className="mt-2 text-sm text-white/60">Tipo: {reward.type}. Rareza: {reward.rarity}. El mapa insiste en que esto es una oportunidad, no una trampa con mejor iluminacion.</p>
    </section>
  );
}
