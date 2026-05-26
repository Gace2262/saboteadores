import type { WorkshopContent } from "./workshopTypes";

export function exportWorkshopContent(content: WorkshopContent) {
  return JSON.stringify({ exportedAt: new Date().toISOString(), content }, null, 2);
}

export function calculateWorkshopChecksum(content: Omit<WorkshopContent, "checksum">) {
  const raw = JSON.stringify({ ...content, createdAt: "", checksum: "" });
  let hash = 0;
  for (let index = 0; index < raw.length; index += 1) hash = Math.imul(31, hash) + raw.charCodeAt(index);
  return `ws_${(hash >>> 0).toString(16)}`;
}
