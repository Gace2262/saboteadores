"use client";

import { FloatingSymbolField } from "./FloatingSymbolField";
import type { FactionId } from "@/data/factions";

export type DynamicBackgroundId =
  | "tribunal-craneo"
  | "catedral-casi"
  | "torre-alarmas"
  | "teatro-pobre-mi"
  | "circo-pendientes"
  | "archivo-frio"
  | "grimorio";

const map: Record<DynamicBackgroundId, { className: string; faction: FactionId }> = {
  "tribunal-craneo": { className: "bg-tribunal-craneo", faction: "juez" },
  "catedral-casi": { className: "bg-catedral-casi", faction: "perfeccionista" },
  "torre-alarmas": { className: "bg-torre-alarmas", faction: "hipervigilante" },
  "teatro-pobre-mi": { className: "bg-teatro-pobre-mi", faction: "victima" },
  "circo-pendientes": { className: "bg-circo-pendientes", faction: "inquieto" },
  "archivo-frio": { className: "bg-archivo-frio", faction: "hiperracional" },
  grimorio: { className: "bg-grimorio-mental", faction: "conciencia" },
};

export function DynamicBackground({ id = "grimorio" }: { id?: DynamicBackgroundId }) {
  const bg = map[id];
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${bg.className}`}>
      <FloatingSymbolField faction={bg.faction} density={18} />
    </div>
  );
}
