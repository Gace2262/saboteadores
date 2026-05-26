export type PlayerStatKey =
  | "gamesPlayed"
  | "victories"
  | "defeats"
  | "cardsUsed"
  | "damageDealt"
  | "stressAccumulated"
  | "catarsisActivated"
  | "hammerSlamsReceived"
  | "cardsBlocked"
  | "packsOpened"
  | "bossesDefeated"
  | "timePlayedMinutes"
  | "sentencesActivated"
  | "hiperrationalCardsUsed"
  | "stampedesActivated"
  | "maxStressSurvived"
  | "judgeAndConscienceGames"
  | "reservedOrAvoiderWins"
  | "lowStressWins"
  | "extremeWins"
  | "legendaryJudgeLosses"
  | "oneWillWins"
  | "toxicPendingWins"
  | "loreUnlocked"
  | "noCrisisWins"
  | "judgeNoSentenceWins"
  | "bigStressDrops"
  | "reservedOnlyWins"
  | "campaignBlocks";

export type PlayerStats = Record<PlayerStatKey, number>;

export const initialPlayerStats: PlayerStats = {
  gamesPlayed: 0,
  victories: 0,
  defeats: 0,
  cardsUsed: 0,
  damageDealt: 0,
  stressAccumulated: 0,
  catarsisActivated: 0,
  hammerSlamsReceived: 0,
  cardsBlocked: 0,
  packsOpened: 0,
  bossesDefeated: 0,
  timePlayedMinutes: 0,
  sentencesActivated: 0,
  hiperrationalCardsUsed: 0,
  stampedesActivated: 0,
  maxStressSurvived: 0,
  judgeAndConscienceGames: 0,
  reservedOrAvoiderWins: 0,
  lowStressWins: 0,
  extremeWins: 0,
  legendaryJudgeLosses: 0,
  oneWillWins: 0,
  toxicPendingWins: 0,
  loreUnlocked: 1,
  noCrisisWins: 0,
  judgeNoSentenceWins: 0,
  bigStressDrops: 0,
  reservedOnlyWins: 0,
  campaignBlocks: 0,
};

export const statLabels: Record<PlayerStatKey, string> = {
  gamesPlayed: "Partidas jugadas",
  victories: "Victorias",
  defeats: "Derrotas",
  cardsUsed: "Cartas usadas",
  damageDealt: "Dano total",
  stressAccumulated: "Estres acumulado",
  catarsisActivated: "Catarsis activadas",
  hammerSlamsReceived: "Martillazos recibidos",
  cardsBlocked: "Cadenas aplicadas",
  packsOpened: "Sobres abiertos",
  bossesDefeated: "Bosses derrotados",
  timePlayedMinutes: "Tiempo jugado",
  sentencesActivated: "Sentencias",
  hiperrationalCardsUsed: "Cartas Hiperracionales",
  stampedesActivated: "Estampidas",
  maxStressSurvived: "Estres maximo sobrevivido",
  judgeAndConscienceGames: "Juez + Conciencia",
  reservedOrAvoiderWins: "Victorias Reservado/Evitador",
  lowStressWins: "Victorias serenas",
  extremeWins: "Juicios Extremos ganados",
  legendaryJudgeLosses: "Derrotas legendarias",
  oneWillWins: "Victorias con 1 Voluntad",
  toxicPendingWins: "Pendientes toxicos vencidos",
  loreUnlocked: "Lore desbloqueado",
  noCrisisWins: "Victorias sin Crisis",
  judgeNoSentenceWins: "Juez sin Sentencia",
  bigStressDrops: "Derrumbes de Estres",
  reservedOnlyWins: "Solo Reservado",
  campaignBlocks: "Bloqueos en campana",
};
