"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, Music2, Pause, Volume2, VolumeX, X } from "lucide-react";
import { soundtrackThemes, type DemoSoundtrackThemeId } from "@/data/soundtrackThemes";
import { ambienceForRoute } from "@/logic/audio/ambienceEngine";
import { transitionForBossPhase } from "@/logic/audio/musicTransitions";
import { soundtrackController } from "@/logic/audio/soundtrackController";
import { useAudioStore } from "@/store/audioStore";
import { useRealGameStore } from "@/store/gameStore";
import { BattleIntensityMeter } from "./BattleIntensityMeter";

function resolveTheme(pathname: string, winner?: "win" | "loss"): DemoSoundtrackThemeId {
  if (winner === "win") return "victory_suspension_sentencia";
  if (winner === "loss") return "defeat_archivo_fracaso";
  if (pathname.includes("/battle")) return "boss_catedral_casi";
  return "menu_tribunal_respira";
}

export function MusicPlayer() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const enabled = useAudioStore((state) => state.enabled);
  const started = useAudioStore((state) => state.started);
  const subtitlesEnabled = useAudioStore((state) => state.subtitlesEnabled);
  const subtitles = useAudioStore((state) => state.subtitles);
  const clearOldSubtitles = useAudioStore((state) => state.clearOldSubtitles);
  const toggleEnabled = useAudioStore((state) => state.toggleEnabled);
  const setVolume = useAudioStore((state) => state.setVolume);
  const masterVolume = useAudioStore((state) => state.masterVolume);
  const musicVolume = useAudioStore((state) => state.musicVolume);
  const effectsVolume = useAudioStore((state) => state.effectsVolume);
  const ambienceVolume = useAudioStore((state) => state.ambienceVolume);
  const choirVolume = useAudioStore((state) => state.choirVolume);
  const reducedDynamicRange = useAudioStore((state) => state.reducedDynamicRange);
  const player = useRealGameStore((state) => state.player);
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

  const startAudio = async () => {
    await soundtrackController.unlock();
    soundtrackController.playSfx("ui_confirm");
    soundtrackController.startTheme(themeId, intensity, bossPhase, ambienceForRoute(pathname));
  };

  useEffect(() => {
    soundtrackController.setMuted(demoMuted || !enabled);
    soundtrackController.updateMasterVolume();
  }, [ambienceVolume, choirVolume, demoMuted, effectsVolume, enabled, masterVolume, musicVolume, reducedDynamicRange]);

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

  const pauseAudio = () => {
    soundtrackController.pause();
  };

  const openAudioPanel = () => {
    setExpanded(true);
  };

  return (
    <>
      <div className="fixed bottom-3 right-3 z-[80] text-white sm:bottom-4 sm:right-4">
        {expanded ? (
          <div className="w-[calc(100vw-1.5rem)] max-w-sm rounded-lg border border-amber-100/15 bg-black/82 p-3 shadow-2xl backdrop-blur sm:w-80">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase text-amber-100/55">Audio del Tribunal</p>
                <h2 className="truncate text-sm font-black text-white">{theme.name}</h2>
              </div>
              <div className="flex shrink-0 gap-2">
                <button className="icon-button" onClick={toggleEnabled} title={enabled ? "Silenciar audio" : "Activar audio"}>
                  {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button className="icon-button" onClick={() => setExpanded(false)} title="Minimizar audio">
                  <ChevronUp size={16} />
                </button>
                <button className="icon-button" onClick={() => { pauseAudio(); setExpanded(false); }} title="Cerrar soundtrack">
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="mt-3 grid gap-2">
              {!started ? (
                <button className="min-h-10 w-full rounded-md bg-amber-200 px-3 text-xs font-black uppercase text-black" onClick={startAudio}>
                  Activar audio
                </button>
              ) : (
                <button className="min-h-10 w-full rounded-md border border-white/10 bg-white/[0.06] px-3 text-xs font-black uppercase text-white" onClick={pauseAudio}>
                  <span className="inline-flex items-center gap-2"><Pause size={14} /> Pausar soundtrack</span>
                </button>
              )}
              <BattleIntensityMeter value={Math.round(intensity * 100)} />
              {([
                ["masterVolume", "Master", masterVolume],
                ["musicVolume", "Musica", musicVolume],
                ["effectsVolume", "SFX", effectsVolume],
              ] as const).map(([key, label, value]) => (
                <label key={key} className="grid gap-1 text-[11px] font-bold uppercase text-white/55">
                  <span className="flex justify-between"><span>{label}</span><span>{Math.round(value * 100)}%</span></span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={value}
                    onChange={(event) => setVolume(key, Number(event.target.value))}
                    className="w-full accent-amber-200"
                  />
                </label>
              ))}
            </div>
          </div>
        ) : (
          <button
            type="button"
            aria-expanded={expanded}
            aria-label="Controles de audio"
            onPointerDown={() => {
              openAudioPanel();
            }}
            onTouchStart={() => {
              openAudioPanel();
            }}
            onClick={openAudioPanel}
            className="grid h-12 w-12 place-items-center rounded-full border border-amber-100/25 bg-black/78 text-amber-100 shadow-[0_0_28px_rgba(242,211,123,0.18)] backdrop-blur"
            title="Controles de audio"
          >
            {enabled && started && !demoMuted ? <Music2 size={20} /> : <ChevronDown size={20} />}
          </button>
        )}
      </div>

      {subtitlesEnabled && subtitles.length ? (
        <div className="fixed bottom-20 left-1/2 z-40 grid w-[calc(100vw-1rem)] max-w-lg -translate-x-1/2 gap-2 text-center sm:bottom-16">
          {subtitles.map((subtitle) => (
            <span key={subtitle.id} className="rounded bg-black/78 px-4 py-2 text-xs font-black uppercase text-amber-100 sm:text-sm">
              {subtitle.text}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );
}
