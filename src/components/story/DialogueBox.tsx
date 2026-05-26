"use client";

import type { DialogueLine } from "@/data/story/dialogues";
import { characterVoices } from "@/data/story/characterVoices";
import { CharacterPortrait } from "./CharacterPortrait";

export function DialogueBox({ line }: { line: DialogueLine }) {
  const voice = Object.values(characterVoices).find((item) => item?.name === line.speaker);
  return (
    <div className="flex gap-4 rounded-lg border border-amber-100/16 bg-black/58 p-4">
      <CharacterPortrait glyph={line.portrait} color={voice?.color} />
      <div>
        <p className="text-sm font-black uppercase text-amber-100/62">{line.speaker}</p>
        <p className="mt-2 text-xl leading-8 text-white/78">{line.text}</p>
      </div>
    </div>
  );
}
