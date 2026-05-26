export type VoiceActorType = "judge" | "narrator" | "card" | "anomaly" | "boss";

export type AdvancedVoiceLine = {
  id: string;
  actor: VoiceActorType;
  text: string;
  subtitleKey: string;
  pitch: number;
  reverb: number;
  distortion: number;
  whisperLayer: boolean;
  audioByLocale?: Partial<Record<"es-CL" | "es" | "en" | "pt-BR", string>>;
};

export const advancedVoiceLines: AdvancedVoiceLine[] = [
  { id: "judge-audiencia", actor: "judge", text: "La audiencia continua.", subtitleKey: "voices.judge.audience", pitch: 0.62, reverb: 0.9, distortion: 0.25, whisperLayer: false },
  { id: "judge-patrones", actor: "judge", text: "Tus patrones ya declararon.", subtitleKey: "voices.judge.patterns", pitch: 0.58, reverb: 1, distortion: 0.35, whisperLayer: true },
  { id: "narrator-stress-door", actor: "narrator", text: "El estres encontro otra puerta.", subtitleKey: "voices.narrator.stressDoor", pitch: 0.9, reverb: 0.45, distortion: 0.08, whisperLayer: false },
  { id: "narrator-clarity", actor: "narrator", text: "La claridad sigue respirando.", subtitleKey: "voices.narrator.clarity", pitch: 1, reverb: 0.4, distortion: 0, whisperLayer: false },
  { id: "card-again", actor: "card", text: "Otra vez nosotros.", subtitleKey: "voices.card.again", pitch: 1.1, reverb: 0.35, distortion: 0.12, whisperLayer: true },
  { id: "card-questionable", actor: "card", text: "Excelente decision cuestionable.", subtitleKey: "voices.card.questionable", pitch: 1.04, reverb: 0.25, distortion: 0.1, whisperLayer: false },
];
