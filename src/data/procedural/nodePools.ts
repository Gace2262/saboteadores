import type { ProceduralNodeType } from "@/logic/procedural/proceduralTypes";

export const actTitles = [
  "Acto I: Grietas Iniciales",
  "Acto II: Dominios del Mecanismo",
  "Acto III: Tribunal Profundo",
  "Acto IV: Audiencia Final",
];

export const nodeTitlePools: Record<ProceduralNodeType, string[]> = {
  combate: ["Migraña de apertura", "Pasillo de pensamientos automaticos", "Sala de tramites nerviosos", "Audiencia menor"],
  elite: ["Fiscal auxiliar del colapso", "Mecanismo con toga", "Campeon del casi", "Inspector del estres"],
  evento: ["Ascensor al Subconsciente", "Maquina de Cafe del Burnout", "Oficina de Objetos Perdidos", "El Espejo Sindicalizado", "Sala donde nadie opina"],
  descanso: ["Banco de respiracion dudosa", "Camilla de claridad", "Recreo no optimizado", "Pausa legalmente sospechosa"],
  tienda: ["Tienda de claridad", "Kiosco de objeciones", "Archivo de trueques", "Ventanilla de recursos"],
  anomalia: ["Puerta sin manilla", "Tribunal Vacio", "Martillo duplicado", "Pasillo que se acuerda de ti"],
  recompensa: ["Sello extraviado", "Sobre sin remitente", "Caja de herramientas mentales", "Reliquia con recibo"],
  boss: ["Dominio del Saboteador", "Audiencia de mecanismo mayor", "Sala del jefe", "Despacho con grietas"],
  juicio: ["Tribunal del Craneo", "Audiencia Final", "Sala de sentencia variable", "El Martillo al Fondo"],
  secreto: ["Sala de Apelaciones Imposibles", "Cementerio de Pendientes", "La Oficina del Yo Futuro", "Archivo que no figura"],
};

export const nodeSubtitles: Record<ProceduralNodeType, string[]> = {
  combate: ["El expediente empieza con letra chica.", "No era obligatorio sufrir, pero el mapa insistio.", "Primer intercambio de argumentos mal respirados."],
  elite: ["Mas peligro, mejores recompensas, peor postura.", "El Tribunal subio el volumen del problema.", "Aqui la ansiedad trae credencial."],
  evento: ["Una decision breve con consecuencias teatralmente largas.", "El mapa ofrece ayuda con cara rara.", "Narrativa con olor a oficina humeda."],
  descanso: ["Respirar sin monetizarlo. Escandaloso.", "La pausa existe. Nadie sabe como se usa.", "Recuperas algo parecido a dignidad."],
  tienda: ["Aceptan fragmentos, llaves y orgullo abollado.", "Nada es gratis salvo la sospecha.", "Compra herramientas, no excusas. Bueno, quizas una."],
  anomalia: ["La realidad del mapa parpadea.", "Algo cambio y nadie firmo autorizacion.", "El Tribunal improvisa con presupuesto de pesadilla."],
  recompensa: ["Un premio con mirada demasiado fija.", "El botin sonrie. Mala señal.", "Tu mazo recibe atencion no solicitada."],
  boss: ["Un Saboteador mayor tomo posesion de la sala.", "El mecanismo local exige audiencia.", "La puerta se cierra con autoestima adentro."],
  juicio: ["El martillo ya sabe tu nombre.", "La sentencia busca asiento.", "El final se puso toga."],
  secreto: ["No deberias estar aqui. Por eso el lugar es interesante.", "La ruta secreta huele a oportunidad y demanda.", "Un atajo con consecuencias bien vestidas."],
};
