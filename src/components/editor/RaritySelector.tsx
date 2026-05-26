"use client";

import { rarityDefinitions, type CollectibleRarity } from "@/data/rarities";

export function RaritySelector({ value, onChange }: { value: CollectibleRarity; onChange: (value: CollectibleRarity) => void }) {
  return (
    <select className="editor-input" value={value} onChange={(event) => onChange(event.target.value as CollectibleRarity)}>
      {Object.values(rarityDefinitions).map((rarity) => (
        <option key={rarity.id} value={rarity.id}>{rarity.label}</option>
      ))}
    </select>
  );
}
