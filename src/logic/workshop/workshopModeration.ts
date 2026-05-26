const forbiddenFragments = ["<script", "javascript:", "onerror=", "onload=", "eval(", "function(", "=>", "import(", "document.cookie"];
const blockedLanguage = ["odio real", "amenaza real", "malware", "pornografia ilegal"];

export function moderateWorkshopText(text: string) {
  const normalized = text.toLowerCase();
  const errors: string[] = [];
  if (forbiddenFragments.some((fragment) => normalized.includes(fragment))) {
    errors.push("El Tribunal rechazo esta expansion por actividad sospechosamente executable.");
  }
  if (blockedLanguage.some((fragment) => normalized.includes(fragment))) {
    errors.push("El expediente fue confiscado por exceso de caos ilegal.");
  }
  if (text.length > 5000) errors.push("Expediente demasiado grande para esta ventanilla.");
  return errors;
}
