import Link from "next/link";
import { aiBossProfiles } from "@/data/aiBossProfiles";
import { allFactions } from "@/data/factions";
import { AIPersonalityPanel } from "@/components/ai/AIPersonalityPanel";

export default function BossAIPage() {
  const featured = allFactions.filter((faction) => ["juez", "controlador", "perfeccionista", "inquieto", "hipervigilante", "evitador"].includes(faction.id));

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#4b2815,transparent_32%),linear-gradient(135deg,#050308,#140812_55%,#050308)] px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="text-sm text-zinc-400 hover:text-amber-200">
            Volver al Tribunal
          </Link>
          <Link href="/ai-debug" className="rounded-full border border-amber-300/30 px-4 py-2 text-sm text-amber-100 hover:bg-amber-300/10">
            Abrir depuracion IA
          </Link>
        </nav>
        <header className="border-b border-white/10 pb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">Etapa 33</p>
          <h1 className="mt-3 text-4xl font-black md:text-6xl">IA de Saboteadores Mentales</h1>
          <p className="mt-3 max-w-3xl text-zinc-300">
            Cada jefe adapta su presion con memoria contextual, lectura de patrones, combos cortos y fases teatrales. Aprende sin trampas visibles: respeta costos, turnos y ventanas de respuesta.
          </p>
        </header>
        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["Patrones", "Detecta estres, dependencia de cartas, bloqueo, evasiones y combos repetidos."],
            ["Memoria", "Guarda solo gameplay local: facciones, cartas usadas, victorias y derrotas por boss."],
            ["Fairness", "Limita counters directos, control fuerte y combos abusivos para que la derrota ensene algo."],
            ["Intenciones", "El jugador ve pistas del plan enemigo, claras o cripticas segun dificultad."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <h2 className="font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm text-zinc-400">{text}</p>
            </article>
          ))}
        </section>
        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          {featured.map((faction) => (
            <AIPersonalityPanel key={faction.id} bossId={faction.id} />
          ))}
        </section>
        <section className="mt-8 rounded-2xl border border-amber-300/20 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.28em] text-amber-200/70">Combo ceremonial registrado</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((faction) => {
              const profile = aiBossProfiles[faction.id];
              return (
                <div key={faction.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <h3 className="font-semibold text-white">{profile.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{profile.preferredCombo.join(" -> ")}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
