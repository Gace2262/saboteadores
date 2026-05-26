"use client";

import { loreEntries } from "@/data/story/loreEntries";
import { useCollectionStore } from "@/store/collectionStore";

export function LoreCodex() {
  const unlocked = useCollectionStore((state) => state.unlockedLoreEntries);
  const endings = useCollectionStore((state) => state.unlockedEndings);
  const choices = useCollectionStore((state) => state.narrativeChoices);
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto w-full max-w-6xl">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Codex narrativo</p>
          <h1 className="mt-2 text-5xl font-black">Archivo de guardianes carceleros</h1>
          <p className="mt-3 max-w-3xl text-white/64">
            Textos desbloqueables, finales encontrados y decisiones registradas. El album mental ahora tambien juzga tu lectura.
          </p>
        </header>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {loreEntries.map((entry) => {
            const isUnlocked = unlocked.includes(entry.id);
            return (
              <article key={entry.id} className={`rounded-lg border p-5 ${isUnlocked ? "border-amber-100/18 bg-black/58" : "border-white/10 bg-black/35 opacity-65"}`}>
                <p className="text-xs font-black uppercase text-amber-100/55">{isUnlocked ? "Desbloqueado" : "Bloqueado"}</p>
                <h2 className="mt-2 text-2xl font-black">{isUnlocked ? entry.title : "???"}</h2>
                <p className="mt-2 text-sm text-white/50">{entry.excerpt}</p>
                <p className="mt-4 leading-7 text-white/70">{isUnlocked ? entry.text : "Derrota jefes y toma decisiones para abrir este expediente."}</p>
              </article>
            );
          })}
        </div>
        <section className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-white/12 bg-black/52 p-5">
            <h2 className="text-2xl font-black">Finales obtenidos</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {endings.length ? endings.map((ending) => <span key={ending} className="rounded border border-amber-100/20 bg-amber-100/10 px-3 py-2 text-sm font-black text-amber-100">{ending}</span>) : <p className="text-white/55">Ningun final registrado todavia.</p>}
            </div>
          </div>
          <div className="rounded-lg border border-white/12 bg-black/52 p-5">
            <h2 className="text-2xl font-black">Elecciones registradas</h2>
            <div className="mt-3 grid gap-2">
              {choices.length ? choices.map((choice) => <p key={choice} className="rounded bg-white/6 p-3 text-sm text-white/65">{choice}</p>) : <p className="text-white/55">Aun no hay elecciones. El espejo se esta impacientando.</p>}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
