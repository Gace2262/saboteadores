"use client";

import { useBuildStore, type GraphicsPreset } from "@/store/buildStore";

const presets: { id: GraphicsPreset; name: string; description: string }[] = [
  { id: "minimal", name: "Minimal", description: "Bajo rendimiento, HUD limpio, pocos efectos." },
  { id: "balanced", name: "Balanced", description: "Preset recomendado para testers." },
  { id: "cinematic", name: "Cinematic", description: "Mas particulas, flashes moderados y escenas completas." },
  { id: "tribunal-insano", name: "Tribunal Insano", description: "Showcase teatral. Tu GPU presentara testimonio." },
];

export function GraphicsPresetSelector() {
  const { graphicsPreset, setGraphicsPreset, streamerMode, toggleStreamerMode, lowPerformanceMode, toggleLowPerformanceMode, screenshotMode, toggleScreenshotMode } = useBuildStore();
  return (
    <section className="rounded-lg border border-white/12 bg-black/52 p-5">
      <h2 className="text-3xl font-black">Presets graficos</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setGraphicsPreset(preset.id)}
            className={`rounded-lg border p-4 text-left transition ${graphicsPreset === preset.id ? "border-amber-100/50 bg-amber-100/12" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
          >
            <p className="text-xl font-black text-white">{preset.name}</p>
            <p className="mt-2 text-sm text-white/55">{preset.description}</p>
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-2">
        {[
          ["Modo streamer", streamerMode, toggleStreamerMode],
          ["Modo bajo rendimiento", lowPerformanceMode, toggleLowPerformanceMode],
          ["Screenshot mode", screenshotMode, toggleScreenshotMode],
        ].map(([label, active, toggle]) => (
          <button key={label as string} className="campaign-choice justify-between" onClick={toggle as () => void}>
            {label as string}
            <strong className={active ? "text-emerald-100" : "text-white/45"}>{active ? "ON" : "OFF"}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
