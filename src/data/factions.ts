export type FactionId =
  | "controlador"
  | "inquieto"
  | "perfeccionista"
  | "juez"
  | "complaciente"
  | "hiperracional"
  | "reservado"
  | "evitador"
  | "trascendencia"
  | "hipervigilante"
  | "victima"
  | "conciencia";

export type Faction = {
  id: FactionId;
  name: string;
  nameKey: string;
  thesis: string;
  descriptionKey: string;
  doctrine: string;
  taglineKey: string;
  color: string;
  accent: string;
  sigil: string;
};

const factionKeys = (id: FactionId) => ({
  nameKey: `factions.${id}.name`,
  descriptionKey: `factions.${id}.description`,
  taglineKey: `factions.${id}.tagline`,
});

export const factions: Faction[] = [
  {
    id: "controlador",
    ...factionKeys("controlador"),
    name: "Controlador",
    thesis: "Orden, metodo y un plan B para el plan B.",
    doctrine: "Bloquea, reduce opciones y llama a eso paz mental.",
    color: "#d7a74f",
    accent: "#fff0a6",
    sigil: "C",
  },
  {
    id: "inquieto",
    ...factionKeys("inquieto"),
    name: "Inquieto",
    thesis: "Si algo puede esperar, igual lo convierte en emergencia.",
    doctrine: "Presion, velocidad y crisis con solos de bateria.",
    color: "#9f5cff",
    accent: "#f0b4ff",
    sigil: "I",
  },
  {
    id: "perfeccionista",
    ...factionKeys("perfeccionista"),
    name: "Perfeccionista",
    thesis: "La excelencia como excusa elegante para no descansar jamas.",
    doctrine: "Dano alto, coste interno alto y cero aplausos suficientes.",
    color: "#f2d37b",
    accent: "#fbfff1",
    sigil: "P",
  },
];

export const allFactions: Faction[] = [
  ...factions,
  {
    id: "juez",
    ...factionKeys("juez"),
    name: "El Juez",
    thesis: "Fiscal interno, martillo dramatico y cero evidencia objetiva.",
    doctrine: "Sentencia, culpa y cadenas con sello notarial.",
    color: "#f2d37b",
    accent: "#fff6bd",
    sigil: "J",
  },
  {
    id: "complaciente",
    ...factionKeys("complaciente"),
    name: "Complaciente",
    thesis: "Acepta contratos emocionales que nadie redacto en voz alta.",
    doctrine: "Se cura ayudando y se ata agradeciendo.",
    color: "#ff9f7a",
    accent: "#ffd5c4",
    sigil: "Co",
  },
  {
    id: "hiperracional",
    ...factionKeys("hiperracional"),
    name: "Hiperracional",
    thesis: "Convierte emociones en hojas de calculo con olor a tribunal.",
    doctrine: "Culpa ordenada, precision quirurgica, cero abrazo.",
    color: "#7fb7ff",
    accent: "#d4e9ff",
    sigil: "H",
  },
  {
    id: "reservado",
    ...factionKeys("reservado"),
    name: "Reservado",
    thesis: "Todo esta bien, salvo el incendio completo detras de la cortina.",
    doctrine: "Mascara, retirada y silencio blindado.",
    color: "#8d8294",
    accent: "#ddd7e6",
    sigil: "R",
  },
  {
    id: "evitador",
    ...factionKeys("evitador"),
    name: "Evitador",
    thesis: "Posterga con elegancia lo que ya esta incendiando el pasillo.",
    doctrine: "Congela, esquiva y promete enfrentar todo despues.",
    color: "#5f8ec7",
    accent: "#c8e1ff",
    sigil: "E",
  },
  {
    id: "trascendencia",
    ...factionKeys("trascendencia"),
    name: "Trascendencia",
    thesis: "El raro momento en que el cerebro deja de sabotear y trae casco.",
    doctrine: "Despertar, limpieza y voluntad con armadura.",
    color: "#fff2a8",
    accent: "#ffffff",
    sigil: "T",
  },
  {
    id: "hipervigilante",
    ...factionKeys("hipervigilante"),
    name: "Hipervigilante",
    thesis: "Ensaya tragedias con puntualidad militar.",
    doctrine: "Obsesion, repeticion y sirenas internas.",
    color: "#ff5d86",
    accent: "#ffc0d0",
    sigil: "Hv",
  },
  {
    id: "victima",
    ...factionKeys("victima"),
    name: "Victima",
    thesis: "Sufre con presentacion academica y diapositivas tristes.",
    doctrine: "Ironia, derrumbe y una defensa emocional muy convincente.",
    color: "#b887ff",
    accent: "#ead8ff",
    sigil: "V",
  },
  {
    id: "conciencia",
    ...factionKeys("conciencia"),
    name: "Conciencia",
    thesis: "Cuando la jaula descubre que tambien tiene pulmones.",
    doctrine: "Catarsis, claridad y dano hecho cancion.",
    color: "#7fffd4",
    accent: "#f2fffb",
    sigil: "Ca",
  },
];

export const getFaction = (id: FactionId) => allFactions.find((faction) => faction.id === id);
