import { ModDetailsPanel } from "@/components/mods/ModDetailsPanel";

export default async function ModDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ModDetailsPanel modId={id} />;
}
