export type AvatarCategory = "saboteador" | "conciencia" | "tribunal" | "glitch" | "humor-negro" | "legendario";

export type PlayerAvatar = {
  id: string;
  name: string;
  category: AvatarCategory;
  visual: string;
  unlockCondition: string;
  sigil: string;
  palette: string;
};

export const playerAvatars: PlayerAvatar[] = [
  { id: "juez", name: "El Juez", category: "tribunal", visual: "Silueta dorada, ojo brillante y cadenas flotando.", unlockCondition: "Derrota a El Juez.", sigil: "J", palette: "from-amber-200 via-yellow-600 to-black" },
  { id: "sobreviviente", name: "El Sobreviviente", category: "conciencia", visual: "Casco roto, humo mental y mirada cansada.", unlockCondition: "Disponible al iniciar.", sigil: "S", palette: "from-slate-200 via-zinc-600 to-black" },
  { id: "archivista", name: "El Archivista", category: "saboteador", visual: "Pergaminos, ojos azules frios y glitch racional.", unlockCondition: "Desbloquea 5 entradas de lore.", sigil: "A", palette: "from-cyan-200 via-blue-700 to-black" },
  { id: "payaso-interior", name: "El Payaso Interior", category: "humor-negro", visual: "Mascara agrietada, sonrisa torcida y humo violeta.", unlockCondition: "Desbloquea un logro secreto.", sigil: "P", palette: "from-violet-200 via-fuchsia-700 to-black" },
  { id: "caballero-estres", name: "El Caballero del Estres", category: "saboteador", visual: "Armadura oxidada, cafeina liquida y aura roja.", unlockCondition: "Acumula 100 Estres.", sigil: "E", palette: "from-rose-200 via-red-800 to-black" },
  { id: "catarsis", name: "La Catarsis", category: "legendario", visual: "Luz dorada, cadenas rompiendose y particulas blancas.", unlockCondition: "Usa Catarsis 20 veces.", sigil: "C", palette: "from-white via-amber-200 to-yellow-800" },
  { id: "dejo-obedecer", name: "El que dejo de obedecer", category: "legendario", visual: "Silla vacia, martillo callado y brillo imposible.", unlockCondition: "Final secreto.", sigil: "L", palette: "from-white via-emerald-200 to-black" },
];

export const getAvatar = (id?: string) => playerAvatars.find((avatar) => avatar.id === id) ?? playerAvatars[1];
