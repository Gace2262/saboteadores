"use client";

import { advancedVoiceLines } from "@/data/voiceLines";
import { processVoiceLine } from "@/logic/audio/voiceProcessor";
import { useAudioStore } from "@/store/audioStore";

export function VoiceLinePlayer() {
  const pushSubtitle = useAudioStore((state) => state.pushSubtitle);
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4 text-white">
      <h2 className="text-2xl font-black uppercase">Voces procesadas</h2>
      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {advancedVoiceLines.map((line) => {
          const processed = processVoiceLine(line);
          return (
            <button key={line.id} className="rounded border border-white/10 bg-white/5 p-3 text-left hover:border-amber-100/45" onClick={() => pushSubtitle(`[VOZ] ${processed.text}`)}>
              <strong>{line.actor}</strong>
              <span className="mt-1 block text-sm text-white/65">{line.text}</span>
              <span className="mt-2 block text-xs text-amber-100/60">pitch {processed.pitch} · distortion {processed.distortion}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
