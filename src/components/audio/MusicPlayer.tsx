"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import { soundtrackThemes, type DemoSoundtrackThemeId } from "@/data/soundtrackThemes";
import { soundtrackController } from "@/logic/audio/soundtrackController";
import { transitionForBossPhase } from "@/logic/audio/musicTransitions";
import { ambienceForRoute } from "@/logic/audio/ambienceEngine";
import { useAudioStore } from "@/store/audioStore";
import { useRealGameStore } from "@/store/gameStore";
import { BattleIntensityMeter } from "./BattleIntensityMeter";

function resolveTheme(pathname: string, winner?: "win" | "loss"): DemoSoundtrackThemeId {
  if (winner === "win") return "victory_suspension_sentencia";
  if (winner === "loss") return "defeat_archivo_fracaso";
  if (pathname.includes("/battle")) return "boss_catedral_casi";
  if (pathname.includes("/demo")) return "menu_tribunal_respira";
  return "menu_tribunal_respira";
}

export function MusicPlayer() {
  const pathname = usePathname();
  const enabled = useAudioStore((state) => state.enabled);
  const started = useAudioStore((state) => state.started);
  const subtitlesEnabled = useAudioStore((state) => state.subtitlesEnabled);
  const subtitles = useAudioStore((state) => state.subtitles);
  const clearOldSubtitles = useAudioStore((state) => state.clearOldSubtitles);
  const toggleEnabled = useAudioStore((state) => state.toggleEnabled);
  const masterVolume = useAudioStore((state) => state.masterVolume);
  const musicVolume = useAudioStore((state) => state.musicVolume);
  const ambienceVolume = useAudioStore((state) => state.ambienceVolume);
  const choirVolume = useAudioStore((state) => state.choirVolume);
  const reducedDynamicRange = useAudioStore((state) => state.reducedDynamicRange);
  const player = useRealGameStore((state) => state.player);
  const enemy = useRealGameStore((state) => state.enemy);
  const bossPhase = useRealGameStore((state) => state.bossPhase);
  const winner = useRealGameStore((state) => state.winner);
  const demoMuted = useRealGameStore((state) => state.muted);
  const previousPhase = useRef(bossPhase);
  const previousWinner = useRef(winner);

  const intensity = useMemo(() => {
    const stressIntensity = Math.min(1, player.stress / 10);
    const dangerIntensity = Math.min(1, (30 - player.will) / 30);
    const bossPressure = bossPhase === 3 ? 0.9 : bossPhase === 2 ? 0.62 : 0.32;
    return winner ? 0.2 : Math.max(stressIntensity, dangerIntensity, bossPressure);
  }, [bossPhase, player.stress, player.will, winner]);

  const themeId = resolveTheme(pathname, winner);
  const theme = soundtrackThemes[themeId];

  useEffect(() => {
    soundtrackController.setMuted(demoMuted || !enabled);
    soundtrackController.updateMasterVolume();
  }, [ambienceVolume, choirVolume, demoMuted, enabled, masterVolume, musicVolume, reducedDynamicRange]);

  useEffect(() => {
    if (!started) return;
    soundtrackController.startTheme(themeId, intensity, bossPhase, ambienceForRoute(pathname));
  }, [bossPhase, intensity, pathname, started, themeId]);

  useEffect(() => {
    if (!started) return;
    if (previousPhase.current !== bossPhase) {
      soundtrackController.transition(transitionForBossPhase(bossPhase));
      soundtrackController.playSfx(bossPhase === 3 ? "perfection_break" : "boss_phase_transition");
      previousPhase.current = bossPhase;
    }
  }, [bossPhase, started]);

  useEffect(() => {
    if (!started || previousWinner.current === winner || !winner) return;
    soundtrackController.transition(winner === "win" ? "reverb_tail" : "impact_cut");
    soundtrackController.playSfx(winner === "win" ? "liberation_burst" : "hammer_slam");
    previousWinner.current = winner;
  }, [started, winner]);

  useEffect(() => {
    const timer = window.setInterval(clearOldSubtitles, 900);
    return () => window.clearInterval(timer);
  }, [clearOldSubtitles]);

  const startAudio = async () => {
    await soundtrackController.unlock();
    soundtrackController.playSfx("ui_confirm");
    soundtrackController.startTheme(themeId, intensity, bossPhase, ambienceForRoute(pathname));
  };

  return (
    <>
      <div className="fixed right-4 top-4 z-50 w-72 rounded-lg border border-amber-100/15 bg-black/70 p-3 text-white shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase text-amber-100/55">Soundtrack demo</p>
            <h2 className="text-sm font-black text-white">{theme.name}</h2>
          </div>
          <button className="icon-button" onClick={toggleEnabled} title={enabled ? "Silenciar audio" : "Activar audio"}>
            {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
        {!started ? (
          <button className="mt-3 min-h-9 w-full rounded-md bg-amber-200 px-3 text-xs font-black uppercase text-black" onClick={startAudio}>
            Activar audio del Tribunal
          </button>
        ) : (
          <div className="mt-3 grid gap-2">
            <BattleIntensityMeter value={Math.round(intensity * 100)} />
            <p className="text-[11px] text-white/52">
              {theme.mood} Boss {enemy.will}V / fase {bossPhase}
            </p>
          </div>
        )}
      </div>

      {subtitlesEnabled && subtitles.length ? (
        <div className="fixed bottom-16 left-1/2 z-50 grid -translate-x-1/2 gap-2 text-center">
          {subtitles.map((subtitle) => (
            <span key={subtitle.id} className="rounded bg-black/78 px-4 py-2 text-sm font-black uppercase text-amber-100">
              {subtitle.text}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );
}
