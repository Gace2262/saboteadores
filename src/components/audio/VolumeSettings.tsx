"use client";

import { useAudioStore } from "@/store/audioStore";

const volumeFields = [
  ["masterVolume", "General"],
  ["musicVolume", "Musica"],
  ["voiceVolume", "Voces"],
  ["effectsVolume", "Efectos"],
  ["ambienceVolume", "Ambiente"],
  ["cinematicVolume", "Cinematico"],
  ["uiVolume", "UI"],
  ["corruptionVolume", "Corrupcion"],
  ["choirVolume", "Coro"],
] as const;

export function VolumeSettings() {
  const state = useAudioStore();
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 rounded-lg border border-white/10 bg-black/35 p-4 md:grid-cols-2">
        {([
          ["streamerSafe", "Modo streamer safe"],
          ["reducedDynamicRange", "Rango dinamico reducido"],
          ["subtitlesEnabled", "Subtitulos sonoros"],
          ["whispersEnabled", "Susurros del Tribunal"],
        ] as const).map(([flag, label]) => (
          <label key={flag} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-white/75">
            {label}
            <input type="checkbox" checked={state[flag]} onChange={() => state.toggleFlag(flag)} className="h-4 w-4 accent-amber-200" />
          </label>
        ))}
      </div>
      {volumeFields.map(([key, label]) => (
        <label key={key} className="grid gap-2">
          <span className="flex justify-between text-xs font-black uppercase text-white/55">
            {label}
            <strong className="text-amber-100">{Math.round(state[key] * 100)}%</strong>
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={state[key]}
            onChange={(event) => state.setVolume(key, Number(event.target.value))}
            className="w-full accent-amber-200"
          />
        </label>
      ))}
    </div>
  );
}
