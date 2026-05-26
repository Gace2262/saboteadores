"use client";

import { allFactions, type FactionId } from "@/data/factions";

export function FactionSelector({ value, onChange }: { value: FactionId; onChange: (value: FactionId) => void }) {
  return (
    <select className="editor-input" value={value} onChange={(event) => onChange(event.target.value as FactionId)}>
      {allFactions.map((faction) => (
        <option key={faction.id} value={faction.id}>{faction.name}</option>
      ))}
    </select>
  );
}
