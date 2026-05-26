import Link from "next/link";
import { FeedbackForm } from "@/components/launch/FeedbackForm";
import { KnownIssuesPanel } from "@/components/launch/KnownIssuesPanel";
import { TesterInstructions } from "@/components/launch/TesterInstructions";

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a0f18,#050308_55%,#010102)] px-5 py-10 text-white">
      <section className="mx-auto grid max-w-6xl gap-5">
        <div>
          <Link href="/landing" className="campaign-choice max-w-xs">Volver a landing</Link>
        </div>
        <FeedbackForm />
        <div className="grid gap-5 md:grid-cols-2">
          <TesterInstructions />
          <KnownIssuesPanel />
        </div>
      </section>
    </main>
  );
}
