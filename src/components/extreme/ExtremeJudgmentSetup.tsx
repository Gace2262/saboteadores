"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Volume2, Waves } from "lucide-react";
import { extremeDifficulties, negativeExtremeModifiers, positiveExtremeModifiers, type ExtremeDifficultyId } from "@/data/extremeModifiers";
import { useCollectionStore } from "@/store/collectionStore";
import { useExtremeJudgmentStore } from "@/store/extremeJudgmentStore";
import { ExtremeModifierCard } from "./ExtremeModifierCard";

export function ExtremeJudgmentSetup() {
  const router = useRouter();
  const unlocked = useCollectionStore((state) => state.extremeJudgmentUnlocked);
  const {
    selectedNegativeModifiers,
    selectedPositiveModifier,
    difficulty,
    intenseSounds,
    reducedFlashes,
    selectModifier,
    setDifficulty,
    toggleIntenseSounds,
    toggleReducedFlashes,
    startRun,
  } = useExtremeJudgmentStore();

  const canStart = selectedNegativeModifiers.length === 2 && Boolean(selectedPositiveModifier) && unlocked;

  const start = () => {
    if (!canStart) return;
    startRun();
    router.push("/extreme-judgment");
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 extreme-judgment-bg" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/70">Modo desbloqueable</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Juicio Extremo</h1>
          <p className="mt-4 max-w-3xl text-xl text-white/68">
            Tribunal del Craneo en modo pesadilla: dos condenas, una ayuda sospechosa y un martillo con complejo de bateria.
          </p>
          {!unlocked ? (
            <div className="mt-5 rounded-lg border border-rose-100/20 bg-rose-500/10 p-4">
              <strong className="text-rose-100">Bloqueado:</strong>
              <span className="text-white/70"> derrota a El Juez en campana para abrir esta grieta mental con confeti funebre.</span>
              <div className="mt-3">
                <Link className="campaign-action max-w-52" href="/campaign">
                  Ir a campana
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_330px]">
          <div className="grid gap-5">
            <section className="rounded-lg border border-rose-100/14 bg-black/46 p-5">
              <h2 className="text-2xl font-black">Elige 2 modificadores negativos</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {negativeExtremeModifiers.map((modifier) => (
                  <ExtremeModifierCard
                    key={modifier.id}
                    modifier={modifier}
                    selected={selectedNegativeModifiers.includes(modifier.id)}
                    onSelect={() => selectModifier(modifier.id, "negative")}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-emerald-100/14 bg-black/46 p-5">
              <h2 className="text-2xl font-black">Elige 1 modificador positivo</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {positiveExtremeModifiers.map((modifier) => (
                  <ExtremeModifierCard
                    key={modifier.id}
                    modifier={modifier}
                    selected={selectedPositiveModifier === modifier.id}
                    onSelect={() => selectModifier(modifier.id, "positive")}
                  />
                ))}
              </div>
            </section>
          </div>

          <aside className="rounded-lg border border-amber-100/16 bg-black/58 p-5">
            <Eye className="text-amber-100" size={38} />
            <h2 className="mt-3 text-2xl font-black">Preparar sentencia</h2>
            <label className="mt-4 grid gap-1 text-xs font-black uppercase text-white/55">
              Nivel de dificultad
              <select
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value as ExtremeDifficultyId)}
                className="min-h-11 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-white"
              >
                {Object.values(extremeDifficulties).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <p className="mt-2 text-sm text-white/58">{extremeDifficulties[difficulty].text}</p>
            <div className="mt-5 grid gap-3">
              <button className="campaign-choice justify-start" onClick={toggleIntenseSounds}>
                <Volume2 size={18} />
                Sonidos intensos: {intenseSounds ? "activados" : "muted elegantes"}
              </button>
              <button className="campaign-choice justify-start" onClick={toggleReducedFlashes}>
                <Waves size={18} />
                Reducir flashes: {reducedFlashes ? "si" : "no"}
              </button>
              <button className="campaign-action" disabled={!canStart} onClick={start}>
                Entrar al Tribunal
              </button>
            </div>
            <p className="mt-4 text-xs leading-5 text-white/45">
              Reglas: el Medidor de Juicio sube con Estres, dano, descartes y Ruido Mental. Al 100 cae un evento de Juicio.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
