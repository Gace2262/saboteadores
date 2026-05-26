import { CardEditor } from "@/components/editor/CardEditor";
import { EditorShell } from "@/components/editor/EditorShell";

export default function EditorCardDetailPage({ params }: { params: { id: string } }) {
  return <EditorShell title={`Carta ${params.id}`}><CardEditor /></EditorShell>;
}
