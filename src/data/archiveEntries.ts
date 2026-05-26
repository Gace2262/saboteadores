export type ArchiveEntryCategory = "boss" | "decision" | "carta" | "corrupcion" | "final" | "evento";

export type ArchiveEntry = {
  id: string;
  category: ArchiveEntryCategory;
  title: string;
  summary: string;
  unlockHint: string;
  flavor: string;
};

export const archiveEntries: ArchiveEntry[] = [
  {
    id: "bosses-derrotados",
    category: "boss",
    title: "Bosses derrotados",
    summary: "Registro de Saboteadores colosales vencidos y fases vistas.",
    unlockHint: "Derrota bosses en campana, Juicio Extremo o Boss Rush.",
    flavor: "El museo del caos mental cobra entrada en recuerdos.",
  },
  {
    id: "decisiones-narrativas",
    category: "decision",
    title: "Decisiones narrativas",
    summary: "Elecciones tomadas en eventos, capitulos y finales interactivos.",
    unlockHint: "Elige respuestas durante historia y finales.",
    flavor: "Cada opcion quedo archivada. Incluso esa. Especialmente esa.",
  },
  {
    id: "cartas-despertadas",
    category: "carta",
    title: "Cartas despertadas",
    summary: "Formas despiertas, ecos mentales y mutaciones visibles.",
    unlockHint: "Usa cartas hasta que recuerden demasiado.",
    flavor: "El mazo esta vivo. Legalmente, eso complica las fundas.",
  },
  {
    id: "corrupcion-maxima",
    category: "corrupcion",
    title: "Corrupcion maxima",
    summary: "Picos de corrupcion, cartas abisales y anomalias vistas.",
    unlockHint: "Juega cartas malditas y explora zonas corruptas.",
    flavor: "No era una fase. Era una auditoria estetica del desastre.",
  },
  {
    id: "finales-obtenidos",
    category: "final",
    title: "Finales obtenidos",
    summary: "Juicio Suspendido, libertad ambigua y finales del Tribunal.",
    unlockHint: "Vence a El Juez y decide que hacer con el martillo.",
    flavor: "El final tambien firmo apelacion, por supuesto.",
  },
  {
    id: "eventos-raros",
    category: "evento",
    title: "Eventos raros vistos",
    summary: "Tribunal Vacio, martillos infinitos y menus que aprendieron malos habitos.",
    unlockHint: "Explora el Tribunal Vivo y sus regiones.",
    flavor: "La rareza se presento con credenciales vencidas.",
  },
];
