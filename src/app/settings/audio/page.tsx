import Link from "next/link";
import { VolumeSettings } from "@/components/audio/VolumeSettings";
import { MusicTransitionOverlay } from "@/components/audio/MusicTransitionOverlay";
import { CinematicAudioTrigger } from "@/components/audio/CinematicAudioTrigger";
import { StressAudioMeter } from "@/components/audio/StressAudioMeter";

export default function AudioSettingsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#301812,#050308_55%,#010102)] px-4 py-8 text-white">
      <MusicTransitionOverlay />
      <section className="mx-auto max-w-5xl space-y-5">
        <Link className="inline-flex rounded border border-white/10 bg-black/45 px-3 py-2 text-sm" href="/settings">Volver a ajustes</Link>
        <section className="rounded-lg border border-amber-100/18 bg-black/58 p-6">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-amber-100/65">mixer ceremonial</p>
          <h1 className="mt-2 text-5xl font-black uppercase">Ajustes de audio avanzado</h1>
          <p className="mt-3 text-white/65">Volumen por canal, subtitulos sonoros, rango dinamico reducido y eventos cinematicos de prueba.</p>
        </section>
        <section className="rounded-lg border border-white/10 bg-black/45 p-5">
          <VolumeSettings />
        </section>
        <StressAudioMeter />
        <CinematicAudioTrigger />
      </section>
    </main>
  );
}
