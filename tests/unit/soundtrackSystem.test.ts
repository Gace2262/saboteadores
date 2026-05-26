import { describe, expect, it } from "vitest";
import { sfxCatalog } from "@/data/sfxCatalog";
import { soundtrackRoutes } from "@/data/soundtrackData";
import { soundtrackThemes } from "@/data/soundtrackThemes";
import { transitionForBossPhase } from "@/logic/audio/musicTransitions";
import { mapVisualEffectToSfx } from "@/logic/audio/sfxEngine";
import { resolveLayerPlan } from "@/logic/audio/soundtrackLayers";

describe("demo soundtrack system", () => {
  it("defines the required demo themes", () => {
    expect(soundtrackThemes.menu_tribunal_respira.name).toBe("El Tribunal Respira");
    expect(soundtrackThemes.battle_ansiedad_operativa.name).toBe("Ansiedad Operativa");
    expect(soundtrackThemes.boss_catedral_casi.name).toBe("Catedral del Casi");
    expect(soundtrackRoutes.victory).toBe("victory_suspension_sentencia");
    expect(soundtrackRoutes.defeat).toBe("defeat_archivo_fracaso");
  });

  it("activates stress and climax layers as intensity rises", () => {
    const calm = resolveLayerPlan("boss_catedral_casi", 0.1, 1);
    const intense = resolveLayerPlan("boss_catedral_casi", 0.85, 3);
    expect(calm.find((layer) => layer.layer === "stress")?.gain).toBe(0);
    expect(intense.find((layer) => layer.layer === "stress")?.gain).toBeGreaterThan(0);
    expect(intense.find((layer) => layer.layer === "climax")?.gain).toBeGreaterThan(0);
  });

  it("maps visual effects to memorable sfx", () => {
    expect(mapVisualEffectToSfx("hammer_slam")).toBe("hammer_slam");
    expect(mapVisualEffectToSfx("chains")).toBe("chains");
    expect(mapVisualEffectToSfx("liberation_burst")).toBe("liberation_burst");
  });

  it("keeps boss phase three as a silence break before impact", () => {
    expect(transitionForBossPhase(1)).toBe("fade");
    expect(transitionForBossPhase(2)).toBe("cinematic_drop");
    expect(transitionForBossPhase(3)).toBe("silence_break");
  });

  it("catalogues required core sfx", () => {
    expect(sfxCatalog.hammer_slam.subtitle).toBe("[MARTILLAZO]");
    expect(sfxCatalog.chains.subtitle).toBe("[CADENAS]");
    expect(sfxCatalog.boss_phase_transition.subtitle).toBe("[CORO JUDICIAL]");
    expect(sfxCatalog.panic_pulse.subtitle).toBe("[RESPIRACION DISTANTE]");
  });
});
