"use client";

import { getTitle } from "@/data/titles";
import { useProfileStore } from "@/store/profileStore";
import { useProgressionStore } from "@/store/progressionStore";

export function TitleDisplay() {
  const favoriteTitle = useProfileStore((state) => state.favorites.titleId);
  const selectedTitle = useProgressionStore((state) => state.selectedTitleId);
  const title = getTitle(favoriteTitle ?? selectedTitle);
  return (
    <div className="inline-flex rounded-md border border-amber-100/25 bg-amber-100/10 px-3 py-2 text-sm font-black uppercase text-amber-100">
      {title?.name ?? "Funcionario del Caos"}
    </div>
  );
}
