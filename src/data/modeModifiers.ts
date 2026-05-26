export type MutantModifier = {
  id: string;
  name: string;
  type: "visual" | "mecanico" | "narrativo" | "sonoro" | "psicologico";
  effect: string;
  flavorText: string;
};

export const mutantModifiers: MutantModifier[] = [
  { id: "cartas-gigantes", name: "Cartas gigantes", type: "visual", effect: "Las cartas importantes ocupan medio tribunal.", flavorText: "La sutileza fue archivada por cobardia." },
  { id: "mano-invertida", name: "Mano invertida", type: "mecanico", effect: "La mano se ordena al reves cada turno.", flavorText: "Tu estrategia hizo una voltereta y pidio baja medica." },
  { id: "costos-ocultos", name: "Costos ocultos", type: "psicologico", effect: "Algunas cartas revelan costo al jugarse.", flavorText: "Como toda decision adulta, venia con letra chica." },
  { id: "estres-explosivo", name: "Estres explosivo", type: "mecanico", effect: "Al llegar a 10 Estres ocurre un pulso de dano.", flavorText: "El cortisol eligio fuegos artificiales." },
  { id: "martillo-aleatorio", name: "Martillo aleatorio", type: "sonoro", effect: "Un mini martillazo cae sin pedir audiencia.", flavorText: "El juez encontro el boton de repetir." },
  { id: "modo-silencioso", name: "Modo silencioso", type: "sonoro", effect: "Se apagan voces y quedan subtitulos dramaticos.", flavorText: "El silencio pidio protagonismo y lo consiguio." },
  { id: "camara-inestable", name: "Camara inestable", type: "visual", effect: "El tablero respira y vibra con ansiedad teatral.", flavorText: "El director de fotografia era el Hipervigilante." },
  { id: "keywords-duplicadas", name: "Keywords duplicadas", type: "mecanico", effect: "La primera keyword jugada se repite.", flavorText: "El eco mental ya cobra regalías." },
];
