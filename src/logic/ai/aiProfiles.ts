import type { FactionId } from "@/data/factions";
import type { AIProfile, AITaunts } from "./aiTypes";

const makeTaunts = (lines: {
  combatStart: string[];
  legendary?: string[];
  block?: string[];
  takeDamage?: string[];
  playerStressHigh?: string[];
  nearWin?: string[];
  lose?: string[];
  playCard?: string[];
}): AITaunts => ({
  combatStart: lines.combatStart,
  legendary: lines.legendary ?? ["Esto amerita luces, humo y una decision pesima."],
  block: lines.block ?? ["Quieto ahi. La libertad esta en mantenimiento."],
  takeDamage: lines.takeDamage ?? ["Interesante. Dolio, asi que lo negare con estilo."],
  playerStressHigh: lines.playerStressHigh ?? ["Tu Estres esta haciendo solo de bateria."],
  nearWin: lines.nearWin ?? ["Ya casi termino de decorar tu derrota."],
  lose: lines.lose ?? ["Esto no absuelve nada. Solo pospone mi monologo."],
  playCard: lines.playCard ?? ["Procedo con una mala idea muy bien presentada."],
});

export const aiProfiles: Record<FactionId, AIProfile> = {
  juez: {
    id: "juez",
    name: "El Juez",
    displayName: "El Juez Interior",
    personality: {
      style: "Castigo, bloqueo y sentencias con martillo dramatico.",
      weakness: "Vulnerable a cartas de Catarsis y Despertar.",
      danger: "Convierte tu Estres en evidencia y tu Claridad en material confiscado.",
      warning: "El tribunal no descansa. Solo cambia de victima.",
      color: "#f2d37b",
    },
    weights: { aggression: 9, defense: 4, control: 9, chaos: 2, healing: 1, stressPressure: 8, cardDraw: 3, comboPriority: 8 },
    taunts: makeTaunts({
      combatStart: ["Silencio. Tu autoestima esta en desacato.", "Presento como evidencia tus pensamientos de las 3 AM.", "Culpable hasta nuevo colapso."],
      legendary: ["La sala se pone de pie. Mala senal para ti."],
      block: ["Objecion concedida por mi, para mi, contra ti."],
      playerStressHigh: ["Tu Estres acaba de firmar declaracion voluntaria."],
      nearWin: ["Solo falta una firma. La tuya, temblando."],
      lose: ["El martillo cae... pero esta vez no sobre ti."],
    }),
    pattern: {
      preferredKeywords: ["Sentencia", "Cadena", "Culpa"],
      punishKeywords: ["Catarsis", "Despertar"],
      preferredEffects: ["hammer_slam", "chains"],
      openingLine: "El estrado se oscurece. El martillo respira.",
    },
  },
  controlador: {
    id: "controlador",
    name: "Controlador",
    displayName: "Controlador",
    personality: {
      style: "Bloqueo, manipulacion y control de recursos.",
      weakness: "Vulnerable a cartas de Caos e Ironia.",
      danger: "Reduce opciones hasta que obedecer parezca estrategia.",
      warning: "Tu libertad esta pendiente de aprobacion.",
      color: "#d7a74f",
    },
    weights: { aggression: 4, defense: 5, control: 10, chaos: 1, healing: 4, stressPressure: 4, cardDraw: 3, comboPriority: 7 },
    taunts: makeTaunts({
      combatStart: ["No te preocupes. Ya decidi por todos.", "Tu libertad esta pendiente de aprobacion.", "Improvisar fue eliminado del presupuesto."],
      block: ["Formulario 38-B: permiso para respirar, denegado."],
      nearWin: ["Todo bajo control. Incluso tu panico."],
    }),
    pattern: { preferredKeywords: ["Cadena", "Culpa"], punishKeywords: ["Caos", "Ironia"], preferredEffects: ["chains", "sarcasm_spark"], openingLine: "Se apagan las salidas. Aparece una planilla con candado." },
  },
  perfeccionista: {
    id: "perfeccionista",
    name: "Perfeccionista",
    displayName: "Perfeccionista",
    personality: {
      style: "Castiga errores, manos incompletas y cualquier cosa que respire normal.",
      weakness: "Vulnerable a cartas de Aceptacion.",
      danger: "Escala con cartas caras y convierte lo casi bueno en funeral.",
      warning: "Casi ganaste. Que tragedia tan pulcra.",
      color: "#f2d37b",
    },
    weights: { aggression: 8, defense: 4, control: 5, chaos: 2, healing: 2, stressPressure: 7, cardDraw: 2, comboPriority: 7 },
    taunts: makeTaunts({
      combatStart: ["Casi ganaste. Que tragedia tan pulcra.", "Eso estuvo bien. Por eso duele corregirlo.", "La mediocridad pidio permiso para respirar."],
      legendary: ["Ahora si: una catastrofe con borde dorado."],
      playerStressHigh: ["Tu Estres esta desalineado. Me ofende y me alimenta."],
    }),
    pattern: { preferredKeywords: ["Sentencia", "Derrumbe", "Culpa"], punishKeywords: ["Aceptacion"], preferredEffects: ["panic_pulse", "hammer_slam"], openingLine: "La Catedral del Casi abre sus puertas con una regla milimetrica." },
  },
  inquieto: {
    id: "inquieto",
    name: "Inquieto",
    displayName: "Inquieto",
    personality: {
      style: "Velocidad, muchas cartas y caos con respiracion agitada.",
      weakness: "Vulnerable a Silencio y Enfoque.",
      danger: "Acepta Estres si eso compra dano, robo o drama en movimiento.",
      warning: "Tengo 14 planes y ninguno tiene frenos.",
      color: "#9f5cff",
    },
    weights: { aggression: 8, defense: 2, control: 3, chaos: 10, healing: 1, stressPressure: 7, cardDraw: 7, comboPriority: 6 },
    taunts: makeTaunts({
      combatStart: ["Vamos rapido, que ya me aburri de esta crisis.", "Tengo 14 planes y ninguno tiene frenos.", "Dormir es una beta sin soporte."],
      playCard: ["Otra carta. Otra alarma. Otro cafe imaginario."],
    }),
    pattern: { preferredKeywords: ["Estampida", "Ironia", "Obsesion"], punishKeywords: ["Silencio", "Enfoque"], preferredEffects: ["horse_stampede", "panic_pulse"], openingLine: "El tablero empieza a galopar aunque nadie dio la orden." },
  },
  hipervigilante: {
    id: "hipervigilante",
    name: "Hipervigilante",
    displayName: "Hipervigilante",
    personality: {
      style: "Trampas, defensa preventiva y contraataques por si acaso.",
      weakness: "Vulnerable a Confianza.",
      danger: "Sube Estres antes de que exista motivo, por eficiencia apocaliptica.",
      warning: "La calma es claramente una emboscada.",
      color: "#ff5d86",
    },
    weights: { aggression: 5, defense: 8, control: 6, chaos: 5, healing: 2, stressPressure: 9, cardDraw: 3, comboPriority: 6 },
    taunts: makeTaunts({
      combatStart: ["No paso nada. Sospechoso.", "He preparado una alarma para tu alarma.", "La calma es claramente una emboscada."],
      takeDamage: ["Lo sabia. No sabia que, pero lo sabia."],
    }),
    pattern: { preferredKeywords: ["Mascara", "Obsesion", "Cadena"], punishKeywords: ["Confianza"], preferredEffects: ["panic_pulse", "chains"], openingLine: "Se encienden sirenas en lugares que no tienen paredes." },
  },
  hiperracional: {
    id: "hiperracional",
    name: "Hiperracional",
    displayName: "Hiperracional",
    personality: {
      style: "Robo, calculo, anulacion emocional y planillas frias.",
      weakness: "Vulnerable a Intuicion.",
      danger: "Reduce Claridad y archiva tus emociones por inconsistencia.",
      warning: "Sentir fue descartado por falta de evidencia.",
      color: "#7fb7ff",
    },
    weights: { aggression: 4, defense: 5, control: 7, chaos: 1, healing: 2, stressPressure: 5, cardDraw: 9, comboPriority: 8 },
    taunts: makeTaunts({
      combatStart: ["He calculado que sentir era innecesario.", "Tu esperanza carece de respaldo estadistico.", "La emocion fue archivada por inconsistencia."],
      block: ["Anulado por falta de formato."],
    }),
    pattern: { preferredKeywords: ["Culpa", "Derrumbe", "Sentencia"], punishKeywords: ["Intuicion"], preferredEffects: ["guilt_rain", "sarcasm_spark"], openingLine: "El Archivo Frio abre gavetas con temperatura de despedida." },
  },
  complaciente: {
    id: "complaciente",
    name: "Complaciente",
    displayName: "Complaciente",
    personality: {
      style: "Curacion, sacrificio y deuda emocional con sonrisa.",
      weakness: "Vulnerable a Limites.",
      danger: "Se cura mientras te cobra gratitud con intereses.",
      warning: "Mi amor viene con letra chica.",
      color: "#ff9f7a",
    },
    weights: { aggression: 3, defense: 7, control: 6, chaos: 2, healing: 10, stressPressure: 5, cardDraw: 2, comboPriority: 5 },
    taunts: makeTaunts({
      combatStart: ["No es chantaje emocional si lo digo sonriendo.", "Te ayude tanto que ahora me debes personalidad.", "Mi amor viene con letra chica."],
      nearWin: ["Gano yo, pero lo hago por nosotros. Sobre todo por mi."],
    }),
    pattern: { preferredKeywords: ["Cadena", "Culpa", "Despertar"], punishKeywords: ["Limites"], preferredEffects: ["chains", "guilt_rain"], openingLine: "La mesa se llena de favores con precio escondido." },
  },
  victima: {
    id: "victima",
    name: "Victima",
    displayName: "Victima",
    personality: {
      style: "Reflejo de dano, culpa y desgaste con cortina dramatica.",
      weakness: "Vulnerable a Responsabilidad.",
      danger: "Convierte cada golpe en evidencia de tragedia personal.",
      warning: "No quiero hacer drama, pero ya alquile teatro.",
      color: "#b887ff",
    },
    weights: { aggression: 5, defense: 6, control: 5, chaos: 7, healing: 5, stressPressure: 8, cardDraw: 2, comboPriority: 5 },
    taunts: makeTaunts({
      combatStart: ["No quiero hacer drama, pero ya alquile teatro.", "Mira lo que me obligaste a sentir.", "Sufro, luego existo."],
      takeDamage: ["Gracias por financiar mi narrativa."],
    }),
    pattern: { preferredKeywords: ["Ironia", "Culpa", "Derrumbe"], punishKeywords: ["Responsabilidad"], preferredEffects: ["guilt_rain", "void_laugh"], openingLine: "Cae el telon y alguien cobra entrada al sufrimiento." },
  },
  evitador: {
    id: "evitador",
    name: "Evitador",
    displayName: "Evitador",
    personality: {
      style: "Retraso, congelamiento y negacion con calendario flexible.",
      weakness: "Vulnerable a Accion Directa.",
      danger: "Evita dano letal y prolonga la partida hasta que el problema se jubile.",
      warning: "La valentia esta cargando... 2%.",
      color: "#5f8ec7",
    },
    weights: { aggression: 2, defense: 10, control: 7, chaos: 3, healing: 4, stressPressure: 3, cardDraw: 4, comboPriority: 5 },
    taunts: makeTaunts({
      combatStart: ["Esto lo resolvemos manana. Manana es un concepto flexible.", "El problema no existe si minimizo la ventana.", "La valentia esta cargando... 2%."],
      nearWin: ["Ganar cuenta como enfrentar algo? Que incomodo."],
    }),
    pattern: { preferredKeywords: ["Mascara", "Derrumbe", "Cadena"], punishKeywords: ["Accion Directa"], preferredEffects: ["void_laugh", "chains"], openingLine: "La Sala de Espera Eterna abre una silla que nunca termina." },
  },
  reservado: {
    id: "reservado",
    name: "Reservado",
    displayName: "Reservado",
    personality: {
      style: "Sigilo, defensa y presion acumulada detras de una cara tranquila.",
      weakness: "Vulnerable a Expresion.",
      danger: "Reduce dano ahora para atacar despues con humo saliendo del alma.",
      warning: "Mi silencio tiene subtitulos amenazantes.",
      color: "#8d8294",
    },
    weights: { aggression: 4, defense: 9, control: 5, chaos: 2, healing: 3, stressPressure: 6, cardDraw: 3, comboPriority: 6 },
    taunts: makeTaunts({
      combatStart: ["Estoy bien. Solo hay humo saliendo del alma.", "No dije nada. Ese fue mi discurso completo.", "Mi silencio tiene subtitulos amenazantes."],
      takeDamage: ["No paso nada. Ignoremos las chispas."],
    }),
    pattern: { preferredKeywords: ["Mascara", "Catarsis", "Derrumbe"], punishKeywords: ["Expresion"], preferredEffects: ["void_laugh", "sarcasm_spark"], openingLine: "El bunker cierra la puerta con una calma demasiado ruidosa." },
  },
  conciencia: {
    id: "conciencia",
    name: "Conciencia",
    displayName: "Conciencia Rival",
    personality: {
      style: "Claridad, catarsis y dano hecho cancion.",
      weakness: "Vulnerable a Culpa si se deja convencer.",
      danger: "Convierte Estres en liberacion ofensiva.",
      warning: "La jaula aprendio a cantar, y desafina con intencion.",
      color: "#7fffd4",
    },
    weights: { aggression: 6, defense: 6, control: 3, chaos: 3, healing: 7, stressPressure: 4, cardDraw: 3, comboPriority: 7 },
    taunts: makeTaunts({ combatStart: ["Respira. Luego pega. En ese orden dramatico."] }),
    pattern: { preferredKeywords: ["Catarsis", "Despertar"], punishKeywords: ["Culpa"], preferredEffects: ["liberation_burst"], openingLine: "Una luz aparece con botas de concierto." },
  },
  trascendencia: {
    id: "trascendencia",
    name: "Trascendencia",
    displayName: "Trascendencia Rival",
    personality: {
      style: "Limpieza, voluntad y cadenas oxidadas.",
      weakness: "Vulnerable a presion sostenida.",
      danger: "Recupera recursos mientras rompe bloqueo mental.",
      warning: "La paz interior trajo casco.",
      color: "#fff2a8",
    },
    weights: { aggression: 4, defense: 7, control: 3, chaos: 2, healing: 8, stressPressure: 2, cardDraw: 3, comboPriority: 6 },
    taunts: makeTaunts({ combatStart: ["Hoy no nos atropella el cerebro. Esa es la amenaza."] }),
    pattern: { preferredKeywords: ["Despertar", "Catarsis"], punishKeywords: ["Cadena"], preferredEffects: ["liberation_burst"], openingLine: "La luz dorada entra con seguro medico dudoso." },
  },
};

export const getAIProfile = (id: FactionId = "juez") => aiProfiles[id] ?? aiProfiles.juez;
