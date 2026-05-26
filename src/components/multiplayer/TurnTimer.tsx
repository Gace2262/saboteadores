"use client";

import { useEffect, useState } from "react";

export function TurnTimer({ seconds = 0, onTimeout }: { seconds?: number; onTimeout?: () => void }) {
  const [remaining, setRemaining] = useState(() => seconds);
  useEffect(() => {
    if (!seconds) return;
    const timer = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          onTimeout?.();
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [onTimeout, seconds]);
  return (
    <div className="rounded border border-cyan-100/20 bg-cyan-300/10 p-3 text-cyan-50">
      <p className="text-xs font-black uppercase">Timer</p>
      <p className="text-2xl font-black">{seconds ? `${remaining}s` : "Sin limite"}</p>
    </div>
  );
}
