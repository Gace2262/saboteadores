"use client";

import Link from "next/link";
import { getAvatar } from "@/data/avatars";
import { useProfileStore } from "@/store/profileStore";
import { AnimatedAvatar } from "./AnimatedAvatar";
import { ProfileBanner } from "./ProfileBanner";
import { TitleDisplay } from "./TitleDisplay";

export function ProfileHeader() {
  const { playerName, setPlayerName, avatarId, sharedProfileCode, regenerateShareCode } = useProfileStore();
  const avatar = getAvatar(avatarId);
  return (
    <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[340px_1fr]">
      <div className="rounded-lg border border-amber-100/18 bg-black/58 p-6">
        <div className="flex justify-center">
          <AnimatedAvatar />
        </div>
        <label className="mt-6 grid gap-2 text-xs font-black uppercase text-white/55">
          Nombre del expediente
          <input value={playerName} onChange={(event) => setPlayerName(event.target.value)} className="min-h-11 rounded-md border border-white/10 bg-zinc-950 px-3 text-base text-white" />
        </label>
        <div className="mt-4">
          <TitleDisplay />
        </div>
        <p className="mt-4 text-sm leading-6 text-white/60">{avatar.visual}</p>
      </div>
      <div className="grid gap-5">
        <div className="rounded-lg border border-amber-100/18 bg-black/58 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Expediente psicologico legendario</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">{playerName}</h1>
          <p className="mt-3 max-w-3xl text-white/64">
            Grimorio digital, ficha criminal emocional y tarjeta de presentacion de villano interior. El Tribunal lo llama perfil; marketing lo llama problema.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/profile/customize" className="campaign-action">Personalizar</Link>
            <Link href="/profile/showcase" className="campaign-choice max-w-xs">Ver vitrina</Link>
            <button onClick={regenerateShareCode} className="campaign-choice max-w-xs">Codigo: {sharedProfileCode}</button>
          </div>
        </div>
        <ProfileBanner />
      </div>
    </section>
  );
}
