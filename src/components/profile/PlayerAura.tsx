"use client";

import { getPlayerAura } from "@/data/playerAuras";
import { useProfileStore } from "@/store/profileStore";

export function PlayerAura({ children }: { children: React.ReactNode }) {
  const aura = getPlayerAura(useProfileStore((state) => state.auraId));
  return (
    <div className={`relative rounded-full ${aura.className} before:absolute before:inset-[-18px] before:rounded-full before:blur-2xl`}>
      {children}
    </div>
  );
}
