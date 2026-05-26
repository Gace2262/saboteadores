"use client";

import { advancedAudioTracks } from "@/data/audioTracks";
import { audioEngine } from "@/logic/audio/audioEngine";

export function BossMusicController() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4 text-white">
      <h2 className="text-2xl font-black uppercase">Boss music controller</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {Object.values(advancedAudioTracks).filter((track) => track.bossFaction).map((track) => (
          <button
            key={track.id}
            className="rounded-lg border border-amber-100/15 bg-white/5 p-4 text-left transition hover:border-amber-100/55"
            onClick={() => {
              void audioEngine.unlock();
              audioEngine.update({ stress: 6, corruption: 35, bossFaction: track.bossFaction, bossPhase: 2, cinematicState: "boss_intro", playerHealthPercent: 0.65, tribunalAttention: 70 });
            }}
          >
            <h3 className="text-xl font-black">{track.title}</h3>
            <p className="mt-1 text-sm text-white/60">{track.style}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-amber-100/60">{track.leitmotif}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
