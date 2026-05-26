import Link from "next/link";
import { GlobalEventOverlay } from "@/components/world/GlobalEventOverlay";
import { SeasonBanner } from "@/components/world/SeasonBanner";
import { worldEvents } from "@/data/worldEvents";
import { SeasonEventButtons } from "./season-event-buttons";

export default function WorldSeasonsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Clima mental global</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Temporadas psicologicas</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Cada temporada cambia regiones, bosses, anomalias, dialogos, musica y esa sensacion de que el mapa te mira raro.
          </p>
          <Link href="/world" className="campaign-choice mt-5 max-w-xs">Volver al universo</Link>
        </header>
        <SeasonBanner />
        <section className="rounded-lg border border-white/10 bg-black/50 p-5">
          <h2 className="text-3xl font-black">Eventos globales disponibles</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {worldEvents.map((event) => (
              <article key={event.id} className="rounded border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-black uppercase text-amber-100/65">{event.rarity} / {event.climate}</p>
                <h3 className="mt-2 text-2xl font-black text-white">{event.name}</h3>
                <p className="mt-2 text-sm text-white/62">{event.effect}</p>
                <p className="mt-2 text-sm font-bold text-white/75">{event.flavor}</p>
                <SeasonEventButtons eventId={event.id} />
              </article>
            ))}
          </div>
        </section>
      </section>
      <GlobalEventOverlay />
    </main>
  );
}
