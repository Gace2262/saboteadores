"use client";

import { useEffect } from "react";
import { useCloudStore } from "@/store/cloudStore";

export function SyncStatusBadge() {
  const { status, message, lastSyncAt, checkCloud } = useCloudStore();
  useEffect(() => {
    checkCloud();
  }, [checkCloud]);
  return (
    <div className="rounded-md border border-cyan-100/20 bg-cyan-300/10 p-3 text-sm text-cyan-50">
      <p className="font-black uppercase">Sync: {status}</p>
      <p className="mt-1 text-cyan-50/70">{message}</p>
      {lastSyncAt ? <p className="mt-1 text-xs text-white/45">Ultimo sync: {lastSyncAt}</p> : null}
    </div>
  );
}
