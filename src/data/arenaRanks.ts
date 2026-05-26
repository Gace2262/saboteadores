export type ArenaRank = {
  id: string;
  name: string;
  minWins: number;
  reward: string;
  flavorText: string;
};

export const arenaRanks: ArenaRank[] = [
  { id: "becario", name: "Becario del Tribunal", minWins: 0, reward: "Sello de entrada", flavorText: "Todavia trae lapiz y esperanza." },
  { id: "inspector", name: "Inspector del Estres", minWins: 3, reward: "Marco rojo ansiedad", flavorText: "Puede detectar crisis por olor a calendario." },
  { id: "supervisor", name: "Supervisor del Caos", minWins: 7, reward: "Particulas de derrumbe", flavorText: "No arregla nada, pero lo etiqueta." },
  { id: "magistrado", name: "Magistrado Mental", minWins: 12, reward: "Fondo de arena judicial", flavorText: "Ya golpea la mesa con propiedad." },
  { id: "archivista", name: "Gran Archivista", minWins: 18, reward: "Tema azul frio", flavorText: "Ordeno la catastrofe alfabeticamente." },
  { id: "heraldo", name: "Heraldo del Martillo", minWins: 25, reward: "Efecto hammer premium", flavorText: "Anuncia sentencias con eco de estadio." },
  { id: "libre", name: "Libre Bajo Protesta", minWins: 35, reward: "Marco legendario de arena", flavorText: "Gano tanto que el tribunal pidio revision." },
];

export const getArenaRank = (wins: number) =>
  [...arenaRanks].reverse().find((rank) => wins >= rank.minWins) ?? arenaRanks[0];
