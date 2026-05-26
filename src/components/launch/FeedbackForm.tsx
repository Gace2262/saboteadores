"use client";

import { useEffect, useMemo, useState } from "react";

type FeedbackState = {
  rules: string;
  deck: string;
  difficulty: string;
  favorite: string;
  confusing: string;
  technical: string;
  comment: string;
  createdAt?: string;
};

const storageKey = "saboteadores-feedback-public-demo";

const initialFeedback: FeedbackState = {
  rules: "",
  deck: "",
  difficulty: "",
  favorite: "",
  confusing: "",
  technical: "",
  comment: "",
};

export function FeedbackForm() {
  const [feedback, setFeedback] = useState<FeedbackState>(initialFeedback);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setFeedback(JSON.parse(raw) as FeedbackState);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const payload = useMemo(() => ({ ...feedback, version: "0.1.0-public-demo" }), [feedback]);

  const update = (key: keyof FeedbackState, value: string) => {
    setSaved(false);
    setFeedback((state) => ({ ...state, [key]: value }));
  };

  const save = () => {
    const next = { ...feedback, createdAt: new Date().toISOString() };
    window.localStorage.setItem(storageKey, JSON.stringify(next, null, 2));
    setFeedback(next);
    setSaved(true);
  };

  const exportFeedback = () => {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "saboteadores-feedback-0.1.0-public-demo.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="rounded-xl border border-amber-100/18 bg-black/62 p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-100/55">Feedback local</p>
      <h1 className="mt-2 text-4xl font-black">Informe para el Tribunal</h1>
      <p className="mt-3 max-w-3xl text-white/64">
        No pedimos datos personales. Esto se guarda solo en tu dispositivo y puedes exportarlo como JSON.
      </p>
      <div className="mt-6 grid gap-4">
        {([
          ["rules", "Entendiste las reglas basicas?"],
          ["deck", "Que mazo usaste?"],
          ["difficulty", "Que tan dificil fue el boss?"],
          ["favorite", "Que parte fue mas entretenida?"],
          ["confusing", "Que parte fue confusa?"],
          ["technical", "Tuviste problemas tecnicos?"],
        ] as const).map(([key, label]) => (
          <label key={key} className="grid gap-2">
            <span className="text-sm font-black uppercase text-white/55">{label}</span>
            <input
              value={feedback[key]}
              onChange={(event) => update(key, event.target.value)}
              className="min-h-12 rounded-md border border-white/10 bg-black/55 px-3 text-white outline-none focus:border-amber-100/50"
            />
          </label>
        ))}
        <label className="grid gap-2">
          <span className="text-sm font-black uppercase text-white/55">Comentario libre opcional</span>
          <textarea
            value={feedback.comment}
            onChange={(event) => update("comment", event.target.value)}
            rows={5}
            className="rounded-md border border-white/10 bg-black/55 p-3 text-white outline-none focus:border-amber-100/50"
          />
        </label>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={save} className="campaign-action max-w-xs">Guardar local</button>
        <button type="button" onClick={exportFeedback} className="campaign-choice max-w-xs">Exportar JSON</button>
      </div>
      {saved ? <p className="mt-4 text-sm font-bold text-emerald-100">Feedback guardado localmente. El Tribunal archivo esto con una sonrisa sospechosa.</p> : null}
    </section>
  );
}
