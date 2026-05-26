"use client";

import { loadGame, resetSave } from "@/logic/save/saveManager";

export function RecoverSaveButton() {
  return (
    <button
      className="campaign-choice max-w-xs"
      onClick={() => {
        const result = loadGame();
        if (!result.validation.valid) resetSave();
        window.location.reload();
      }}
    >
      Recuperar backup
    </button>
  );
}
