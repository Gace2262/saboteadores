export type AchievementCategory =
  | "campana"
  | "combate"
  | "cartas"
  | "estres"
  | "bosses"
  | "juicio-extremo"
  | "coleccion"
  | "secretos";

export type AchievementReward = {
  type: "titulo" | "cosmetico" | "carta" | "fragmentos";
  id: string;
  label: string;
};

export type AchievementDefinition = {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  target: number;
  statKey: string;
  reward: AchievementReward;
  hidden?: boolean;
  flavorText: string;
};

export const achievements: AchievementDefinition[] = [
  {
    id: "culpable-estilo",
    title: "Culpable con estilo",
    description: "Perder contra El Juez usando una carta legendaria.",
    category: "juicio-extremo",
    target: 1,
    statKey: "legendaryJudgeLosses",
    reward: { type: "titulo", id: "culpable-honores", label: "Titulo epico" },
    flavorText: "La derrota tuvo buen marco y peor jurisprudencia.",
  },
  {
    id: "tribunal-sin-papel",
    title: "El tribunal se quedo sin papel",
    description: "Activar 20 Sentencias.",
    category: "cartas",
    target: 20,
    statKey: "sentencesActivated",
    reward: { type: "cosmetico", id: "borde-judicial", label: "Borde judicial" },
    flavorText: "Tantos sellos que el escritorio pidio sindicato.",
  },
  {
    id: "respirar-cuenta",
    title: "Respirar tambien cuenta",
    description: "Ganar una partida con 1 de Voluntad.",
    category: "combate",
    target: 1,
    statKey: "oneWillWins",
    reward: { type: "cosmetico", id: "icono-respiracion", label: "Icono especial" },
    flavorText: "Victoria minima, drama maximo.",
  },
  {
    id: "excel-emocional",
    title: "Excel emocional",
    description: "Usar 50 cartas Hiperracionales.",
    category: "cartas",
    target: 50,
    statKey: "hiperrationalCardsUsed",
    reward: { type: "cosmetico", id: "tema-azul-frio", label: "Tema azul frio" },
    flavorText: "Sentir fue exportado a CSV.",
  },
  {
    id: "drama-presupuesto",
    title: "Drama con presupuesto ilimitado",
    description: "Activar 10 Catarsis en una campana.",
    category: "campana",
    target: 10,
    statKey: "catarsisActivated",
    reward: { type: "cosmetico", id: "particulas-teatrales", label: "Particulas teatrales" },
    flavorText: "Las cadenas salieron con direccion de arte.",
  },
  {
    id: "procrastinacion-turbo",
    title: "Procrastinacion turbo",
    description: "Tener 5 Pendientes toxicos en el mazo y aun asi ganar.",
    category: "secretos",
    target: 1,
    statKey: "toxicPendingWins",
    reward: { type: "carta", id: "decreto-no-molestar", label: "Carta secreta" },
    flavorText: "La postergacion llego tarde a su propia victoria.",
  },
  {
    id: "archivista-desastre",
    title: "Archivista del desastre",
    description: "Desbloquear todas las entradas de lore.",
    category: "coleccion",
    target: 10,
    statKey: "loreUnlocked",
    reward: { type: "titulo", id: "martillo-roto", label: "Titulo legendario" },
    flavorText: "Ahora el archivo te teme un poco.",
  },
  {
    id: "libre-protesta-achievement",
    title: "Libre bajo protesta",
    description: "Completar Juicio Extremo.",
    category: "juicio-extremo",
    target: 1,
    statKey: "extremeWins",
    reward: { type: "cosmetico", id: "marco-legendario-animado", label: "Marco legendario animado" },
    flavorText: "El tribunal apelo. Nadie lo escucho por los coros.",
  },
  {
    id: "cadena-perpetua-emocional",
    title: "Cadena perpetua emocional",
    description: "Bloquear 100 cartas.",
    category: "combate",
    target: 100,
    statKey: "cardsBlocked",
    reward: { type: "cosmetico", id: "cadenas-premium", label: "Efecto de cadenas premium" },
    flavorText: "Las cadenas ya tienen tarjeta de fidelidad.",
  },
  {
    id: "silencio-responde",
    title: "El silencio responde",
    description: "Ganar sin usar cartas de Crisis.",
    category: "combate",
    target: 1,
    statKey: "noCrisisWins",
    reward: { type: "cosmetico", id: "aura-silencio", label: "Aura especial" },
    flavorText: "No dijo nada. Fue devastador.",
  },
  {
    id: "juez-pestaneo",
    title: "El Juez pestaneo",
    description: "Derrotar a El Juez sin recibir Sentencia.",
    category: "secretos",
    target: 1,
    statKey: "judgeNoSentenceWins",
    reward: { type: "titulo", id: "dejo-obedecer", label: "Titulo secreto" },
    hidden: true,
    flavorText: "El martillo tuvo una duda y eso basto.",
  },
  {
    id: "no-era-para-tanto",
    title: "No era para tanto",
    description: "Reducir 15 Estres en un turno.",
    category: "secretos",
    target: 1,
    statKey: "bigStressDrops",
    reward: { type: "cosmetico", id: "sello-respiracion-negra", label: "Sello raro" },
    hidden: true,
    flavorText: "La crisis pidio reembolso.",
  },
  {
    id: "silencio-grito",
    title: "El silencio grito",
    description: "Ganar usando solo cartas Reservado.",
    category: "secretos",
    target: 1,
    statKey: "reservedOnlyWins",
    reward: { type: "titulo", id: "audiencia-termino", label: "Titulo secreto" },
    hidden: true,
    flavorText: "El bunker abrio la boca y se cayeron tres paredes.",
  },
  {
    id: "cadena-alimenticia",
    title: "Cadena alimenticia emocional",
    description: "Aplicar 30 bloqueos en una campana.",
    category: "secretos",
    target: 30,
    statKey: "campaignBlocks",
    reward: { type: "titulo", id: "error-sistema-emocional", label: "Titulo secreto" },
    hidden: true,
    flavorText: "La culpa descubrio que tambien podia ser bloqueada.",
  },
];
