export type DemoDeckId = "oficina-control" | "circo-pendientes" | "manual-no-me-pasa";

export type DemoDeck = {
  id: DemoDeckId;
  name: string;
  factions: string;
  difficulty: "Baja" | "Media" | "Alta";
  style: string;
  keyCards: string[];
  quote: string;
  visual: string;
};

export const demoDecks: DemoDeck[] = [
  {
    id: "oficina-control",
    name: "Oficina del Control",
    factions: "Controlador + Perfeccionista",
    difficulty: "Media",
    style: "Bloqueo, precision y castigo.",
    keyCards: ["Controlador compulsivo", "Sentencia express", "Excel de culpa"],
    quote: "Nada esta bajo control, pero el formulario se ve precioso.",
    visual: "cadenas doradas y regla milimetrica",
  },
  {
    id: "circo-pendientes",
    name: "Circo de Pendientes",
    factions: "Inquieto + Hipervigilante",
    difficulty: "Alta",
    style: "Velocidad, robo y caos.",
    keyCards: ["Caballeria de pendientes", "Caballos del drama", "Repeticion del desastre"],
    quote: "No sabemos que viene, pero ya corrimos en circulos.",
    visual: "ondas rojas y humo rapido",
  },
  {
    id: "manual-no-me-pasa",
    name: "Manual del No Me Pasa Nada",
    factions: "Reservado + Evitador",
    difficulty: "Baja",
    style: "Defensa, evasion y presion lenta.",
    keyCards: ["Capa de no me pasa nada", "Manual para no sentir", "Casco de autoestima"],
    quote: "Estoy bien. Solo hay humo saliendo del alma.",
    visual: "niebla azul, puertas cerradas y silencio blindado",
  },
];
