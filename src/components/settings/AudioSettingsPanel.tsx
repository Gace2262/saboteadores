"use client";

import { Volume2 } from "lucide-react";
import { VolumeSettings } from "@/components/audio/VolumeSettings";
import { useAudioStore } from "@/store/audioStore";

export function AudioSettingsPanel() {
  const { enabled, toggleEnabled, currentTheme, activeLayers, bpm, battleIntensity } = useAudioStore();
  return (
    <section className="rounded-lg border border-amber-100/14 bg-black/52 p-5">
      <div className="flex items-center gap-3">
        <Volume2 className="text-amber-100" />
        <div>
          <p className="text-xs font-black uppercase text-amber-100/60">Sistema audiovisual</p>
          <h2 className="text-2xl font-black">Mezcla del Tribunal</h2>
        </div>
      </div>
      <button className="campaign-action mt-4" onClick={toggleEnabled}>
        Audio global: {enabled ? "activado" : "silenciado"}
      </button>
      <div className="mt-5">
        <VolumeSettings />
      </div>
      <div className="mt-5 rounded-md border border-white/10 bg-white/6 p-4 text-sm text-white/62">
        <p>Tema actual: <strong className="text-white">{currentTheme}</strong></p>
        <p>BPM dinamico: <strong className="text-white">{bpm}</strong></p>
        <p>Intensidad: <strong className="text-white">{battleIntensity}</strong></p>
        <p>Capas activas: <strong className="text-white">{activeLayers.join(", ")}</strong></p>
      </div>
    </section>
  );
}
