create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  status text not null check (status in ('waiting', 'ready', 'in_match', 'finished', 'disconnected')),
  mode text not null,
  seed text not null,
  created_by uuid references auth.users(id) on delete set null,
  winner_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.match_players (
  match_id uuid not null references public.matches(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  player_slot int not null check (player_slot in (1, 2)),
  deck_snapshot jsonb not null,
  status text not null default 'ready',
  primary key (match_id, user_id)
);

create table if not exists public.match_events (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  player_id uuid not null references auth.users(id) on delete cascade,
  sequence_number int not null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  checksum text not null,
  created_at timestamptz not null default now(),
  unique (match_id, sequence_number)
);

create table if not exists public.private_rooms (
  id uuid primary key default gen_random_uuid(),
  room_code text not null unique,
  host_user_id uuid not null references auth.users(id) on delete cascade,
  status text not null check (status in ('waiting', 'ready', 'in_match', 'finished')),
  created_at timestamptz not null default now()
);

alter table public.matches enable row level security;
alter table public.match_players enable row level security;
alter table public.match_events enable row level security;
alter table public.private_rooms enable row level security;

create policy matches_read_own on public.matches
for select using (
  created_by = auth.uid()
  or exists (select 1 from public.match_players mp where mp.match_id = matches.id and mp.user_id = auth.uid())
);

create policy matches_insert_own on public.matches
for insert with check (created_by = auth.uid());

create policy match_players_read_own_match on public.match_players
for select using (
  user_id = auth.uid()
  or exists (select 1 from public.match_players mp where mp.match_id = match_players.match_id and mp.user_id = auth.uid())
);

create policy match_players_insert_self on public.match_players
for insert with check (user_id = auth.uid());

create policy match_events_read_players on public.match_events
for select using (
  exists (select 1 from public.match_players mp where mp.match_id = match_events.match_id and mp.user_id = auth.uid())
);

create policy match_events_insert_self on public.match_events
for insert with check (player_id = auth.uid());

create policy private_rooms_read_host on public.private_rooms
for select using (host_user_id = auth.uid());

create policy private_rooms_insert_host on public.private_rooms
for insert with check (host_user_id = auth.uid());

-- Ranked futuro:
-- validar eventos en servidor/edge function antes de aceptar INSERT competitivo.
-- no confiar en resultados decididos por cliente.
