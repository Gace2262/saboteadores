"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export function JudgmentButton({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      {...props}
      className={`judgment-button inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-amber-100/24 bg-amber-200/12 px-4 text-sm font-black uppercase text-amber-100 transition hover:bg-amber-200 hover:text-black disabled:opacity-45 ${className}`}
    >
      {children}
    </button>
  );
}
