export type RelicId = "fragmento-martillo" | "llave-catarsis" | "cadena-domesticada" | "mascara-silencio" | "archivo-perdido" | "cafe-burnout";

export type WorldRelic = {
  id: RelicId;
  name: string;
  rarity: "comun" | "rara" | "epica" | "legendaria" | "maldita";
  effect: string;
  flavor: string;
  regionHint: string;
  visual: string;
};

export const worldRelics: WorldRelic[] = [
  {
    id: "fragmento-martillo",
    name: "Fragmento del Martillo",
    rarity: "legendaria",
    effect: "+1 Sentencia por combate.",
    flavor: "No juzga tanto como antes. Pero todavia tiene opiniones.",
    regionHint: "Tribunal del Craneo",
    visual: "astilla dorada flotando sobre sello roto",
  },
  {
    id: "llave-catarsis",
    name: "Llave de Catarsis",
    rarity: "epica",
    effect: "La primera Catarsis cuesta menos.",
    flavor: "Abre puertas, cadenas y conversaciones que nadie queria empezar.",
    regionHint: "Jardines de Catarsis",
    visual: "llave blanca con grietas luminosas",
  },
  {
    id: "cadena-domesticada",
    name: "Cadena Domesticada",
    rarity: "rara",
    effect: "Resistencia parcial a bloqueos.",
    flavor: "Se sienta. Da la pata. Aun intenta firmar contratos emocionales.",
    regionHint: "Catedral de la Culpa",
    visual: "cadena azul atada con cinta dorada",
  },
  {
    id: "mascara-silencio",
    name: "Mascara del Silencio",
    rarity: "rara",
    effect: "Reduce Estres inicial.",
    flavor: "No soluciona nada, pero baja el volumen de la catastrofe.",
    regionHint: "Las Fosas del Silencio",
    visual: "mascara oscura con respiracion azul",
  },
  {
    id: "archivo-perdido",
    name: "Archivo Perdido",
    rarity: "epica",
    effect: "Roba carta extra al perder Voluntad.",
    flavor: "El burnout archivo esto mal. Por fin un error util.",
    regionHint: "Archivo del Burnout",
    visual: "carpeta infinita con paginas encendidas",
  },
  {
    id: "cafe-burnout",
    name: "Cafe del Burnout",
    rarity: "maldita",
    effect: "Mas Claridad, mas Estres.",
    flavor: "Sabe a productividad, arrepentimiento y lunes con casco.",
    regionHint: "Estacion del Estres",
    visual: "taza roja humeando como reactor emocional",
  },
];

export const getWorldRelic = (id?: string) => worldRelics.find((relic) => relic.id === id) ?? worldRelics[0];
