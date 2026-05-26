export type ProfileBackground = {
  id: string;
  name: string;
  unlockCondition: string;
  layers: string[];
  className: string;
};

export const profileBackgrounds: ProfileBackground[] = [
  { id: "tribunal-craneo", name: "Tribunal del Craneo", unlockCondition: "Disponible al iniciar.", layers: ["martillo suspendido", "ojo gigante", "cadenas flotando"], className: "bg-[radial-gradient(circle_at_50%_12%,rgba(242,211,123,0.2),transparent_26%),radial-gradient(circle_at_20%_70%,rgba(127,29,29,0.25),transparent_30%),#050505]" },
  { id: "catedral-casi", name: "Catedral del Casi", unlockCondition: "Vence al Perfeccionista.", layers: ["vitrales", "relojes", "grietas perfectas"], className: "bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.18),transparent_24%),linear-gradient(135deg,#111,#4b3b16,#090909)]" },
  { id: "circo-pendientes", name: "Circo de Pendientes", unlockCondition: "Sobrevive 5 oleadas.", layers: ["luces rotas", "papeles volando", "humo rapido"], className: "bg-[radial-gradient(circle_at_25%_25%,rgba(159,92,255,0.22),transparent_28%),linear-gradient(135deg,#120617,#4a102f,#050505)]" },
  { id: "archivo-frio", name: "Archivo Frio", unlockCondition: "Usa 50 cartas Hiperracionales.", layers: ["glitches azules", "carpetas infinitas", "lluvia digital"], className: "bg-[linear-gradient(135deg,#04111f,#0f2a44,#020305)]" },
  { id: "teatro-pobre-mi", name: "Teatro del Pobre de Mi", unlockCondition: "Derrota a Victima.", layers: ["telones", "lluvia", "aplausos lejanos"], className: "bg-[radial-gradient(circle_at_60%_20%,rgba(168,85,247,0.22),transparent_30%),linear-gradient(135deg,#160414,#3f1236,#050505)]" },
  { id: "vacio-catarsis", name: "Vacio de Catarsis", unlockCondition: "Completa Catarsis Colectiva.", layers: ["cadenas cayendo", "luz blanca", "cenizas flotando"], className: "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.28),transparent_24%),linear-gradient(135deg,#050505,#4a3b10,#0a0a0a)]" },
  { id: "ruinas-autoengano", name: "Ruinas del Autoengano", unlockCondition: "Cosmetico desbloqueable.", layers: ["columnas rotas", "carteles de negacion", "polvo elegante"], className: "bg-[linear-gradient(135deg,#090909,#2f1b12,#171717)]" },
];

export const getProfileBackground = (id?: string) => profileBackgrounds.find((background) => background.id === id) ?? profileBackgrounds[0];
