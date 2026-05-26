import Link from "next/link";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <Link href="/" className="campaign-choice mb-5 max-w-xs">Menu principal</Link>
        <AdminDashboard />
      </section>
    </main>
  );
}
