"use client";

import { Sparkles } from "lucide-react";
import { useProgressionStore } from "@/store/progressionStore";

const cosmeticLabels: Record<string, string> = {
  "borde-carbon": "Borde carbon ceremonial",
  "sello-dual": "Sello dual Juez/Conciencia",
  "fondo-tribunal-nocturno": "Fondo Tribunal Nocturno",
  "cursed-static-border": "Borde de estatica maldita",
  "fondo-catarsis-coral": "Fondo Catarsis Coral",
  "borde-judicial": "Borde judicial",
  "icono-respiracion": "Icono Respirar tambien cuenta",
  "tema-azul-frio": "Tema azul frio",
  "particulas-teatrales": "Particulas teatrales",
  "marco-legendario-animado": "Marco legendario animado",
  "cadenas-premium": "Cadenas premium",
  "aura-silencio": "Aura del silencio",
};

export function UnlockedCosmetics() {
  const { unlockedCosmeticIds: cosmetics, rewardVault } = useProgressionStore();
  return (
    <section className="rounded-lg border border-violet-100/15 bg-black/48 p-5">
      <p className="text-sm font-black uppercase text-violet-100/65">Recompensas cosmeticas</p>
      <h2 className="mt-1 text-3xl font-black">Armario del desastre elegante</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {cosmetics.map((cosmetic) => (
          <div key={cosmetic} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/6 p-3">
            <Sparkles className="text-amber-100" size={20} />
            <span className="font-black text-white/80">{cosmeticLabels[cosmetic] ?? cosmetic.replaceAll("-", " ")}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-md border border-amber-100/14 bg-amber-100/8 p-4">
        <p className="text-xs font-black uppercase text-amber-100/65">Boveda de recompensas</p>
        <div className="mt-3 grid gap-2 text-sm text-white/65 md:grid-cols-4">
          <span>Fragmentos: <strong className="text-amber-100">{rewardVault.clarityFragments}</strong></span>
          <span>Sobres: <strong className="text-amber-100">{rewardVault.packs.length}</strong></span>
          <span>Cartas: <strong className="text-amber-100">{rewardVault.cards.length}</strong></span>
          <span>Efectos: <strong className="text-amber-100">{rewardVault.effects.length}</strong></span>
        </div>
      </div>
    </section>
  );
}
