export type PlayerAura = {
  id: string;
  name: string;
  unlockCondition: string;
  visual: string;
  className: string;
};

export const playerAuras: PlayerAura[] = [
  { id: "ansiedad", name: "Aura de Ansiedad", unlockCondition: "Acumula 100 Estres.", visual: "pulsos rojos", className: "shadow-[0_0_60px_rgba(244,63,94,0.45)] before:bg-rose-500/20" },
  { id: "claridad", name: "Aura de Claridad", unlockCondition: "Disponible al iniciar.", visual: "particulas blancas", className: "shadow-[0_0_60px_rgba(255,255,255,0.3)] before:bg-white/15" },
  { id: "tribunal", name: "Aura del Tribunal", unlockCondition: "Derrota a El Juez.", visual: "sellos dorados", className: "shadow-[0_0_64px_rgba(242,211,123,0.42)] before:bg-amber-200/18" },
  { id: "maldita", name: "Aura Maldita", unlockCondition: "Completa Juicio Extremo.", visual: "glitch negro y rojo", className: "shadow-[0_0_64px_rgba(127,29,29,0.5)] before:bg-red-950/25" },
  { id: "catartica", name: "Aura Catartica", unlockCondition: "Usa Catarsis 20 veces.", visual: "explosiones luminosas", className: "shadow-[0_0_70px_rgba(250,250,210,0.42)] before:bg-yellow-100/18" },
  { id: "silenciosa", name: "Aura Silenciosa", unlockCondition: "Gana sin usar Crisis.", visual: "humo azul tenue", className: "shadow-[0_0_56px_rgba(125,211,252,0.32)] before:bg-cyan-300/14" },
  { id: "electricidad-emocional", name: "Electricidad emocional", unlockCondition: "Cosmetico desbloqueable.", visual: "chispas violetas y ansiedad util", className: "shadow-[0_0_68px_rgba(217,70,239,0.38)] before:bg-fuchsia-300/16" },
];

export const getPlayerAura = (id?: string) => playerAuras.find((aura) => aura.id === id) ?? playerAuras[1];
