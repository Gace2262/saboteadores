"use client";

import { useEffect } from "react";
import { useBuildStore } from "@/store/buildStore";

export function PerformanceMonitor() {
  const { detectedPerformance, updatePerformance, graphicsPreset } = useBuildStore();

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    let raf = 0;
    const tick = () => {
      frame += 1;
      const now = performance.now();
      if (now - last >= 1000) {
        updatePerformance({
          fps: Math.max(1, Math.round((frame * 1000) / (now - last))),
          particles: graphicsPreset === "tribunal-insano" ? 120 : graphicsPreset === "cinematic" ? 80 : graphicsPreset === "minimal" ? 12 : 42,
          audioLayers: graphicsPreset === "minimal" ? 2 : graphicsPreset === "tribunal-insano" ? 8 : 4,
          visualMemory: graphicsPreset === "tribunal-insano" ? 74 : graphicsPreset === "cinematic" ? 58 : graphicsPreset === "minimal" ? 18 : 38,
        });
        frame = 0;
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [graphicsPreset, updatePerformance]);

  return (
    <section className="rounded-lg border border-cyan-100/15 bg-black/52 p-5">
      <h2 className="text-3xl font-black">Performance Monitor</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {[
          ["FPS", detectedPerformance.fps],
          ["Particulas", detectedPerformance.particles],
          ["Audio layers", detectedPerformance.audioLayers],
          ["Cinematicas", detectedPerformance.activeCinematics],
          ["Memoria visual", `${detectedPerformance.visualMemory}%`],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded border border-white/10 bg-white/5 p-3">
            <p className="text-xs font-black uppercase text-white/45">{label as string}</p>
            <p className="mt-1 text-2xl font-black text-cyan-100">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
