export const workshopCategories = [
  { id: "seed", label: "Seeds malditas", description: "Mapas reproducibles para compartir desgracias con precision." },
  { id: "run", label: "Runs legendarias", description: "Rutas, decisiones y replays resumidos." },
  { id: "campaign", label: "Campanas", description: "Expedientes completos con eventos y bosses." },
  { id: "boss", label: "Bosses", description: "Mecanismos mayores con toga propia." },
  { id: "card_pack", label: "Packs de cartas", description: "Cartas comunitarias validadas por el Archivo." },
  { id: "expansion", label: "Expansiones", description: "Contenido grande para arruinar el calendario." },
  { id: "rules", label: "Reglas custom", description: "Variantes limitadas y seguras." },
  { id: "challenge", label: "Desafios", description: "Juicios absurdos con condiciones claras." },
] as const;

export type WorkshopCategoryId = (typeof workshopCategories)[number]["id"];
