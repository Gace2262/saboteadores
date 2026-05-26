create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_id text,
  title_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cloud_saves (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  save_version text not null,
  save_data jsonb not null,
  checksum text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.decks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  factions text[] not null default '{}',
  cards jsonb not null default '[]'::jsonb,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cards jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id text not null,
  unlocked_at timestamptz not null default now(),
  unique (user_id, achievement_id)
);

create table if not exists public.admin_content (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  key text not null,
  data jsonb not null default '{}'::jsonb,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (type, key)
);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  category text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'curator', 'admin')),
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at before update on public.profiles for each row execute function public.touch_updated_at();

drop trigger if exists cloud_saves_touch_updated_at on public.cloud_saves;
create trigger cloud_saves_touch_updated_at before update on public.cloud_saves for each row execute function public.touch_updated_at();

drop trigger if exists decks_touch_updated_at on public.decks;
create trigger decks_touch_updated_at before update on public.decks for each row execute function public.touch_updated_at();

drop trigger if exists admin_content_touch_updated_at on public.admin_content;
create trigger admin_content_touch_updated_at before update on public.admin_content for each row execute function public.touch_updated_at();

create index if not exists decks_user_id_idx on public.decks(user_id);
create index if not exists decks_public_idx on public.decks(is_public) where is_public = true;
create index if not exists cloud_saves_user_id_idx on public.cloud_saves(user_id);
create index if not exists admin_content_type_key_idx on public.admin_content(type, key);
