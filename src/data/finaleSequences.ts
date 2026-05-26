export type FinaleId = "romper-martillo" | "abandonar-tribunal" | "tomar-lugar" | "liberar-saboteadores" | "reiniciar-juicio";

export type FinaleSequence = {
  id: FinaleId;
  title: string;
  optionText: string;
  visual: string[];
  narrator: string;
  unlocks: string[];
  music: string;
  mood: "liberacion" | "ambigua" | "oscura" | "rebelion" | "circular";
};

export const finaleSequences: FinaleSequence[] = [
  {
    id: "romper-martillo",
    title: "Romper el Martillo",
    optionText: "Romper el martillo",
    visual: ["el martillo se quiebra", "las cadenas caen", "luz blanca invade el tribunal"],
    narrator: "La sentencia termino cuando dejaste de necesitarla.",
    unlocks: ["Marco Martillo Roto", "Titulo La audiencia termino"],
    music: "coro triunfal, metal lento y respiracion tranquila",
    mood: "liberacion",
  },
  {
    id: "abandonar-tribunal",
    title: "Abandonar el Tribunal",
    optionText: "Abandonar el tribunal",
    visual: ["la puerta aparece donde antes habia veredicto", "los sellos se apagan", "el ojo dorado mira sin poder seguirte"],
    narrator: "No ganaste el juicio. Te fuiste antes de que aprendiera tu nombre completo.",
    unlocks: ["Fondo Pasillo de Catarsis", "Titulo Libre bajo protesta"],
    music: "piano calido, cadenas lejanas y silencio limpio",
    mood: "ambigua",
  },
  {
    id: "tomar-lugar",
    title: "Tomar el Lugar del Juez",
    optionText: "Tomar el lugar del Juez",
    visual: ["el jugador ocupa el trono", "el ojo dorado se abre detras", "cadenas nuevas se arrastran hacia la mesa"],
    narrator: "El tribunal nunca quedo vacio. Solo cambio de voz.",
    unlocks: ["Avatar Juez Interior", "Aura Tribunal Abisal"],
    music: "organo grave, coro invertido y martillo distante",
    mood: "oscura",
  },
  {
    id: "liberar-saboteadores",
    title: "Liberar a los Saboteadores",
    optionText: "Liberar a los Saboteadores",
    visual: ["las cartas se levantan", "los antiguos guardianes abandonan sus mascaras", "el escenario se llena de fuego dorado"],
    narrator: "No nacieron para obedecer. Tampoco para mandar. Por primera vez, aprendieron a escuchar.",
    unlocks: ["Cosmetico Rebelion de las Cartas", "Carta Las cadenas aprendieron miedo"],
    music: "coro ascendente, guitarras brillantes y cadenas rompiendose",
    mood: "rebelion",
  },
  {
    id: "reiniciar-juicio",
    title: "Reiniciar el Juicio",
    optionText: "Reiniciar el juicio",
    visual: ["el sello vuelve a cerrarse", "las luces retroceden", "el martillo se reconstruye con verguenza reciclada"],
    narrator: "El bucle firmo asistencia. Esta vez, al menos, trajo cafe.",
    unlocks: ["Desafio Condena Circular", "Titulo Error de sistema emocional"],
    music: "latido lento, estatico mental y campana judicial",
    mood: "circular",
  },
];

export const getFinaleSequence = (id?: string) => finaleSequences.find((item) => item.id === id) ?? finaleSequences[0];
