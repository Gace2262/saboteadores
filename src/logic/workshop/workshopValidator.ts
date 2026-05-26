import { workshopCategories } from "@/data/workshopCategories";
import type { WorkshopContent, WorkshopValidationReport } from "./workshopTypes";
import { isCommunityTag } from "./communityTags";
import { moderateWorkshopText } from "./workshopModeration";

const categoryIds = new Set(workshopCategories.map((category) => category.id));
const warningIds = new Set(["flashing", "loud_audio", "psychological_horror", "intense_corruption", "difficult_gameplay", "burnout_themes"]);

export function validateWorkshopContent(content: WorkshopContent): WorkshopValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!/^[a-z0-9][a-z0-9-_]{2,60}$/.test(content.id)) errors.push("ID de expediente invalido.");
  if (!content.title.trim()) errors.push("Titulo requerido. Incluso el caos necesita portada.");
  if (!categoryIds.has(content.type)) errors.push("Tipo de contenido desconocido.");
  if (!content.tags.every(isCommunityTag)) errors.push("Tags invalidos. El Archivo no reconoce esa etiqueta con toga.");
  if (!content.warnings.every((warning) => warningIds.has(warning))) errors.push("Warning desconocido.");
  if (content.dependencies.some((dependency) => !dependency.id || !dependency.version)) errors.push("Dependencia incompleta.");
  errors.push(...moderateWorkshopText(JSON.stringify(content)));
  if (content.type === "seed" && !content.seed) errors.push("Seed compartida sin seed. Audaz, pero inutil.");
  if (content.type === "challenge" && !content.challenge) errors.push("Desafio sin reglas.");
  if (content.type === "run" && !content.replay) errors.push("Run compartida sin replay serializado.");
  if (content.warnings.length === 0) warnings.push("Sin warnings declarados. El Tribunal sospecha optimismo.");
  return { valid: errors.length === 0, errors, warnings };
}

export function detectMissingDependencies(content: WorkshopContent, installedIds: string[]) {
  return content.dependencies.filter((dependency) => !installedIds.includes(dependency.id));
}
