import type { FactionId } from "./factions";
import type { CollectibleRarity } from "./rarities";

export type PackId = "intrusivos" | "crisis-premium" | "tribunal" | "catarsis" | "maldito";

export type PackDefinition = {
  id: PackId;
  name: string;
  phrase: string;
  description: string;
  rarities: CollectibleRarity[];
  factions?: FactionId[];
  keywords?: string[];
  cardsPerPack: number;
  keyCost?: number;
};

export const packDefinitions: PackDefinition[] = [
  {
    id: "intrusivos",
    name: "Sobre de Pensamientos Intrusivos",
    phrase: "No pediste abrirlo. Se abrio solo.",
    description: "Comunes y raras que entran sin tocar.",
    rarities: ["comun", "rara"],
    cardsPerPack: 3,
  },
  {
    id: "crisis-premium",
    name: "Sobre de Crisis Premium",
    phrase: "Incluye ansiedad coleccionable.",
    description: "Raras, epicas y basura mental con moño.",
    rarities: ["rara", "epica", "comun"],
    cardsPerPack: 3,
  },
  {
    id: "tribunal",
    name: "Sobre del Tribunal",
    phrase: "Garantiza culpa. No garantiza aprendizaje.",
    description: "Cartas de El Juez, sentencias y cadenas.",
    rarities: ["rara", "epica", "legendaria"],
    factions: ["juez", "controlador"],
    keywords: ["Sentencia", "Cadena"],
    cardsPerPack: 3,
    keyCost: 1,
  },
  {
    id: "catarsis",
    name: "Sobre de Catarsis",
    phrase: "Rompe cadenas, pero con estilo.",
    description: "Conciencia, Trascendencia y luz teatral.",
    rarities: ["rara", "epica", "legendaria"],
    factions: ["conciencia", "trascendencia", "perfeccionista"],
    keywords: ["Despertar", "Catarsis"],
    cardsPerPack: 3,
  },
  {
    id: "maldito",
    name: "Sobre Maldito",
    phrase: "Legalmente no podemos recomendar esto.",
    description: "Poder excesivo, consecuencias incluidas.",
    rarities: ["maldita", "epica", "legendaria"],
    cardsPerPack: 3,
    keyCost: 1,
  },
];

export const getPack = (id: PackId) => packDefinitions.find((pack) => pack.id === id);
