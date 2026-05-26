"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import { getCampaignNode } from "@/data/campaignNodes";
import { makeRewardBundle } from "@/data/rewards";
import { useCampaignStore } from "@/store/campaignStore";

export function RewardScreen() {
  const router = useRouter();
  const {
    pendingReward,
    completedNodeIds,
    currentNodeId,
    chooseRewardCard,
    skipRewardForUpgrade,
    removeNegativeCard,
    rest,
    buyClarity,
  } = useCampaignStore();
  const node = getCampaignNode(currentNodeId);
  const reward = pendingReward ?? makeRewardBundle(completedNodeIds.length + 9);

  const choose = (cardId: string) => {
    chooseRewardCard(cardId);
    router.push("/campaign");
  };

  if (node?.type === "descanso" && !pendingReward) {
    return (
      <ChoiceShell title="Descanso" subtitle="Un banco mental sin pinchos visibles. Sospechoso, pero aceptable.">
        <button className="campaign-choice" onClick={() => { rest(); router.push("/campaign"); }}>
          Recuperar Voluntad y limpiar Estres
        </button>
      </ChoiceShell>
    );
  }

  if (node?.type === "tienda" && !pendingReward) {
    return (
      <ChoiceShell title="Tienda de claridad" subtitle="El tendero es una neurona con delantal y mal credito.">
        <button className="campaign-choice" onClick={() => { buyClarity(); router.push("/campaign"); }}>
          Comprar fragmentos de claridad
        </button>
      </ChoiceShell>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 court-fog opacity-80" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="mb-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Recompensa</p>
          <h1 className="mt-2 text-5xl font-black">{reward.title}</h1>
          <p className="mt-3 text-white/64">
            Elige una carta. Tambien puedes mejorar o limpiar basura mental si el botin lo permite.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {reward.cards.map((card) => (
            <Card key={card.id} card={card} onClick={() => choose(card.id)} />
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {reward.canUpgrade ? (
            <button className="campaign-action" onClick={() => { skipRewardForUpgrade(); router.push("/campaign"); }}>
              Mejorar una carta
            </button>
          ) : null}
          {reward.canRemoveNegative ? (
            <button className="campaign-action" onClick={() => { removeNegativeCard(); router.push("/campaign"); }}>
              Eliminar carta negativa
            </button>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function ChoiceShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 court-fog opacity-80" />
      <section className="relative z-10 w-full max-w-3xl rounded-lg border border-amber-100/18 bg-black/58 p-7 text-center">
        <p className="text-sm font-black uppercase text-amber-100/65">Nodo de campana</p>
        <h1 className="mt-2 text-5xl font-black">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/64">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}
