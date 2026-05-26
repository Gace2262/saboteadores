"use client";

import type { StoryChapter } from "@/data/story/chapters";

export function ChapterIntro({ chapter }: { chapter: StoryChapter }) {
  return (
    <section className="rounded-lg border border-amber-100/18 bg-black/60 p-5">
      <p className="text-sm font-black uppercase text-amber-100/65">Capitulo {chapter.order}</p>
      <h2 className="mt-2 text-4xl font-black">{chapter.title}</h2>
      <p className="mt-2 text-lg text-violet-100/80">{chapter.room}</p>
      <p className="mt-5 text-2xl font-black leading-9 text-white/82">{chapter.intro}</p>
      <p className="mt-4 leading-7 text-white/64">{chapter.entryLine}</p>
      <p className="mt-4 rounded-md border border-white/10 bg-white/6 p-3 text-sm text-white/60">{chapter.theme}</p>
    </section>
  );
}
