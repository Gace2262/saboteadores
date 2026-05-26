"use client";

import { useAudioStore } from "@/store/audioStore";
import { useBossStore } from "@/store/bossStore";
import { useBuildStore } from "@/store/buildStore";
import { useCollectionStore, type StoryMode } from "@/store/collectionStore";
import { useProgressionStore } from "@/store/progressionStore";
import { useTribunalStore } from "@/store/tribunalStore";
import { useVisualStore, type AnimationMode } from "@/store/visualStore";
import { useWorldStore } from "@/store/worldStore";
import { cardThemes, type VisualThemeId } from "@/styles/cardThemes";
import { VisualIntensitySlider } from "./VisualIntensitySlider";

const flags = [
  ["reduceFlashes", "Reducir flashes"],
  ["reduceVibration", "Reducir vibracion"],
  ["noDistortion", "Modo sin distorsion"],
  ["streamerSafe", "Modo streamer safe"],
  ["subtitlesEnabled", "Subtitulos de sonidos"],
] as const;

export function AccessibilityPanel() {
  const state = useAudioStore();
  const visual = useVisualStore();
  const storyMode = useCollectionStore((collection) => collection.storyMode);
  const setStoryMode = useCollectionStore((collection) => collection.setStoryMode);
  const progression = useProgressionStore();
  const tribunal = useTribunalStore();
  const boss = useBossStore();
  const world = useWorldStore();
  const build = useBuildStore();
  return (
    <section className="rounded-lg border border-white/12 bg-black/52 p-5">
      <h2 className="text-2xl font-black">Accesibilidad</h2>
      <div className="mt-4 grid gap-3">
        {flags.map(([key, label]) => (
          <button key={key} className="campaign-choice justify-between" onClick={() => state.toggleFlag(key)}>
            {label}
            <strong className={state[key] ? "text-emerald-100" : "text-white/45"}>{state[key] ? "ON" : "OFF"}</strong>
          </button>
        ))}
        <VisualIntensitySlider />
        <label className="grid gap-2 text-xs font-black uppercase text-white/55">
          Modo historia
          <select
            value={storyMode}
            onChange={(event) => setStoryMode(event.target.value as StoryMode)}
            className="min-h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-white"
          >
            <option value="full">Historia completa</option>
            <option value="reduced">Historia reducida</option>
            <option value="skip-dialogues">Saltar dialogos</option>
            <option value="combat-only">Solo combates</option>
          </select>
        </label>
        <label className="grid gap-2 text-xs font-black uppercase text-white/55">
          Tema visual
          <select
            value={visual.visualTheme}
            onChange={(event) => visual.setVisualTheme(event.target.value as VisualThemeId)}
            className="min-h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-white"
          >
            {Object.values(cardThemes).map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="flex justify-between text-xs font-black uppercase text-white/55">
            Tamano de texto
            <strong className="text-amber-100">{Math.round(visual.textScale * 100)}%</strong>
          </span>
          <input
            type="range"
            min={0.85}
            max={1.2}
            step={0.01}
            value={visual.textScale}
            onChange={(event) => visual.setTextScale(Number(event.target.value))}
            className="w-full accent-amber-200"
          />
        </label>
        <label className="grid gap-2 text-xs font-black uppercase text-white/55">
          Modo de animacion de cartas
          <select
            value={visual.animationMode}
            onChange={(event) => visual.setAnimationMode(event.target.value as AnimationMode)}
            className="min-h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-white"
          >
            <option value="full">Animaciones completas</option>
            <option value="reduced">Animaciones reducidas</option>
            <option value="minimal">Sin cinematicas</option>
          </select>
        </label>
        {[
          ["reducedMotion", "Reducir movimiento de cartas"],
          ["disableFlashes", "Desactivar flashes cinematograficos"],
          ["activeParticles", "Particulas visuales"],
          ["lowPerformance", "Modo bajo rendimiento"],
          ["subtitlesEnabled", "Subtitulos visuales de eventos"],
        ].map(([key, label]) => (
          <button key={key} className="campaign-choice justify-between" onClick={() => visual.toggleFlag(key as never)}>
            {label}
            <strong className={visual[key as keyof typeof visual] ? "text-emerald-100" : "text-white/45"}>
              {visual[key as keyof typeof visual] ? "ON" : "OFF"}
            </strong>
          </button>
        ))}
        <button className="campaign-choice justify-between" onClick={progression.togglePopups}>
          Desactivar popups de progreso
          <strong className={progression.popupsDisabled ? "text-emerald-100" : "text-white/45"}>{progression.popupsDisabled ? "ON" : "OFF"}</strong>
        </button>
        <button className="campaign-choice justify-between" onClick={progression.toggleCleanCompetitiveMode}>
          Modo limpio competitivo
          <strong className={progression.cleanCompetitiveMode ? "text-emerald-100" : "text-white/45"}>{progression.cleanCompetitiveMode ? "ON" : "OFF"}</strong>
        </button>
        <button className="campaign-choice justify-between" onClick={tribunal.toggleDisableAnomalies}>
          Desactivar anomalías visuales
          <strong className={tribunal.disableAnomalies ? "text-emerald-100" : "text-white/45"}>{tribunal.disableAnomalies ? "ON" : "OFF"}</strong>
        </button>
        <button className="campaign-choice justify-between" onClick={tribunal.toggleReduceCorruptionVisuals}>
          Reducir corrupcion visual del menu
          <strong className={tribunal.reduceCorruptionVisuals ? "text-emerald-100" : "text-white/45"}>{tribunal.reduceCorruptionVisuals ? "ON" : "OFF"}</strong>
        </button>
        <button className="campaign-choice justify-between" onClick={tribunal.toggleLimitGlitches}>
          Limitar glitches del Tribunal Vivo
          <strong className={tribunal.limitGlitches ? "text-emerald-100" : "text-white/45"}>{tribunal.limitGlitches ? "ON" : "OFF"}</strong>
        </button>
        <button className="campaign-choice justify-between" onClick={tribunal.toggleStreamerSafe}>
          Modo streamer safe del Tribunal
          <strong className={tribunal.streamerSafe ? "text-emerald-100" : "text-white/45"}>{tribunal.streamerSafe ? "ON" : "OFF"}</strong>
        </button>
        <button className="campaign-choice justify-between" onClick={tribunal.toggleStableMode}>
          Modo estable
          <strong className={tribunal.stableMode ? "text-emerald-100" : "text-white/45"}>{tribunal.stableMode ? "ON" : "OFF"}</strong>
        </button>
        {[
          ["reduceDestruction", "Reducir destruccion de escenarios"],
          ["reduceShake", "Reducir shake de bosses"],
          ["reduceFlashes", "Reducir flashes colosales"],
          ["simplifiedCinematics", "Modo cinematico simplificado"],
          ["subtitlesForced", "Subtitulos cinematograficos obligatorios"],
          ["limitDistortion", "Limitar distorsion de escenario"],
        ].map(([key, label]) => (
          <button key={key} className="campaign-choice justify-between" onClick={() => boss.toggleFlag(key as never)}>
            {label}
            <strong className={boss[key as keyof typeof boss] ? "text-emerald-100" : "text-white/45"}>
              {boss[key as keyof typeof boss] ? "ON" : "OFF"}
            </strong>
          </button>
        ))}
        {[
          ["simplifiedMap", "Simplificar mapa mundial mental"],
          ["reduceParticles", "Reducir particulas del universo"],
          ["cleanWorldMode", "Modo limpio del universo"],
          ["fullSubtitles", "Subtitulos completos del universo"],
        ].map(([key, label]) => (
          <button key={key} className="campaign-choice justify-between" onClick={() => world.toggleFlag(key as never)}>
            {label}
            <strong className={world[key as keyof typeof world] ? "text-emerald-100" : "text-white/45"}>
              {world[key as keyof typeof world] ? "ON" : "OFF"}
            </strong>
          </button>
        ))}
        {[
          ["streamerMode", "Modo streamer para demo"],
          ["lowPerformanceMode", "Modo bajo rendimiento demo"],
          ["screenshotMode", "Screenshot mode"],
        ].map(([key, label]) => (
          <button
            key={key}
            className="campaign-choice justify-between"
            onClick={() => {
              if (key === "streamerMode") build.toggleStreamerMode();
              if (key === "lowPerformanceMode") build.toggleLowPerformanceMode();
              if (key === "screenshotMode") build.toggleScreenshotMode();
            }}
          >
            {label}
            <strong className={build[key as keyof typeof build] ? "text-emerald-100" : "text-white/45"}>
              {build[key as keyof typeof build] ? "ON" : "OFF"}
            </strong>
          </button>
        ))}
      </div>
    </section>
  );
}
