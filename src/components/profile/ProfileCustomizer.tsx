"use client";

import Link from "next/link";
import { playerAvatars } from "@/data/avatars";
import { profileBackgrounds } from "@/data/profileBackgrounds";
import { profileBorders } from "@/data/profileBorders";
import { playerAuras } from "@/data/playerAuras";
import { mentalPets } from "@/data/mentalPets";
import { entranceEffects, useProfileStore, type EntranceEffectId } from "@/store/profileStore";
import { AnimatedAvatar } from "./AnimatedAvatar";
import { ProfileBackground } from "./ProfileBackground";

export function ProfileCustomizer() {
  const store = useProfileStore();
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <ProfileBackground />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <Link href="/profile" className="inline-flex rounded-md border border-white/12 bg-black/45 px-3 py-2 text-sm font-black uppercase text-white/70 hover:bg-white/10">
          Volver al expediente
        </Link>
        <header className="mt-4 grid gap-5 rounded-lg border border-amber-100/18 bg-black/62 p-6 lg:grid-cols-[220px_1fr]">
          <AnimatedAvatar />
          <div>
            <p className="text-sm font-black uppercase text-amber-100/65">Personalizacion visual ceremonial</p>
            <h1 className="mt-2 text-5xl font-black">Altar psicologico editable</h1>
            <p className="mt-3 max-w-3xl text-white/62">Equipa avatar, fondo, marco, aura, mascota y entrada. Nada se compra; todo se desbloquea sobreviviendo a tu propia direccion artistica.</p>
          </div>
        </header>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Picker title="Avatares animados" items={playerAvatars} active={store.avatarId} onPick={store.equipAvatar} />
          <Picker title="Marcos de perfil" items={profileBorders} active={store.borderId} onPick={store.equipBorder} />
          <Picker title="Fondos interactivos" items={profileBackgrounds} active={store.backgroundId} onPick={store.equipBackground} />
          <Picker title="Auras equipables" items={playerAuras} active={store.auraId} onPick={store.equipAura} />
          <Picker title="Mascotas mentales" items={mentalPets} active={store.petId} onPick={store.equipPet} />
          <section className="rounded-lg border border-white/12 bg-black/52 p-5">
            <h2 className="text-3xl font-black">Efectos de entrada</h2>
            <div className="mt-4 grid gap-3">
              {entranceEffects.map((effect) => (
                <button key={effect.id} onClick={() => store.equipEntranceEffect(effect.id as EntranceEffectId)} className={`rounded-md border p-3 text-left ${store.entranceEffectId === effect.id ? "border-amber-100/45 bg-amber-100/14" : "border-white/10 bg-white/6"}`}>
                  <span className="font-black">{effect.name}</span>
                  <span className="mt-1 block text-sm text-white/55">{effect.description}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Picker({
  title,
  items,
  active,
  onPick,
}: {
  title: string;
  items: Array<{ id: string; name: string; unlockCondition: string; visual?: string; behavior?: string }>;
  active: string;
  onPick: (id: string) => void;
}) {
  return (
    <section className="rounded-lg border border-white/12 bg-black/52 p-5">
      <h2 className="text-3xl font-black">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <button key={item.id} onClick={() => onPick(item.id)} className={`rounded-md border p-3 text-left transition ${active === item.id ? "border-amber-100/50 bg-amber-100/14" : "border-white/10 bg-white/6 hover:bg-white/10"}`}>
            <span className="font-black">{item.name}</span>
            <span className="mt-1 block text-sm text-white/55">{item.visual ?? item.behavior ?? item.unlockCondition}</span>
            <span className="mt-2 block text-xs font-black uppercase text-amber-100/55">{item.unlockCondition}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
