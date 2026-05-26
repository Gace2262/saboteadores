"use client";

import { getMixerSnapshot } from "@/logic/audio/audioMixer";
import { soundtrackController } from "@/logic/audio/soundtrackController";
import { useAudioStore } from "@/store/audioStore";

export function AudioDebugPanel() {
  const state = useAudioStore();
  const mixer = getMixerSnapshot();
  const soundtrack = soundtrackController.getSnapshot();
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1f1328,#050308_55%,#010102)] px-4 py-8 text-white">
      <section className="mx-auto max-w-7xl space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-violet-200/70">audio debug</p>
          <h1 className="mt-2 text-5xl font-black uppercase">El Tribunal escucha sus propios cables</h1>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-lg border border-white/10 bg-black/45 p-4">Track: {soundtrack.currentTheme ?? state.currentTheme}</div>
          <div className="rounded-lg border border-white/10 bg-black/45 p-4">Capas: {soundtrack.activeLayers.join(", ") || state.advancedLayers.join(", ")}</div>
          <div className="rounded-lg border border-white/10 bg-black/45 p-4">Intensidad: {Math.round(soundtrack.intensity * 100)}</div>
          <div className="rounded-lg border border-white/10 bg-black/45 p-4">BPM: {state.bpm}</div>
        </div>
        <pre className="max-h-96 overflow-auto rounded-lg border border-white/10 bg-black/65 p-4 text-xs text-white/65">
          {JSON.stringify(
            {
              soundtrack,
              mixer,
              subtitles: state.subtitles,
              flags: {
                streamerSafe: state.streamerSafe,
                reducedDynamicRange: state.reducedDynamicRange,
                noDistortion: state.noDistortion,
                whispersEnabled: state.whispersEnabled,
                tinnitusEnabled: state.tinnitusEnabled,
              },
            },
            null,
            2,
          )}
        </pre>
      </section>
    </main>
  );
}
