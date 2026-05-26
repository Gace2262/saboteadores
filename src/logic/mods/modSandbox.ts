import type { InstalledMod, ModCustomRules } from "./modTypes";

export type ModSandboxState = {
  activeModIds: string[];
  rules: Required<ModCustomRules>;
  officialAchievementsEnabled: boolean;
  message: string;
};

export function createModSandboxState(mods: InstalledMod[]): ModSandboxState {
  const enabled = mods.filter((mod) => mod.enabled && mod.validation.valid);
  const rules = enabled.reduce<Required<ModCustomRules>>(
    (acc, mod) => ({
      initialWillpower: mod.package.customRules?.initialWillpower ?? acc.initialWillpower,
      initialClarity: mod.package.customRules?.initialClarity ?? acc.initialClarity,
      initialStress: mod.package.customRules?.initialStress ?? acc.initialStress,
      handSize: mod.package.customRules?.handSize ?? acc.handSize,
      deckLimit: mod.package.customRules?.deckLimit ?? acc.deckLimit,
      eventFrequency: mod.package.customRules?.eventFrequency ?? acc.eventFrequency,
      rewardMultiplier: mod.package.customRules?.rewardMultiplier ?? acc.rewardMultiplier,
    }),
    { initialWillpower: 30, initialClarity: 2, initialStress: 0, handSize: 5, deckLimit: 40, eventFrequency: 1, rewardMultiplier: 1 },
  );
  return {
    activeModIds: enabled.map((mod) => mod.manifest.id),
    rules,
    officialAchievementsEnabled: enabled.length === 0,
    message: enabled.length ? "Logros oficiales pausados. El Tribunal no certifica caos importado." : "Sandbox limpio.",
  };
}
