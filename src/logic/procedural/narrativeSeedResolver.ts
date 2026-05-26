import type { MentalClimate, ProceduralNarrativeSeed } from "./proceduralTypes";
import type { SeededRandom } from "./seededRandom";

const themes: MentalClimate[] = ["culpa", "control", "burnout", "evasion", "silencio", "juicio", "catarsis", "caos", "perfeccion", "memoria"];
const titleParts = ["El Martillo Llego Tarde", "La Puerta Recordaba", "El Archivo Respiro", "La Culpa Pidio Silla", "El Mapa Se Declaro Testigo"];
const openings = [
  "El Tribunal abrio una puerta que nadie recuerda haber construido.",
  "Las sinapsis encendieron luces de emergencia con gusto teatral.",
  "El expediente desperto antes que tu voluntad.",
  "La mente reorganizo sus pasillos para negar responsabilidad.",
];
const narrators = ["Narrador con toga", "Secretario del colapso", "Coro administrativo", "Voz de pasillo", "Archivista cansado"];

export function resolveNarrativeSeed(random: SeededRandom): ProceduralNarrativeSeed {
  const theme = random.pick(themes);
  const number = random.int(100, 999);
  return {
    title: `Expediente ${number}: ${random.pick(titleParts)}`,
    openingLine: random.pick(openings),
    theme,
    narrator: random.pick(narrators),
  };
}
