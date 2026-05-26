import Link from "next/link";
import { AdaptiveChoirLayer } from "@/components/audio/AdaptiveChoirLayer";
import { AmbientSoundscape } from "@/components/audio/AmbientSoundscape";
import { BossMusicController } from "@/components/audio/BossMusicController";
import { CinematicAudioTrigger } from "@/components/audio/CinematicAudioTrigger";
import { DynamicMusicLayer } from "@/components/audio/DynamicMusicLayer";
import { MusicTransitionOverlay } from "@/components/audio/MusicTransitionOverlay";
import { StressAudioMeter } from "@/components/audio/StressAudioMeter";
import { VoiceLinePlayer } from "@/components/audio/VoiceLinePlayer";

export default function AudioPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#21101f,#050308_55%,#010102)] px-4 py-8 text-white">
      <MusicTransitionOverlay />
      <section className="mx-auto max-w-7xl space-y-5">
        <nav className="flex flex-wrap gap-2 text-sm">
          <Link className="rounded border border-white/10 bg-black/45 px-3 py-2" href="/settings/audio">Ajustes audio</Link>
          <Link className="rounded border border-white/10 bg-black/45 px-3 py-2" href="/audio/debug">Debug</Link>
          <Link className="rounded border border-white/10 bg-black/45 px-3 py-2" href="/">Inicio</Link>
        </nav>
        <header className="rounded-lg border border-amber-100/18 bg-black/58 p-6">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-amber-100/65">sistema sonoro vivo</p>
          <h1 className="mt-2 text-5xl font-black uppercase md:text-7xl">El Tribunal respira contigo</h1>
          <p className="mt-3 max-w-3xl text-white/65">Musica adaptativa, coros judiciales, ambientes psicologicos, voces procesadas y silencios usados como martillo narrativo.</p>
        </header>
        <StressAudioMeter />
        <DynamicMusicLayer />
        <AdaptiveChoirLayer />
        <BossMusicController />
        <CinematicAudioTrigger />
        <AmbientSoundscape />
        <VoiceLinePlayer />
      </section>
    </main>
  );
}
