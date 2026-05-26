"use client";

import { useAudioStore } from "@/store/audioStore";

export function VisualIntensitySlider() {
  const { visualIntensity, setVisualIntensity } = useAudioStore();
  return (
    <label className="grid gap-2">
      <span className="flex justify-between text-xs font-black uppercase text-white/55">
        Intensidad visual audiovisual
        <strong className="text-amber-100">{Math.round(visualIntensity * 100)}%</strong>
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={visualIntensity}
        onChange={(event) => setVisualIntensity(Number(event.target.value))}
        className="w-full accent-rose-300"
      />
    </label>
  );
}
