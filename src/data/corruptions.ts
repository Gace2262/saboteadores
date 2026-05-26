export type CorruptionState = "estable" | "inestable" | "corrupta" | "fracturada" | "abisal";

export type CorruptionRule = {
  level: number;
  state: CorruptionState;
  threshold: number;
  visual: string;
  modifier: string;
  flavorText: string;
};

export const corruptionRules: CorruptionRule[] = [
  { level: 0, state: "estable", threshold: 0, visual: "borde limpio, energia controlada", modifier: "Sin penalizacion.", flavorText: "La carta todavia finge normalidad." },
  { level: 1, state: "inestable", threshold: 20, visual: "microglitches y tinta nerviosa", modifier: "Ecos mentales mas frecuentes.", flavorText: "Algo mira desde el margen." },
  { level: 2, state: "corrupta", threshold: 45, visual: "humo oscuro y frases torcidas", modifier: "Mas potencia, coste emocional mayor.", flavorText: "El patron aprendio a sonreir." },
  { level: 3, state: "fracturada", threshold: 70, visual: "grietas rojas y borde abisal", modifier: "Efectos impredecibles.", flavorText: "La carta recuerda demasiado." },
  { level: 4, state: "abisal", threshold: 100, visual: "estatica negra, cadenas y coro bajo", modifier: "Poder alto con penalizaciones ocultas.", flavorText: "El tribunal ya le habla por su nombre." },
];

export const getCorruptionRule = (value: number) =>
  [...corruptionRules].reverse().find((rule) => value >= rule.threshold) ?? corruptionRules[0];

export const corruptionMutations = [
  { id: "texto-corrupto", name: "Texto corrupto", effect: "Las frases cambian parcialmente." },
  { id: "costo-inestable", name: "Costo inestable", effect: "El costo varia ligeramente." },
  { id: "brillo-abisal", name: "Brillo abisal", effect: "Aura oscura viva." },
  { id: "memoria-derrota", name: "Memoria de derrota", effect: "Se fortalece tras perder." },
  { id: "eco-tribunal", name: "Eco del tribunal", effect: "Activa frases del Juez." },
  { id: "catarsis-residual", name: "Catarsis residual", effect: "Pequena limpieza pasiva." },
];
