"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EntranceEffectId = "judicial" | "catartica" | "glitch" | "estres" | "silencio";

export type ProfileFavorites = {
  cardId?: string;
  bossId?: string;
  modeId?: string;
  titleId?: string;
  backgroundId?: string;
};

type ProfileState = {
  playerName: string;
  avatarId: string;
  borderId: string;
  backgroundId: string;
  auraId: string;
  petId: string;
  entranceEffectId: EntranceEffectId;
  showcasedAchievementIds: string[];
  favorites: ProfileFavorites;
  sharedProfileCode: string;
  setPlayerName: (name: string) => void;
  equipAvatar: (id: string) => void;
  equipBorder: (id: string) => void;
  equipBackground: (id: string) => void;
  equipAura: (id: string) => void;
  equipPet: (id: string) => void;
  equipEntranceEffect: (id: EntranceEffectId) => void;
  setFavorite: (key: keyof ProfileFavorites, value?: string) => void;
  toggleShowcaseAchievement: (id: string) => void;
  regenerateShareCode: () => void;
};

const makeShareCode = () => `TRIB-${Math.random().toString(36).slice(2, 7).toUpperCase()}-${Date.now().toString(36).slice(-4).toUpperCase()}`;

export const entranceEffects: { id: EntranceEffectId; name: string; description: string }[] = [
  { id: "judicial", name: "Entrada Judicial", description: "Sello gigante, martillazo y humo dorado." },
  { id: "catartica", name: "Entrada Catartica", description: "Explosion luminosa y cadenas rompiendose." },
  { id: "glitch", name: "Entrada Glitch", description: "Distorsion, estatica y texto corrupto." },
  { id: "estres", name: "Entrada del Estres", description: "Pantalla roja y respiraciones rapidas." },
  { id: "silencio", name: "Entrada del Silencio", description: "Niebla azul y sonido amortiguado." },
];

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      playerName: "Psiconauta en desacato",
      avatarId: "sobreviviente",
      borderId: "carbon-simple",
      backgroundId: "tribunal-craneo",
      auraId: "claridad",
      petId: "mini-juez",
      entranceEffectId: "judicial",
      showcasedAchievementIds: ["respirar-cuenta", "tribunal-sin-papel", "libre-protesta-achievement"],
      favorites: { bossId: "juez", modeId: "boss-rush", titleId: "funcionario-caos", backgroundId: "tribunal-craneo" },
      sharedProfileCode: makeShareCode(),

      setPlayerName: (playerName) => set({ playerName: playerName.slice(0, 40) || "Psiconauta en desacato" }),
      equipAvatar: (avatarId) => set({ avatarId }),
      equipBorder: (borderId) => set({ borderId }),
      equipBackground: (backgroundId) => set({ backgroundId, favorites: { backgroundId } }),
      equipAura: (auraId) => set({ auraId }),
      equipPet: (petId) => set({ petId }),
      equipEntranceEffect: (entranceEffectId) => set({ entranceEffectId }),
      setFavorite: (key, value) => set((state) => ({ favorites: { ...state.favorites, [key]: value } })),
      toggleShowcaseAchievement: (id) =>
        set((state) => ({
          showcasedAchievementIds: state.showcasedAchievementIds.includes(id)
            ? state.showcasedAchievementIds.filter((item) => item !== id)
            : [id, ...state.showcasedAchievementIds].slice(0, 6),
        })),
      regenerateShareCode: () => set({ sharedProfileCode: makeShareCode() }),
    }),
    {
      name: "saboteadores-profile-v1",
    },
  ),
);
