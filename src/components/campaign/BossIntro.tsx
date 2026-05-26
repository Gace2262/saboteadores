"use client";

import { useRouter } from "next/navigation";
import { Gavel, Skull, Trophy } from "lucide-react";
import { getBoss } from "@/data/bosses";
import { getCampaignNode } from "@/data/campaignNodes";
import { getChapterByBoss } from "@/data/story/chapters";
import { getDialogueScene } from "@/data/story/dialogues";
import { useCampaignStore } from "@/store/campaignStore";
import { useCollectionStore } from "@/store/collectionStore";
import { ChapterIntro } from "@/components/story/ChapterIntro";
import { DialogScene } from "@/components/story/DialogScene";

export function BossIntro() {
  const router = useRouter();
  const { currentNodeId, completeActiveEncounter, stress, mentalNoise, goToMap } = useCampaignStore();
  const storyMode = useCollectionStore((state) => state.storyMode);
  const node = getCampaignNode(currentNodeId);
  const boss = getBoss(node?.bossId) ?? {
    id: "controlador",
    faction: "controlador",
    name: "Crisis menor",
    room: node?.title ?? "Sala mental sin rotulo",
    mechanic: node?.subtitle ?? "Una crisis pequena con ambiciones de opera.",
    quote: "Esto pudo ser un pensamiento pasajero, pero eligio produccion teatral.",
    visualEffect: "panic_pulse",
    rewardCardId: "controlador-compulsivo",
  };
  const chapter = getChapterByBoss(boss.id);
  const dialogue = boss.id === "juez" ? getDialogueScene("juez") : undefined;
  const showStory = storyMode !== "combat-only";
  const showDialogue = storyMode === "full" && dialogue;

  if (!node) {
    return (
      <main className="grid min-h-screen place-items-center text-white">
        <button onClick={() => { goToMap(); router.push("/campaign"); }}>Volver al mapa</button>
      </main>
    );
  }

  const win = () => {
    completeActiveEncounter(true);
    router.push(boss.id === "juez" ? "/campaign/finale" : "/campaign/reward");
  };

  const lose = () => {
    completeActiveEncounter(false);
    router.push("/campaign/finale");
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-black/70" />
      <div className={`absolute inset-0 ${boss.visualEffect} court-fog opacity-80`} />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-amber-100/20 bg-black/62 p-7">
          {showStory && chapter ? (
            <div className="mb-5">
              <ChapterIntro chapter={chapter} />
            </div>
          ) : null}
          {showDialogue ? (
            <div className="mb-5">
              <DialogScene scene={dialogue} />
            </div>
          ) : null}
          <p className="text-sm font-black uppercase text-amber-100/70">
            {boss.id === "juez" ? "Juicio final" : "Jefe menor"}
          </p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">{boss.room}</h1>
          <h2 className="mt-4 text-3xl font-black text-amber-100">{boss.name}</h2>
          <p className="mt-5 max-w-3xl text-2xl leading-9 text-white/76">{boss.quote}</p>
          <p className="mt-6 max-w-3xl rounded-lg border border-white/10 bg-white/6 p-4 text-white/66">{boss.mechanic}</p>
          {boss.phases ? (
            <div className="mt-6 grid gap-3">
              {boss.phases.map((phase, index) => (
                <div key={phase.name} className="rounded-md border border-amber-100/14 bg-black/35 p-4">
                  <p className="text-xs font-black uppercase text-amber-100/56">Fase {index + 1}</p>
                  <h3 className="text-xl font-black">{phase.name}</h3>
                  <p className="mt-1 text-white/62">{phase.mechanic}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <aside className="rounded-lg border border-white/12 bg-black/52 p-5">
          <Gavel className="text-amber-100" size={42} />
          <h2 className="mt-4 text-2xl font-black">Antes de entrar</h2>
          <p className="mt-3 text-white/62">
            Tu Estres actual es {stress} y tu Ruido Mental es {mentalNoise}. El jefe lo nota, porque aparentemente
            tambien revisa indicadores internos.
          </p>
          <div className="mt-6 grid gap-3">
            <button className="campaign-action" onClick={win}>
              <Trophy size={18} />
              Vencer sala
            </button>
            <button className="campaign-danger" onClick={lose}>
              <Skull size={18} />
              Simular derrota
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}
