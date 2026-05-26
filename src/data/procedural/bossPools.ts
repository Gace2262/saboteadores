import type { ProceduralBoss } from "@/logic/procedural/proceduralTypes";

export const proceduralBosses: ProceduralBoss[] = [
  { id: "controlador", name: "Controlador", actBias: 1, climates: ["control", "juicio"] },
  { id: "perfeccionista", name: "Perfeccionista", actBias: 2, climates: ["perfeccion", "culpa"] },
  { id: "hipervigilante", name: "Hipervigilante", actBias: 2, climates: ["control", "caos"] },
  { id: "inquieto", name: "Inquieto", actBias: 2, climates: ["burnout", "caos"] },
  { id: "victima", name: "Victima", actBias: 3, climates: ["culpa", "memoria"] },
  { id: "evitador", name: "Evitador", actBias: 3, climates: ["evasion", "silencio"] },
  { id: "hiperracional", name: "Hiperracional", actBias: 3, climates: ["memoria", "control"] },
  { id: "complaciente", name: "Complaciente", actBias: 3, climates: ["culpa", "catarsis"] },
  { id: "reservado", name: "Reservado", actBias: 3, climates: ["silencio", "evasion"] },
  { id: "juez", name: "El Juez", actBias: 4, climates: ["juicio", "culpa", "memoria"] },
];
