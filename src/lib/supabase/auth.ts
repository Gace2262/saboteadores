import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "./client";

export type AuthResult = { ok: boolean; message: string; user?: User | null };

export async function getCurrentUser(): Promise<AuthResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase || !isSupabaseConfigured()) return { ok: false, message: "Modo offline activo. El Tribunal guarda todo en este dispositivo." };
  const { data, error } = await supabase.auth.getUser();
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: data.user ? "Sesion activa." : "Sin sesion.", user: data.user };
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: false, message: "Supabase no configurado." };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "Sesion iniciada.", user: data.user };
}

export async function signUpWithEmail(email: string, password: string): Promise<AuthResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: false, message: "Supabase no configurado." };
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "Cuenta creada. Revisa tu correo si el proyecto exige confirmacion.", user: data.user };
}

export async function signInWithMagicLink(email: string): Promise<AuthResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: false, message: "Supabase no configurado." };
  const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: typeof location !== "undefined" ? location.origin : undefined } });
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "Magic link enviado. El Tribunal revisara tu inbox con cara seria." };
}

export async function signOut(): Promise<AuthResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: false, message: "Supabase no configurado." };
  const { error } = await supabase.auth.signOut();
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "Sesion cerrada." };
}
