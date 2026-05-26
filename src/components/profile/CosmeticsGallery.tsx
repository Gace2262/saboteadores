"use client";

import Link from "next/link";
import { cosmetics } from "@/data/cosmetics";
import { useProgressionStore } from "@/store/progressionStore";
import { CosmeticUnlockAnimation } from "./CosmeticUnlockAnimation";

export function CosmeticsGallery() {
  const unlocked = useProgressionStore((state) => state.unlockedCosmeticIds);
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <Link href="/profile" className="inline-flex rounded-md border border-white/12 bg-black/45 px-3 py-2 text-sm font-black uppercase text-white/70 hover:bg-white/10">
          Volver al perfil
        </Link>
        <header className="mt-4 rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Cosmeticos offline</p>
          <h1 className="mt-2 text-5xl font-black">Armario ceremonial del desastre</h1>
          <p className="mt-3 max-w-3xl text-white/62">Fondos, auras, mascotas, marcos, entradas y efectos. Nada monetizado: el unico precio es discutir con tu propio Tribunal.</p>
        </header>
        <div className="mt-5"><CosmeticUnlockAnimation label="Vista previa de desbloqueo ceremonial" /></div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cosmetics.map((cosmetic) => {
            const isUnlocked = unlocked.includes(cosmetic.id) || unlocked.includes(cosmetic.name.toLowerCase().replaceAll(" ", "-"));
            return (
              <article key={cosmetic.id} className={`rounded-lg border p-5 ${isUnlocked ? "border-amber-100/28 bg-amber-100/10" : "border-white/10 bg-black/48 opacity-80"}`}>
                <p className="text-xs font-black uppercase text-white/45">{cosmetic.kind} - {cosmetic.rarity}</p>
                <h2 className="mt-1 text-2xl font-black">{isUnlocked ? cosmetic.name : "???"}</h2>
                <p className="mt-3 text-sm text-white/60">{isUnlocked ? cosmetic.flavorText : "Bloqueado. El Tribunal lo cubrio con una manta legal."}</p>
                <p className="mt-4 rounded-md border border-white/10 bg-white/6 p-3 text-sm text-amber-100/70">{cosmetic.unlockSource}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
