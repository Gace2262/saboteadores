export type MentalWeather = "calma" | "ansiedad" | "juicio" | "corrupcion" | "catarsis" | "agotamiento";

export type TribunalAnomaly = {
  id: string;
  name: string;
  rarity: "rara" | "ultra-rara" | "secreta";
  weather: MentalWeather;
  description: string;
  line: string;
  streamerSafe: boolean;
};

export const tribunalAnomalies: TribunalAnomaly[] = [
  {
    id: "sala-vacia",
    name: "Sala vacia",
    rarity: "ultra-rara",
    weather: "agotamiento",
    description: "El menu queda silencioso, como si el tribunal hubiera salido a pensar en sus decisiones.",
    line: "La sala esta vacia. Sospechosamente vacia.",
    streamerSafe: true,
  },
  {
    id: "martillo-infinito",
    name: "Martillo infinito",
    rarity: "ultra-rara",
    weather: "juicio",
    description: "Un eco de martillo se repite durante unos segundos y luego se averguenza.",
    line: "El eco no encontro la salida.",
    streamerSafe: false,
  },
  {
    id: "carta-observadora",
    name: "Carta observadora",
    rarity: "rara",
    weather: "corrupcion",
    description: "Una carta parece inclinarse hacia el cursor con curiosidad teatral.",
    line: "No mires ahora. Bueno, ya miro.",
    streamerSafe: true,
  },
  {
    id: "error-emocional-404",
    name: "Error emocional 404",
    rarity: "secreta",
    weather: "corrupcion",
    description: "Una falsa pantalla de error se agrieta y revela que era solo ansiedad con tipografia.",
    line: "Error 404: calma no encontrada. Reintentando con dignidad.",
    streamerSafe: false,
  },
  {
    id: "silencio-responde",
    name: "El silencio responde",
    rarity: "ultra-rara",
    weather: "catarsis",
    description: "Todo sonido baja por un instante. El silencio toma decisiones ejecutivas.",
    line: "El silencio acaba de tomar decisiones ejecutivas.",
    streamerSafe: true,
  },
  {
    id: "tribunal-recuerda",
    name: "El Tribunal recuerda",
    rarity: "secreta",
    weather: "juicio",
    description: "Muestra una estadistica contextual del jugador como expediente ceremonial.",
    line: "El tribunal recuerda mas de lo que conviene a la dramaturgia.",
    streamerSafe: true,
  },
];
