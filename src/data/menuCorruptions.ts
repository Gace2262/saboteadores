export type MenuCorruption = {
  id: string;
  original: string;
  corrupted: string;
  intensity: number;
  flavorText: string;
};

export const menuCorruptions: MenuCorruption[] = [
  {
    id: "deck-builder-defense",
    original: "Constructor",
    corrupted: "Constructor de mecanismos defensivos",
    intensity: 34,
    flavorText: "El mazo insistio en llamarlo supervivencia.",
  },
  {
    id: "settings-collapse",
    original: "Ajustes audio",
    corrupted: "Parametros del colapso",
    intensity: 42,
    flavorText: "Cambiar volumen no cambio la culpa, pero ayudo.",
  },
  {
    id: "collection-evidence",
    original: "Coleccion",
    corrupted: "Evidencias plastificadas",
    intensity: 30,
    flavorText: "El album entro como prueba documental.",
  },
  {
    id: "profile-casefile",
    original: "Perfil",
    corrupted: "Expediente emocional",
    intensity: 28,
    flavorText: "La vanidad pidio abogado.",
  },
  {
    id: "battle-appeal",
    original: "Elegir facciones",
    corrupted: "Presentar apelacion interna",
    intensity: 46,
    flavorText: "El tribunal odia cuando te organizas.",
  },
];

export const getCorruptionForLabel = (label: string) => menuCorruptions.find((item) => item.original === label);
