"use client";

import type { WorldEventId } from "@/data/worldEvents";
import { useWorldStore } from "@/store/worldStore";

export function SeasonEventButtons({ eventId }: { eventId: WorldEventId }) {
  const triggerGlobalEvent = useWorldStore((state) => state.triggerGlobalEvent);
  return (
    <button className="campaign-choice mt-4 max-w-xs" onClick={() => triggerGlobalEvent(eventId)}>
      Activar evento
    </button>
  );
}
