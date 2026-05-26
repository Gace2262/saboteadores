export type DialogueLine = {
  speaker: string;
  portrait: string;
  text: string;
};

export type DialogueSceneData = {
  id: string;
  title: string;
  lines: DialogueLine[];
};

export const dialogueScenes: Record<string, DialogueSceneData> = {
  prologo: {
    id: "prologo",
    title: "La primera grieta",
    lines: [
      { speaker: "Narrador", portrait: "*", text: "No entraste a tu mente. Te citaron." },
      { speaker: "El Juez", portrait: "J", text: "Trajiste excusas o las improvisamos en sala?" },
      { speaker: "Claridad", portrait: "C", text: "No respondas todavia. Respira. Eso suele molestarle." },
    ],
  },
  juez: {
    id: "juez",
    title: "Antes del Tribunal del Craneo",
    lines: [
      { speaker: "El Juez", portrait: "J", text: "Has llegado tarde a tu propia sentencia." },
      { speaker: "Claridad", portrait: "C", text: "Llegar tarde tambien cuenta como llegar. Que tome nota." },
    ],
  },
};

export const getDialogueScene = (id?: string) => (id ? dialogueScenes[id] : undefined);
