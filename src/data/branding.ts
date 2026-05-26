export type BrandColor = {
  name: string;
  hex: string;
  use: string;
};

export const officialBranding = {
  name: "Saboteadores Mentales: Habitantes Invisibles",
  shortName: "Saboteadores Mentales",
  logomark: "sello judicial fracturado con ojo oculto y cadenas",
  style: "gotico moderno, oro roto, grietas luminosas y grimorio psicologico",
  taglines: [
    "El tribunal vive dentro de ti.",
    "Tus pensamientos ya eligieron bando.",
    "No luchas contra monstruos. Luchas contra mecanismos.",
    "El juicio nunca fue externo.",
    "La mente tambien construye tiranos.",
  ],
  elevatorPitch:
    "Un juego de cartas psicologico y cinematografico donde enfrentas Saboteadores Mentales en un tribunal interno oscuro, epico y absurdamente humano.",
  longPitch:
    "Combina deckbuilding tactico, bosses multi-fase, cartas evolucionables, humor negro elegante y un mundo mental vivo que recuerda tus habitos. Cada combate parece una audiencia, cada carta trae una escena y cada victoria recupera un pedazo de Claridad.",
};

export const brandColors: BrandColor[] = [
  { name: "Negro carbon", hex: "#070707", use: "fondos, tribunal, vacio" },
  { name: "Dorado viejo", hex: "#d6aa45", use: "sellos, rarezas, logo" },
  { name: "Rojo ansiedad", hex: "#b91c1c", use: "estres, alertas, boss fights" },
  { name: "Azul culpa", hex: "#5b8fb9", use: "culpa, lluvia mental" },
  { name: "Violeta mental", hex: "#7c3aed", use: "corrupcion, ruido mental" },
  { name: "Blanco catarsis", hex: "#f8fafc", use: "liberacion, despertares" },
];

export const promotionalBackgrounds = [
  "Tribunal del Craneo con martillo suspendido",
  "Catedral del Casi fracturada",
  "Archivo del Burnout infinito",
  "Jardines de Catarsis con cadenas oxidadas",
];

export const iconography = ["martillo", "cadena", "ojo judicial", "grieta", "mascara rota", "orbe de claridad", "sello del tribunal"];
