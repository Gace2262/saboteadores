export type SoundEffectId = "hammer_slam" | "chains" | "catarsis" | "awaken" | "glitch" | "ui_seal" | "whisper" | "silence_break";

export type SoundEffectDesign = {
  id: SoundEffectId;
  subtitle: string;
  frequency: number;
  duration: number;
  intensity: number;
  design: string;
};

export const soundEffects: Record<SoundEffectId, SoundEffectDesign> = {
  hammer_slam: { id: "hammer_slam", subtitle: "[MARTILLAZO DISTANTE]", frequency: 52, duration: 1.1, intensity: 100, design: "Impacto grave, eco metalico y subbass." },
  chains: { id: "chains", subtitle: "[CADENAS RETORCIENDOSE]", frequency: 150, duration: 0.75, intensity: 68, design: "Metal arrastrandose, candado y tension." },
  catarsis: { id: "catarsis", subtitle: "[CORO LUMINOSO Y CRISTAL]", frequency: 440, duration: 1.25, intensity: 88, design: "Cristal rompiendose, coro suave y explosion blanca." },
  awaken: { id: "awaken", subtitle: "[RESPIRACION Y LUZ]", frequency: 392, duration: 1.15, intensity: 76, design: "Respiracion, luz y coro invertido." },
  glitch: { id: "glitch", subtitle: "[ESTATICA MENTAL]", frequency: 96, duration: 0.8, intensity: 74, design: "Ruido blanco, pitch inestable y corte seco." },
  ui_seal: { id: "ui_seal", subtitle: "[SELLO SUAVE]", frequency: 260, duration: 0.22, intensity: 32, design: "Click metalico leve con eco corto." },
  whisper: { id: "whisper", subtitle: "[SUSURRO ESTEREO]", frequency: 310, duration: 0.65, intensity: 42, design: "Whisper minimo, paneo y reverb." },
  silence_break: { id: "silence_break", subtitle: "[SILENCIO ROMPIENDOSE]", frequency: 38, duration: 0.5, intensity: 55, design: "Corte de audio seguido por golpe amortiguado." },
};
