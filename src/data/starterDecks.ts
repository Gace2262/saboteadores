import type { FactionId } from "./factions";

export type StarterDeckDefinition = {
  id: string;
  name: string;
  factions: [FactionId, FactionId];
  cardIds: string[];
};

export const starterDecks: StarterDeckDefinition[] = [
  {
    id: "oficina-control",
    name: "Oficina del Control",
    factions: ["controlador", "perfeccionista"],
    cardIds: ["controlador-compulsivo", "cadena-favores-eternos", "manual-no-sentir", "funeral-plan-b", "autoestima-con-casco"],
  },
  {
    id: "circo-pendientes",
    name: "Circo de Pendientes",
    factions: ["inquieto", "hipervigilante"],
    cardIds: ["caballos-drama", "caballeria-pendientes", "repeticion-desastre", "productividad-necromante"],
  },
  {
    id: "manual-no-pasa-nada",
    name: "Manual del No Me Pasa Nada",
    factions: ["reservado", "evitador"],
    cardIds: ["capa-no-me-pasa-nada", "autoengano-deluxe", "manual-no-sentir", "casco-autoestima"],
  },
];
