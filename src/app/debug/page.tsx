import { notFound } from "next/navigation";
import { DebugPanel } from "@/components/debug/DebugPanel";
import { requireDebugEnabled } from "@/lib/debugGate";

export default function DebugPage() {
  if (!requireDebugEnabled()) notFound();
  return <DebugPanel />;
}
