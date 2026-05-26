"use client";

import { getProfileBackground } from "@/data/profileBackgrounds";
import { useProfileStore } from "@/store/profileStore";

export function ProfileBanner() {
  const background = getProfileBackground(useProfileStore((state) => state.backgroundId));
  const entrance = useProfileStore((state) => state.entranceEffectId);
  return (
    <section className={`relative overflow-hidden rounded-lg border border-amber-100/18 p-5 ${background.className}`}>
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative">
        <p className="text-xs font-black uppercase text-amber-100/65">Fondo interactivo equipado</p>
        <h2 className="mt-1 text-3xl font-black">{background.name}</h2>
        <p className="mt-2 text-white/62">{background.layers.join(" / ")}</p>
        <p className="mt-4 inline-flex rounded border border-white/12 bg-black/45 px-3 py-2 text-sm text-white/65">
          Entrada activa: {entrance}
        </p>
      </div>
    </section>
  );
}
