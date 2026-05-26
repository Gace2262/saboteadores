"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { clearErrorReports, readErrorReports, reportGameError, type GameErrorReport, type GameErrorType } from "@/logic/debug/errorReporter";

type ErrorStore = {
  errors: GameErrorReport[];
  lastCrashCode?: string;
  recordError: (input: { type: GameErrorType; message: string; screen: string; safeState?: Record<string, unknown> }) => void;
  refreshErrors: () => void;
  clearErrors: () => void;
};

export const useErrorStore = create<ErrorStore>()(
  persist(
    (set) => ({
      errors: [],
      recordError: (input) => {
        const report = reportGameError(input);
        set((state) => ({ errors: [report, ...state.errors].slice(0, 20), lastCrashCode: report.id }));
      },
      refreshErrors: () => set({ errors: readErrorReports() }),
      clearErrors: () => {
        clearErrorReports();
        set({ errors: [] });
      },
    }),
    { name: "saboteadores-error-store-v1" },
  ),
);
