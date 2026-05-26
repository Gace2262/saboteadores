import type { DynamicEvent } from "@/data/dynamicEvents";
import type { TribunalAnomaly } from "@/data/tribunalAnomalies";

export function eventLogLine(event?: DynamicEvent) {
  if (!event) return "El tribunal permanece quieto. Eso tambien es sospechoso.";
  if (event.type === "boss_invasion") return `${event.title}: ${event.narratorLine}`;
  if (event.type === "spontaneous_catarsis") return `${event.title}: ${event.narratorLine}`;
  return `${event.title}: ${event.description}`;
}

export function anomalyLogLine(anomaly?: TribunalAnomaly) {
  if (!anomaly) return "Sin anomalías visibles. El expediente finge normalidad.";
  return `${anomaly.name}: ${anomaly.line}`;
}

export function shouldDimMenu(event?: DynamicEvent, anomaly?: TribunalAnomaly) {
  return event?.type === "judge_interruption" || event?.type === "menu_corruption" || anomaly?.id === "sala-vacia";
}
