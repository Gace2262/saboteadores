import type { BossId } from "./bosses";

export type BossRushEntry = {
  order: number;
  bossId: BossId;
  room: string;
  modifier: string;
};

export const bossRushOrder: BossRushEntry[] = [
  { order: 1, bossId: "controlador", room: "Oficina del Control Absoluto", modifier: "Bloqueos iniciales." },
  { order: 2, bossId: "perfeccionista", room: "Catedral del Casi", modifier: "Cartas caras duelen mas." },
  { order: 3, bossId: "hipervigilante", room: "Torre de las Alarmas", modifier: "Contraataques preventivos." },
  { order: 4, bossId: "inquieto", room: "Circo de Pendientes", modifier: "Robos veloces y Estres extra." },
  { order: 5, bossId: "victima", room: "Teatro del Pobre de Mi", modifier: "Culpa reflejada." },
  { order: 6, bossId: "evitador", room: "Sala de Espera Eterna", modifier: "Retrasos y congelamientos." },
  { order: 7, bossId: "hiperracional", room: "Archivo Frio del Cerebro", modifier: "Anulaciones quirurgicas." },
  { order: 8, bossId: "complaciente", room: "Banquete de Favores", modifier: "Curas con deuda afectiva." },
  { order: 9, bossId: "reservado", room: "Bunker del No Me Pasa Nada", modifier: "Defensa silenciosa acumulada." },
  { order: 10, bossId: "juez", room: "Tribunal del Craneo", modifier: "Fases, cadenas y martillazos." },
];
