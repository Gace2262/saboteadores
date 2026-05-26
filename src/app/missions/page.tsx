"use client";

import { DailyMissionCard } from "@/components/missions/DailyMissionCard";
import { WeeklyChallengePanel } from "@/components/missions/WeeklyChallengePanel";
import { dailyMissions, epicMissions, secretMissions } from "@/data/missions";
import { useProgressionStore } from "@/store/progressionStore";

export default function MissionsPage() {
  const { stats, completedMissionIds } = useProgressionStore();
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Misiones del Tribunal Mental</p>
          <h1 className="mt-2 text-5xl font-black">Acusaciones diarias</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Objetivos absurdamente ceremoniales, sin compras, sin castigos de calendario y con recompensas desbloqueables jugando.
          </p>
        </header>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dailyMissions.map((mission) => (
            <DailyMissionCard key={mission.id} mission={mission} stats={stats} completed={completedMissionIds.includes(mission.id)} />
          ))}
        </div>
        <div className="mt-5">
          <WeeklyChallengePanel />
        </div>
        <section className="mt-5 rounded-lg border border-rose-100/15 bg-black/50 p-5">
          <p className="text-sm font-black uppercase text-rose-100/65">Misiones epicas y Juicio Extremo</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {epicMissions.map((mission) => (
              <DailyMissionCard key={mission.id} mission={mission} stats={stats} completed={completedMissionIds.includes(mission.id)} />
            ))}
          </div>
        </section>
        <section className="mt-5 rounded-lg border border-white/10 bg-black/45 p-5">
          <p className="text-sm font-black uppercase text-white/45">Misiones secretas</p>
          <h2 className="mt-1 text-4xl font-black">Documentos clasificados</h2>
          <p className="mt-3 max-w-3xl text-white/58">
            Se muestran como contrato roto hasta que el progreso las delata. El Tribunal odia cuando eso pasa.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {secretMissions.map((mission) => {
              const completed = completedMissionIds.includes(mission.id);
              return (
                <DailyMissionCard
                  key={mission.id}
                  mission={completed ? mission : { ...mission, title: "???", description: "Condicion oculta. Recompensa rara. Sospecha saludable recomendada.", flavorText: "Documento sellado con culpa industrial." }}
                  stats={stats}
                  completed={completed}
                />
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
