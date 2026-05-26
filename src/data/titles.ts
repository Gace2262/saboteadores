export type TitleRarity = "comun" | "raro" | "epico" | "legendario" | "secreto";

export type UnlockableTitle = {
  id: string;
  name: string;
  rarity: TitleRarity;
  flavorText: string;
};

export const unlockableTitles: UnlockableTitle[] = [
  { id: "funcionario-caos", name: "Funcionario del Caos", rarity: "comun", flavorText: "Sella formularios mientras el mundo interior arde." },
  { id: "becario-tribunal", name: "Becario del Tribunal", rarity: "comun", flavorText: "Trae cafe, culpa y expedientes incorrectos." },
  { id: "casi-suficiente", name: "Casi suficiente", rarity: "comun", flavorText: "El halago mas peligroso del Perfeccionista." },
  { id: "domador-pensamientos", name: "Domador de Pensamientos", rarity: "raro", flavorText: "No los controla. Les puso bozal administrativo." },
  { id: "caballero-estres", name: "Caballero del Estres", rarity: "raro", flavorText: "Armadura brillante, respiracion cuestionable." },
  { id: "supervisor-derrumbe", name: "Supervisor del Derrumbe", rarity: "raro", flavorText: "Mira caer todo con planilla de seguimiento." },
  { id: "culpable-honores", name: "Culpable con Honores", rarity: "epico", flavorText: "La sentencia venia con diploma y aplauso incomodo." },
  { id: "rey-casi", name: "Rey del Casi", rarity: "epico", flavorText: "Gobierna un reino donde todo quedo a dos ajustes." },
  { id: "portador-catarsis", name: "Portador de la Catarsis", rarity: "epico", flavorText: "Las cadenas se apartan por salud laboral." },
  { id: "sobreviviente-tribunal", name: "Sobreviviente del Tribunal", rarity: "legendario", flavorText: "El martillo golpeo. Tu paz presento objecion." },
  { id: "martillo-roto", name: "Martillo Roto", rarity: "legendario", flavorText: "Evidencia de que incluso la culpa se fatiga." },
  { id: "libre-bajo-protesta", name: "Libre Bajo Protesta", rarity: "legendario", flavorText: "El tribunal apelara, pero hoy no tiene quorum." },
  { id: "dejo-obedecer", name: "El que dejo de obedecer", rarity: "secreto", flavorText: "No hubo grito. Solo una silla vacia." },
  { id: "error-sistema-emocional", name: "Error de sistema emocional", rarity: "secreto", flavorText: "La culpa no pudo encontrar el archivo." },
  { id: "audiencia-termino", name: "La audiencia termino", rarity: "secreto", flavorText: "El silencio firmo el acta final." },
];

export const getTitle = (id?: string) => unlockableTitles.find((title) => title.id === id);
