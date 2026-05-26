"use client";

import Link from "next/link";
import { AchievementShowcase } from "./AchievementShowcase";
import { AnimatedAvatar } from "./AnimatedAvatar";
import { FavoriteDeckPanel } from "./FavoriteDeckPanel";
import { MentalPetDisplay } from "./MentalPetDisplay";
import { PlayerStatsCard } from "./PlayerStatsCard";
import { ProfileBackground } from "./ProfileBackground";
import { ProfileBanner } from "./ProfileBanner";

export function ProfileShowcase() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <ProfileBackground />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <Link href="/profile" className="inline-flex rounded-md border border-white/12 bg-black/45 px-3 py-2 text-sm font-black uppercase text-white/70 hover:bg-white/10">
          Volver al perfil
        </Link>
        <header className="mt-4 rounded-lg border border-amber-100/18 bg-black/62 p-6 text-center">
          <div className="flex justify-center"><AnimatedAvatar /></div>
          <p className="mt-6 text-sm font-black uppercase text-amber-100/65">Vitrina publica experimental</p>
          <h1 className="mt-2 text-5xl font-black">Cartel de villano interior</h1>
          <p className="mx-auto mt-3 max-w-3xl text-white/62">Una version compartible del expediente, lista para futura sincronizacion online y codigos de perfil.</p>
        </header>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <ProfileBanner />
          <MentalPetDisplay />
          <AchievementShowcase />
          <FavoriteDeckPanel />
          <div className="lg:col-span-2"><PlayerStatsCard /></div>
        </div>
      </section>
    </main>
  );
}
