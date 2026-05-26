import type { BossId } from "./bosses";

export type RareEncounter = {
  id: string;
  name: string;
  invadingBoss: BossId;
  targetContext: "campaign" | "battle" | "arena" | "draft" | "profile" | "collection";
  line: string;
  effect: string;
};

export const rareEncounters: RareEncounter[] = [
  {
    id: "hipervigilante-perfeccionista",
    name: "Auditoria con sirenas",
    invadingBoss: "hipervigilante",
    targetContext: "battle",
    line: "La ansiedad decidio colaborar interdisciplinariamente.",
    effect: "El proximo ataque rival agrega 1 Estres preventivo.",
  },
  {
    id: "victima-arena",
    name: "Monologo no solicitado",
    invadingBoss: "victima",
    targetContext: "arena",
    line: "No quiero interrumpir, pero ya alquile teatro.",
    effect: "La arena registra una frase exclusiva dramatica.",
  },
  {
    id: "controlador-draft",
    name: "Draft auditado",
    invadingBoss: "controlador",
    targetContext: "draft",
    line: "Improvisar fue eliminado del presupuesto.",
    effect: "La siguiente oferta de Draft muestra una carta bloqueada decorativa.",
  },
  {
    id: "juez-coleccion",
    name: "Revision de album",
    invadingBoss: "juez",
    targetContext: "collection",
    line: "Incluso tus cartas archivadas declaran.",
    effect: "Una carta muestra un eco mental adicional.",
  },
];
