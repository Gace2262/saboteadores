import Link from "next/link";
import { ModLibrary } from "@/components/mods/ModLibrary";

export default function ModsPage() {
  return (
    <>
      <nav className="fixed left-4 top-4 z-20 flex gap-2 text-xs text-white">
        <Link className="rounded border border-white/10 bg-black/50 px-3 py-2" href="/">
          Inicio
        </Link>
        <Link className="rounded border border-white/10 bg-black/50 px-3 py-2" href="/workshop">
          Workshop
        </Link>
      </nav>
      <ModLibrary />
    </>
  );
}
