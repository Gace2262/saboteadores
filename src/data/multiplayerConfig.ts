export type MultiplayerMode = "local" | "private" | "casual" | "ranked" | "seasonal" | "draft_pvp" | "mirror_pvp";
export type TurnTimerMode = "none" | "60" | "90" | "120";

export const multiplayerConfig = {
  onlineEnabled: false,
  defaultTimer: "none" as TurnTimerMode,
  maxPlayers: 2,
  spectatorsEnabled: false,
  rankedEnabled: false,
  privateRoomsEnabled: false,
  messageOffline: "Modo online aun no conectado. El Tribunal acepta duelos en el mismo dispositivo.",
  pvpRules: {
    judgeAllowed: false,
    maxCursedCards: 2,
    futureRankedMaxLegendary: 1,
    tribunalLivingEventsInRanked: false,
  },
  modes: [
    { id: "local", name: "Local casual", available: true },
    { id: "private", name: "Partida privada", available: false },
    { id: "casual", name: "Arena casual", available: false },
    { id: "ranked", name: "Ranked", available: false },
    { id: "draft_pvp", name: "Draft PvP", available: false },
    { id: "mirror_pvp", name: "Espejo PvP", available: false },
  ],
};

export const futureRanks = [
  "Citado",
  "Acusado",
  "Testigo Nervioso",
  "Inspector del Casi",
  "Magistrado del Estres",
  "Heraldo del Martillo",
  "Libre Bajo Protesta",
];
