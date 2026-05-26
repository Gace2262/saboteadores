export type Emote = {
  id: string;
  label: string;
  flavor: string;
};

export const multiplayerEmotes: Emote[] = [
  { id: "martillazo-respetuoso", label: "Martillazo respetuoso", flavor: "El desacuerdo llega con toga limpia." },
  { id: "cadenas-diplomaticas", label: "Cadenas diplomaticas", flavor: "Bloqueo, pero con modales." },
  { id: "catarsis-aprobada", label: "Catarsis aprobada", flavor: "Se acepta el grito como argumento." },
  { id: "estres-saluda", label: "El estres saluda", flavor: "Vino temprano. Trajo cafe." },
  { id: "objecion-elegante", label: "Objecion elegante", flavor: "No grita. Brilla con veneno." },
  { id: "buen-combo", label: "Buen combo, que horror", flavor: "Admiracion tactica con trauma incluido." },
  { id: "mazo-terapia", label: "Mi mazo esta en terapia", flavor: "Va lento, pero ya identifica patrones." },
  { id: "tribunal-nota", label: "El Tribunal tomo nota", flavor: "Nadie sabe para que. Preocupa." },
];
