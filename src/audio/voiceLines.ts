import type { FactionId } from "@/data/factions";

export type VoiceLine = {
  id: string;
  text: string;
  route: string;
  pitch: number;
  echo: number;
  distortion: number;
  subtitle: string;
};

export const narratorLines: VoiceLine[] = [
  { id: "stress-fuel", text: "El Estres encontro combustible.", route: "/voice/narrator/stress-fuel.wav", pitch: 0.82, echo: 0.45, distortion: 0.2, subtitle: "El Estres encontro combustible." },
  { id: "chains-name", text: "Las cadenas aprenden tu nombre.", route: "/voice/narrator/chains-name.wav", pitch: 0.72, echo: 0.55, distortion: 0.28, subtitle: "Las cadenas aprenden tu nombre." },
  { id: "clarity-resists", text: "La claridad resiste.", route: "/voice/narrator/clarity-resists.wav", pitch: 1.05, echo: 0.28, distortion: 0, subtitle: "La claridad resiste." },
  { id: "tribunal-smiles", text: "El tribunal sonrie sin labios.", route: "/voice/narrator/tribunal-smiles.wav", pitch: 0.68, echo: 0.62, distortion: 0.35, subtitle: "El tribunal sonrie sin labios." },
  { id: "mind-reinforces", text: "Tu mente pidio refuerzos.", route: "/voice/narrator/mind-reinforces.wav", pitch: 0.9, echo: 0.35, distortion: 0.1, subtitle: "Tu mente pidio refuerzos." },
  { id: "silence-breaks", text: "El silencio acaba de romperse.", route: "/voice/narrator/silence-breaks.wav", pitch: 0.76, echo: 0.5, distortion: 0.22, subtitle: "El silencio acaba de romperse." },
];

export const cinematicVoiceLines: Record<string, VoiceLine> = {
  judgeEntrance: {
    id: "judge-entrance",
    text: "El tribunal interno entra en sesion.",
    route: "/voice/cinematic/judge-entrance.wav",
    pitch: 0.58,
    echo: 0.7,
    distortion: 0.2,
    subtitle: "El tribunal interno entra en sesion.",
  },
  criticalHammer: {
    id: "critical-hammer",
    text: "Orden en la sala.",
    route: "/voice/cinematic/critical-hammer.wav",
    pitch: 0.62,
    echo: 0.5,
    distortion: 0.3,
    subtitle: "Orden en la sala.",
  },
  legendaryCatharsis: {
    id: "legendary-catharsis",
    text: "Respira. La cadena esta cediendo.",
    route: "/voice/cinematic/legendary-catharsis.wav",
    pitch: 1.06,
    echo: 0.38,
    distortion: 0,
    subtitle: "Respira. La cadena esta cediendo.",
  },
};

export const bossVoiceTone: Partial<Record<FactionId, Pick<VoiceLine, "pitch" | "echo" | "distortion">>> = {
  juez: { pitch: 0.58, echo: 0.72, distortion: 0.22 },
  inquieto: { pitch: 1.18, echo: 0.25, distortion: 0.35 },
  perfeccionista: { pitch: 0.86, echo: 0.45, distortion: 0.12 },
  hipervigilante: { pitch: 1.02, echo: 0.3, distortion: 0.26 },
  hiperracional: { pitch: 0.78, echo: 0.2, distortion: 0.18 },
  victima: { pitch: 0.82, echo: 0.6, distortion: 0.14 },
  evitador: { pitch: 0.68, echo: 0.7, distortion: 0.08 },
};
