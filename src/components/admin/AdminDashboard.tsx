"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { BalanceEditor } from "./BalanceEditor";
import { CardEditor } from "./CardEditor";
import { EventEditor } from "./EventEditor";

export function AdminDashboard() {
  const [allowed, setAllowed] = useState(false);
  const [message, setMessage] = useState("Revisando toga administrativa...");

  useEffect(() => {
    const run = async () => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase || !isSupabaseConfigured()) {
        setMessage("Supabase no configurado. Panel admin en modo maqueta offline.");
        return;
      }
      const { data, error } = await supabase.rpc("is_admin");
      if (error) {
        setMessage(error.message);
        return;
      }
      setAllowed(Boolean(data));
      setMessage(Boolean(data) ? "Admin verificado." : "No eres admin. El martillo no se presta.");
    };
    run();
  }, []);

  return (
    <section className="grid gap-5">
      <div className="rounded-lg border border-amber-100/18 bg-black/62 p-6 text-white">
        <p className="text-sm font-black uppercase text-amber-100/65">Panel admin</p>
        <h1 className="mt-2 text-5xl font-black">Administracion de contenido</h1>
        <p className="mt-3 text-white/65">{message}</p>
      </div>
      {allowed ? (
        <div className="grid gap-5 lg:grid-cols-3">
          <CardEditor />
          <EventEditor />
          <BalanceEditor />
        </div>
      ) : (
        <div className="rounded-lg border border-white/10 bg-black/45 p-5 text-white/65">
          El panel queda preparado, pero no permite acciones peligrosas ni edicion de saves de usuarios en esta etapa.
        </div>
      )}
    </section>
  );
}
