"use client";

import Link from "next/link";
import { getNextDemoStage, type DemoStageId } from "@/data/demo/demoFlow";
import { useDemoStore } from "@/store/demoStore";

type Props = {
  current: DemoStageId;
};

export function DemoSkipButton({ current }: Props) {
  const completeStage = useDemoStore((state) => state.completeStage);
  const next = getNextDemoStage(current);
  return (
    <Link href={next.route} onClick={() => completeStage(current)} className="campaign-choice max-w-xs">
      Saltar escena
    </Link>
  );
}
