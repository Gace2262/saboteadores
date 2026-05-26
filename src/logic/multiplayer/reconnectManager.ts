import type { MatchState } from "./matchTypes";

const SNAPSHOT_KEY = "saboteadores-multiplayer-snapshot";

export function saveMatchSnapshot(state: MatchState, storage: Storage = localStorage) {
  storage.setItem(SNAPSHOT_KEY, JSON.stringify(state));
}

export function loadMatchSnapshot(storage: Storage = localStorage): MatchState | null {
  try {
    const raw = storage.getItem(SNAPSHOT_KEY);
    return raw ? (JSON.parse(raw) as MatchState) : null;
  } catch {
    return null;
  }
}

export function clearMatchSnapshot(storage: Storage = localStorage) {
  storage.removeItem(SNAPSHOT_KEY);
}

export const reconnectMessages = {
  lost: "El Tribunal perdio la conexion con la otra mente.",
  trying: "Intentando recuperar el expediente compartido.",
  restored: "Se restauro la audiencia.",
};
