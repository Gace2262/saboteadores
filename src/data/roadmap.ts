export type RoadmapItem = {
  id: string;
  stage: string;
  status: "prototipo" | "vertical-slice" | "planeado" | "futuro";
  description: string;
};

export const roadmap: RoadmapItem[] = [
  { id: "demo", stage: "Demo", status: "vertical-slice", description: "Flujo de 15 a 30 minutos con intro, combate, evento vivo, evolucion, boss y final de demo." },
  { id: "early-access", stage: "Early Access", status: "planeado", description: "Campana ampliada, balance, mas cartas y feedback de testers." },
  { id: "tribunal-vivo", stage: "Expansion Tribunal Vivo", status: "planeado", description: "Mas eventos dinamicos, invasiones y memoria contextual." },
  { id: "multiplayer", stage: "Multiplayer", status: "futuro", description: "Arquitectura preparada para duelos y cooperativo online." },
  { id: "factions", stage: "Nuevas facciones", status: "planeado", description: "Saboteadores adicionales, Conciencia expandida y cartas neutrales." },
  { id: "bosses", stage: "Bosses adicionales", status: "planeado", description: "Bosses fusionados, colosales y finales especificos." },
  { id: "mods", stage: "Mod support", status: "futuro", description: "Estructura futura para cartas, textos y reglas comunitarias." },
  { id: "editor", stage: "Editor de cartas", status: "futuro", description: "Herramienta offline para prototipar nuevas cartas y escenas." },
];

export const futureArchitecture = [
  "export/import de save",
  "configuracion avanzada",
  "builds desktop con Electron o Tauri",
  "soporte gamepad futuro",
  "internacionalizacion",
  "cloud sync futuro",
];
