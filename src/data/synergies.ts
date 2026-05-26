import type { FactionId } from "./factions";

export type FactionSynergy = {
  id: string;
  factions: [FactionId, FactionId];
  name: string;
  passive: string;
  phrase: string;
  visual: string;
};

const pairId = (a: FactionId, b: FactionId) => [a, b].sort().join("+");

export const synergies: FactionSynergy[] = [
  {
    id: pairId("controlador", "perfeccionista"),
    factions: ["controlador", "perfeccionista"],
    name: "Dictadura del Casi",
    passive: "La primera carta bloqueada cada turno cuesta +1 Claridad al rival.",
    phrase: "Nada esta bajo control, pero el Excel se ve precioso.",
    visual: "Cadenas doradas y regla milimetrica.",
  },
  {
    id: pairId("inquieto", "hipervigilante"),
    factions: ["inquieto", "hipervigilante"],
    name: "Alarma con Patas",
    passive: "La primera vez que ganas Estres en tu turno, robas una carta.",
    phrase: "No sabemos que viene, pero ya corrimos en circulos.",
    visual: "Ondas rojas y sombras veloces.",
  },
  {
    id: pairId("complaciente", "victima"),
    factions: ["complaciente", "victima"],
    name: "Martirio Corporativo",
    passive: "Cuando ganas Voluntad, el rival recibe 1 Culpa.",
    phrase: "Lo hice por ti. Ahora sufre correctamente.",
    visual: "Halo roto y lluvia de recibos emocionales.",
  },
  {
    id: pairId("hiperracional", "reservado"),
    factions: ["hiperracional", "reservado"],
    name: "Bunker de Excel",
    passive: "Una vez por turno puedes mirar la primera carta del mazo.",
    phrase: "Sentir fue descartado por falta de evidencia.",
    visual: "Cuadricula azul fria y puerta blindada.",
  },
  {
    id: pairId("evitador", "inquieto"),
    factions: ["evitador", "inquieto"],
    name: "Procrastinacion Turbo",
    passive: "La primera carta de Crisis cuesta 1 menos, pero ganas 1 Estres.",
    phrase: "Lo haremos despues, pero con mucha velocidad.",
    visual: "Reloj derretido y relampagos.",
  },
  {
    id: pairId("perfeccionista", "hiperracional"),
    factions: ["perfeccionista", "hiperracional"],
    name: "Auditoria del Alma",
    passive: "Tus cartas de Culpa hacen +1 efecto.",
    phrase: "He revisado tu infancia y faltan respaldos.",
    visual: "Sellos, carpetas y luz quirurgica.",
  },
  {
    id: pairId("controlador", "complaciente"),
    factions: ["controlador", "complaciente"],
    name: "Abrazo Administrativo",
    passive: "Al bloquear una carta rival, recuperas 1 Voluntad.",
    phrase: "Te cuido porque claramente no sabes existir solo.",
    visual: "Cadenas suaves, formulario y corazon con candado.",
  },
  {
    id: pairId("victima", "evitador"),
    factions: ["victima", "evitador"],
    name: "Drama en Pausa",
    passive: "La primera vez que evitas dano, el rival gana 1 Estres.",
    phrase: "No enfrente el problema, pero lo narre precioso.",
    visual: "Telon oscuro y boton de pausa roto.",
  },
  {
    id: pairId("hipervigilante", "reservado"),
    factions: ["hipervigilante", "reservado"],
    name: "Silencio Antibalas",
    passive: "Si no juegas cartas ofensivas este turno, ganas escudo.",
    phrase: "No dije nada, pero prepare 17 escenarios de fuga.",
    visual: "Escudo transparente y radar.",
  },
];

export const judgeSynergy: FactionSynergy = {
  id: "juez+especial",
  factions: ["juez", "controlador"],
  name: "Juicio Interno",
  passive: "Cada 3 turnos cae un martillazo aleatorio.",
  phrase: "El tribunal no descansa. Solo cambia de victima.",
  visual: "Martillo, cadenas y ojo dorado.",
};

export const getSynergy = (factions: FactionId[]) => {
  if (factions.includes("juez")) return judgeSynergy;
  if (factions.length < 2) return undefined;
  const id = pairId(factions[0], factions[1]);
  return synergies.find((synergy) => synergy.id === id);
};
