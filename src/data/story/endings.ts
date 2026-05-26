export type EndingId = "juicio-suspendido" | "libertad-protesta" | "nuevo-archivista" | "catarsis-brutal" | "condena-circular";

export type StoryEnding = {
  id: EndingId;
  title: string;
  condition: string;
  text: string;
  illustrationText: string;
};

export const storyEndings: Record<EndingId, StoryEnding> = {
  "juicio-suspendido": {
    id: "juicio-suspendido",
    title: "Juicio Suspendido",
    condition: "Derrotar a El Juez con Estres bajo.",
    text: "El martillo no cayo. No porque te absolviera, sino porque ya no necesitabas audiencia.",
    illustrationText: "Un martillo suspendido sobre una silla vacia. La silla, por primera vez, no espera a nadie.",
  },
  "libertad-protesta": {
    id: "libertad-protesta",
    title: "Libertad bajo protesta",
    condition: "Derrotar a El Juez con Estres alto.",
    text: "Ganaste. El tribunal apelara manana, por supuesto.",
    illustrationText: "Una cadena rota firma un recurso de apelacion con tinta temblorosa.",
  },
  "nuevo-archivista": {
    id: "nuevo-archivista",
    title: "El nuevo archivista",
    condition: "Usar muchas cartas Hiperracionales.",
    text: "No destruiste el tribunal. Lo ordenaste por carpetas.",
    illustrationText: "Archivadores infinitos, todos etiquetados: 'sentir, revisar luego'.",
  },
  "catarsis-brutal": {
    id: "catarsis-brutal",
    title: "Catarsis brutal",
    condition: "Ganar usando Catarsis.",
    text: "Las cadenas no se rompieron. Salieron despedidas con banda sonora.",
    illustrationText: "Un coro dorado levantando polvo de metal emocional.",
  },
  "condena-circular": {
    id: "condena-circular",
    title: "Condena circular",
    condition: "Perder contra El Juez.",
    text: "El Juez no vencio. Solo encontro eco.",
    illustrationText: "Un tribunal vacio repite la misma frase hasta cansarse de si mismo.",
  },
};

export function chooseEnding(input: { won: boolean; stress: number; usedCatarsis?: boolean; hiperrationalCards?: number }): StoryEnding {
  if (!input.won) return storyEndings["condena-circular"];
  if (input.usedCatarsis) return storyEndings["catarsis-brutal"];
  if ((input.hiperrationalCards ?? 0) >= 4) return storyEndings["nuevo-archivista"];
  if (input.stress >= 7) return storyEndings["libertad-protesta"];
  return storyEndings["juicio-suspendido"];
}
