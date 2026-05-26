"use client";

import { useDemoStore } from "@/store/demoStore";

export function DemoRestartButton() {
  const resetDemo = useDemoStore((state) => state.resetDemo);
  return (
    <button type="button" onClick={resetDemo} className="campaign-choice max-w-xs">
      Reiniciar progreso demo
    </button>
  );
}
