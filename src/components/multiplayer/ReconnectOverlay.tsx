"use client";

import { reconnectMessages } from "@/logic/multiplayer/reconnectManager";

export function ReconnectOverlay({ visible }: { visible?: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-5 text-white">
      <div className="max-w-lg rounded-lg border border-amber-100/25 bg-zinc-950 p-6 text-center">
        <h2 className="text-4xl font-black">{reconnectMessages.lost}</h2>
        <p className="mt-3 text-white/65">{reconnectMessages.trying}</p>
      </div>
    </div>
  );
}
