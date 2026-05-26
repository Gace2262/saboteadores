import { CardEvolutionDetail } from "@/components/evolution/CardEvolutionDetail";

export default async function EvolutionCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CardEvolutionDetail cardId={id} />;
}
