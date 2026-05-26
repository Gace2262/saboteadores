export type ModPermission =
  | "cards"
  | "bosses"
  | "events"
  | "campaigns"
  | "cosmetics"
  | "backgrounds"
  | "dialogues"
  | "missions"
  | "custom_rules";

export type ModTrustState = "local" | "verified_future" | "unverified" | "incompatible" | "unsafe";

export type ModContentWarning =
  | "flashing"
  | "loud_audio"
  | "dark_theme"
  | "intense_motion"
  | "psychological_horror";

export const allowedModPermissions: ModPermission[] = [
  "cards",
  "bosses",
  "events",
  "campaigns",
  "cosmetics",
  "backgrounds",
  "dialogues",
  "missions",
  "custom_rules",
];

export const forbiddenModFields = [
  "script",
  "scripts",
  "javascript",
  "eval",
  "html",
  "iframe",
  "remoteUrl",
  "tracking",
  "telemetry",
  "serviceRole",
  "deleteSave",
  "localStorage",
];

export const modWarningLabels: Record<ModContentWarning, string> = {
  flashing: "Destellos",
  loud_audio: "Audio fuerte",
  dark_theme: "Tema oscuro",
  intense_motion: "Movimiento intenso",
  psychological_horror: "Horror psicologico",
};
