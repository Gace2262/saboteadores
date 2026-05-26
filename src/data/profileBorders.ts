import type { CollectibleRarity } from "./rarities";

export type ProfileBorder = {
  id: string;
  name: string;
  rarity: CollectibleRarity;
  unlockCondition: string;
  visual: string;
  className: string;
};

export const profileBorders: ProfileBorder[] = [
  { id: "carbon-simple", name: "Marco Carbon", rarity: "comun", unlockCondition: "Disponible al iniciar.", visual: "metal oscuro simple", className: "border-zinc-500/35 shadow-[0_0_28px_rgba(0,0,0,0.45)]" },
  { id: "judicial", name: "Marco Judicial", rarity: "legendaria", unlockCondition: "Derrotar a El Juez.", visual: "oro ceremonial y martillos flotantes", className: "border-amber-100/55 shadow-[0_0_42px_rgba(242,211,123,0.35)]" },
  { id: "derrumbe", name: "Marco del Derrumbe", rarity: "epica", unlockCondition: "Acumular 500 Estres.", visual: "grietas, humo rojo y particulas cayendo", className: "border-rose-300/45 shadow-[0_0_42px_rgba(190,18,60,0.25)]" },
  { id: "catarsis", name: "Marco Catarsis", rarity: "legendaria", unlockCondition: "Usar Catarsis 100 veces.", visual: "luz viva y cadenas rotas", className: "border-white/70 shadow-[0_0_46px_rgba(255,255,255,0.28)]" },
  { id: "archivista", name: "Marco Archivista", rarity: "rara", unlockCondition: "Desbloquear todo el lore.", visual: "pergaminos y simbolos racionales", className: "border-cyan-200/45 shadow-[0_0_36px_rgba(125,211,252,0.22)]" },
  { id: "glitch-maldito", name: "Marco Glitch Maldito", rarity: "maldita", unlockCondition: "Completar Juicio Extremo.", visual: "corrupcion, estatica y letras rotas", className: "border-red-300/55 shadow-[0_0_46px_rgba(127,29,29,0.38)]" },
];

export const getProfileBorder = (id?: string) => profileBorders.find((border) => border.id === id) ?? profileBorders[0];
