"use client";

import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { getCurrentUser, signInWithEmail, signInWithMagicLink, signOut, signUpWithEmail } from "@/lib/supabase/auth";
import { isSupabaseConfigured } from "@/lib/supabase/client";

type AuthState = {
  configured: boolean;
  user: User | null;
  loading: boolean;
  message: string;
  refreshUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  magicLink: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  configured: isSupabaseConfigured(),
  user: null,
  loading: false,
  message: isSupabaseConfigured() ? "Supabase listo." : "Modo offline activo. El Tribunal guarda todo en este dispositivo.",
  refreshUser: async () => {
    set({ loading: true });
    const result = await getCurrentUser();
    set({ user: result.user ?? null, message: result.message, configured: isSupabaseConfigured(), loading: false });
  },
  login: async (email, password) => {
    set({ loading: true });
    const result = await signInWithEmail(email, password);
    set({ user: result.user ?? null, message: result.message, loading: false });
  },
  signup: async (email, password) => {
    set({ loading: true });
    const result = await signUpWithEmail(email, password);
    set({ user: result.user ?? null, message: result.message, loading: false });
  },
  magicLink: async (email) => {
    set({ loading: true });
    const result = await signInWithMagicLink(email);
    set({ message: result.message, loading: false });
  },
  logout: async () => {
    set({ loading: true });
    const result = await signOut();
    set({ user: null, message: result.message, loading: false });
  },
}));
