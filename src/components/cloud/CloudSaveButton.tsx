"use client";

import { useCloudStore } from "@/store/cloudStore";

export function CloudSaveButton() {
  const { status, message, upload, download, sync } = useCloudStore();
  const disabled = status === "syncing";
  return (
    <section className="rounded-lg border border-amber-100/18 bg-black/62 p-5 text-white">
      <p className="text-sm font-black uppercase text-amber-100/65">Guardado cloud opcional</p>
      <h2 className="mt-2 text-3xl font-black">Sincronizacion del expediente</h2>
      <p className="mt-3 rounded border border-white/10 bg-white/5 p-3 text-sm text-white/65">{message}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="campaign-action max-w-xs" disabled={disabled} onClick={upload}>Subir local</button>
        <button className="campaign-choice max-w-xs" disabled={disabled} onClick={download}>Bajar nube</button>
        <button className="campaign-choice max-w-xs" disabled={disabled} onClick={() => sync("merge_safe")}>Fusion segura</button>
      </div>
    </section>
  );
}
