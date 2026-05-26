import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { createInitialMatchState } from "./matchState";
import type { NetworkAdapter } from "./networkAdapter";
import type { CreateMatchInput, MatchEvent } from "./matchTypes";

export class SupabaseRealtimeAdapter implements NetworkAdapter {
  async createMatch(input: CreateMatchInput) {
    const state = createInitialMatchState(input);
    const supabase = getSupabaseBrowserClient();
    if (!supabase || !isSupabaseConfigured()) return state;
    await supabase.from("matches").insert({
      id: state.matchId,
      status: state.status,
      mode: state.mode,
      seed: state.seed,
      created_at: new Date().toISOString(),
    });
    return state;
  }

  async joinMatch(): Promise<never> {
    throw new Error("Supabase Realtime joinMatch queda preparado para una etapa futura.");
  }

  async sendEvent(event: MatchEvent) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase || !isSupabaseConfigured()) return;
    await supabase.from("match_events").insert({
      id: event.id,
      match_id: event.matchId,
      player_id: event.playerId,
      sequence_number: event.sequenceNumber,
      event_type: event.type,
      payload: event.payload,
      checksum: event.checksum,
    });
  }

  subscribeToEvents(matchId: string, onEvent: (event: MatchEvent) => void) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase || !isSupabaseConfigured()) return () => {};
    const channel = supabase
      .channel(`match:${matchId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "match_events", filter: `match_id=eq.${matchId}` }, (payload) => {
        const row = payload.new as { id: string; match_id: string; player_id: string; event_type: MatchEvent["type"]; payload: MatchEvent["payload"]; sequence_number: number; checksum: string; created_at?: string };
        onEvent({
          id: row.id,
          matchId: row.match_id,
          playerId: row.player_id,
          type: row.event_type,
          payload: row.payload,
          timestamp: row.created_at ? Date.parse(row.created_at) : Date.now(),
          turnNumber: 0,
          sequenceNumber: row.sequence_number,
          checksum: row.checksum,
        });
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }

  async disconnect() {}

  async reconnect() {
    return null;
  }
}
