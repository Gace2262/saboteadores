"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export function UserMenu() {
  const { configured, user, message, refreshUser, logout } = useAuthStore();
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <div className="rounded-lg border border-white/10 bg-black/50 p-4 text-white">
      <p className="text-xs font-black uppercase text-white/45">Cuenta</p>
      <p className="mt-2 text-sm text-white/65">{configured ? user?.email ?? "Sin sesion" : message}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {user ? <button className="campaign-danger max-w-xs" onClick={logout}>Logout</button> : <Link href="/login" className="campaign-choice max-w-xs">Login</Link>}
        <Link href="/sync" className="campaign-choice max-w-xs">Sync</Link>
      </div>
    </div>
  );
}
