import type { FactionId } from "@/data/factions";

export type CharacterVoice = {
  id: string;
  name: string;
  tone: string;
  cadence: string;
  color: string;
};

export const characterVoices: Partial<Record<FactionId | "narrador" | "claridad", CharacterVoice>> = {
  narrador: { id: "narrador", name: "Narrador", tone: "oscuro con humor seco", cadence: "frases cortas, filo teatral", color: "#f2d37b" },
  claridad: { id: "claridad", name: "Claridad", tone: "serena, ironica y firme", cadence: "pausas limpias", color: "#7fffd4" },
  juez: { id: "juez", name: "El Juez", tone: "judicial apocaliptico", cadence: "sentencias solemnes con veneno", color: "#f2d37b" },
  controlador: { id: "controlador", name: "Controlador", tone: "administrativo y tenso", cadence: "ordenes precisas", color: "#d7a74f" },
  perfeccionista: { id: "perfeccionista", name: "Perfeccionista", tone: "elegante y cruel", cadence: "correcciones impecables", color: "#fff2a8" },
  inquieto: { id: "inquieto", name: "Inquieto", tone: "rapido y caotico", cadence: "frases que tropiezan con otras frases", color: "#9f5cff" },
  reservado: { id: "reservado", name: "Reservado", tone: "bajo y contenido", cadence: "silencios largos", color: "#8d8294" },
};
