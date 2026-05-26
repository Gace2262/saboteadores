"use client";

import { useRouter } from "next/navigation";
import { Crown, RotateCcw } from "lucide-react";
import { chooseEnding } from "@/data/story/endings";
import { useCampaignStore } from "@/store/campaignStore";
import { EndingScreen } from "@/components/story/EndingScreen";

export function CampaignFinale() {
  const router = useRouter();
  const { status, lastDefeatLine, completedNodeIds, defeatedBossIds, stress, campaignDeck, resetCampaign } = useCampaignStore();
  const defeated = status === "defeat";
  const hiperrationalCards = campaignDeck.filter((card) => card.faction === "hiperracional").length;
  const ending = chooseEnding({ won: !defeated, stress, hiperrationalCards });

  const restart = () => {
    resetCampaign();
    router.push("/campaign");
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 court-fog opacity-80" />
      <section className="relative z-10 w-full max-w-4xl rounded-lg border border-amber-100/20 bg-black/64 p-8 text-center">
        <Crown className={`mx-auto ${defeated ? "text-rose-200" : "text-amber-100"}`} size={54} />
        <p className="mt-5 text-sm font-black uppercase text-amber-100/62">
          {defeated ? "Pantalla de derrota" : "Final narrativo"}
        </p>
        <h1 className="mt-2 text-5xl font-black md:text-7xl">
          {defeated ? "Condena Interna" : "Juicio Suspendido"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-2xl font-black text-white/78">
          {defeated ? lastDefeatLine : "Hoy no fuiste absuelto. Fuiste libre."}
        </p>
        <div className="mt-6">
          <EndingScreen ending={ending} defeated={defeated} />
        </div>
        {!defeated ? (
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/66">
            El martillo cae por ultima vez. No porque el juicio terminara, sino porque dejaste de asistir. Las cadenas
            no se rompen con fuerza: se oxidan cuando ya no les das obediencia.
          </p>
        ) : null}
        <div className="mt-8 grid gap-3 rounded-lg border border-white/10 bg-white/6 p-4 text-left text-sm text-white/64 md:grid-cols-2">
          <span>Nodos completados: <strong className="text-white">{completedNodeIds.length}</strong></span>
          <span>Jefes vencidos: <strong className="text-white">{defeatedBossIds.length}</strong></span>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <button className="campaign-action" onClick={restart}>
            <RotateCcw size={18} />
            Nueva campana
          </button>
          <button className="campaign-choice max-w-xs" onClick={() => router.push("/campaign")}>
            Volver al mapa
          </button>
        </div>
      </section>
    </main>
  );
}
