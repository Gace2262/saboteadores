import type { MusicLayerId, MusicThemeId } from "./musicTracks";

export type AmbientLayer = {
  id: MusicLayerId;
  label: string;
  minIntensity: number;
  route: string;
  subtitle: string;
};

export const ambientLayers: Record<MusicThemeId, AmbientLayer[]> = {
  "tribunal-craneo": [
    { id: "base", label: "Organo subterraneo", minIntensity: 0, route: "/ambient/organ.ogg", subtitle: "[ORGANO OSCURO]" },
    { id: "percussion", label: "Martillos de guerra", minIntensity: 35, route: "/ambient/hammer-drums.ogg", subtitle: "[PERCUSION PESADA]" },
    { id: "choir", label: "Coro judicial", minIntensity: 55, route: "/ambient/judge-choir.ogg", subtitle: "[CORO JUDICIAL]" },
    { id: "guitars", label: "Guitarras de sentencia", minIntensity: 72, route: "/ambient/judge-guitars.ogg", subtitle: "[GUITARRAS RAPIDAS]" },
    { id: "judicial", label: "Cadenas y campanas", minIntensity: 40, route: "/ambient/chains-bells.ogg", subtitle: "[CADENAS Y CAMPANAS]" },
    { id: "distortion", label: "Ruido mental", minIntensity: 80, route: "/ambient/mental-static.ogg", subtitle: "[ESTATICA MENTAL]" },
  ],
  "circo-pendientes": [],
  "catedral-casi": [],
  "torre-alarmas": [],
  "bunker-excel": [],
  "teatro-pobre-mi": [],
  "sala-espera": [],
  "home-ambient": [
    { id: "base", label: "Niebla mental", minIntensity: 0, route: "/ambient/home-fog.ogg", subtitle: "[AMBIENTE MENTAL]" },
    { id: "distortion", label: "Susurros lejanos", minIntensity: 50, route: "/ambient/home-whispers.ogg", subtitle: "[SUSURROS LEJANOS]" },
  ],
};

Object.keys(ambientLayers).forEach((key) => {
  const id = key as MusicThemeId;
  if (!ambientLayers[id].length) {
    ambientLayers[id] = [
      { id: "base", label: "Ambiente base", minIntensity: 0, route: `/ambient/${id}-base.ogg`, subtitle: "[AMBIENTE OSCURO]" },
      { id: "percussion", label: "Pulso tactico", minIntensity: 35, route: `/ambient/${id}-pulse.ogg`, subtitle: "[PERCUSION ENTRANDO]" },
      { id: "choir", label: "Coro interno", minIntensity: 60, route: `/ambient/${id}-choir.ogg`, subtitle: "[CORO LEJANO]" },
      { id: "distortion", label: "Distorsion mental", minIntensity: 82, route: `/ambient/${id}-distortion.ogg`, subtitle: "[DISTORSION MENTAL]" },
    ];
  }
});
