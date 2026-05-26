import type { EvolutionAffinity } from "./evolutions";

export type MentalEcho = {
  id: string;
  affinity: EvolutionAffinity | "tribunal";
  text: string;
  unlockAtUsage: number;
};

export const mentalEchoes: MentalEcho[] = [
  { id: "otra-vez", affinity: "defensiva", text: "Otra vez nosotros.", unlockAtUsage: 2 },
  { id: "cadena-gusta", affinity: "maldita", text: "Te gusta esta cadena, verdad?", unlockAtUsage: 6 },
  { id: "estres-alimenta", affinity: "maldita", text: "El estres nos alimenta.", unlockAtUsage: 8 },
  { id: "mas-fuertes", affinity: "agresiva", text: "Hoy vinimos mas fuertes.", unlockAtUsage: 4 },
  { id: "juez-recuerda", affinity: "tribunal", text: "El Juez nos recuerda.", unlockAtUsage: 10 },
  { id: "romper-algo", affinity: "caotica", text: "Ya casi rompemos algo importante.", unlockAtUsage: 7 },
  { id: "respira", affinity: "catartica", text: "Respira. Eso le molesta al tribunal.", unlockAtUsage: 3 },
  { id: "archivo", affinity: "racional", text: "He archivado tus patrones. Pesan demasiado.", unlockAtUsage: 5 },
];

export const getEchoesForAffinity = (affinity: EvolutionAffinity | "tribunal", usage: number) =>
  mentalEchoes.filter((echo) => (echo.affinity === affinity || echo.affinity === "tribunal") && usage >= echo.unlockAtUsage);
