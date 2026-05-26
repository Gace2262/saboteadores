import { WorkshopDetail } from "@/components/workshop/WorkshopDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function WorkshopDetailPage({ params }: Props) {
  const { id } = await params;
  return <WorkshopDetail id={id} />;
}
