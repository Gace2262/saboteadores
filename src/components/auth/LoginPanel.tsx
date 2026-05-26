"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

export function LoginPanel() {
  const { configured, user, loading, message, refreshUser, login, signup, magicLink, logout } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  if (!configured) {
    return (
      <section className="rounded-lg border border-amber-100/18 bg-black/62 p-6 text-white">
        <p className="text-sm font-black uppercase text-amber-100/65">Modo offline</p>
        <h2 className="mt-2 text-3xl font-black">El Tribunal guarda todo aqui</h2>
        <p className="mt-3 text-white/65">Modo offline activo. El Tribunal guarda todo en este dispositivo.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-amber-100/18 bg-black/62 p-6 text-white">
      <p className="text-sm font-black uppercase text-amber-100/65">Cuenta Supabase opcional</p>
      <h2 className="mt-2 text-3xl font-black">{user ? "Sesion activa" : "Entrar al expediente cloud"}</h2>
      <p className="mt-3 rounded border border-white/10 bg-white/5 p-3 text-sm text-white/68">{message}</p>
      {user ? (
        <div className="mt-5 grid gap-3">
          <p className="text-white/70">{user.email}</p>
          <button className="campaign-danger max-w-xs" disabled={loading} onClick={logout}>Cerrar sesion</button>
        </div>
      ) : (
        <div className="mt-5 grid gap-3">
          <input className="rounded border border-white/10 bg-zinc-950 p-3 text-white" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input className="rounded border border-white/10 bg-zinc-950 p-3 text-white" placeholder="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <div className="flex flex-wrap gap-2">
            <button className="campaign-action max-w-xs" disabled={loading} onClick={() => login(email, password)}>Login</button>
            <button className="campaign-choice max-w-xs" disabled={loading} onClick={() => signup(email, password)}>Crear cuenta</button>
            <button className="campaign-choice max-w-xs" disabled={loading} onClick={() => magicLink(email)}>Magic link</button>
          </div>
        </div>
      )}
    </section>
  );
}
