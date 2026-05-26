import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export type SupabaseConfig = {
  url?: string;
  anonKey?: string;
  configured: boolean;
};

export const getSupabaseConfig = (): SupabaseConfig => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, anonKey, configured: Boolean(url && anonKey) };
};

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  const config = getSupabaseConfig();
  if (!config.configured || !config.url || !config.anonKey) return null;
  if (!browserClient) browserClient = createBrowserClient(config.url, config.anonKey);
  return browserClient;
}

export function isSupabaseConfigured() {
  return getSupabaseConfig().configured;
}
