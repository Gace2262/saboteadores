alter table public.profiles enable row level security;
alter table public.cloud_saves enable row level security;
alter table public.decks enable row level security;
alter table public.collections enable row level security;
alter table public.achievements enable row level security;
alter table public.admin_content enable row level security;
alter table public.feedback enable row level security;
alter table public.user_roles enable row level security;

create or replace function public.has_role(role_name text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role = role_name
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.has_role('admin');
$$;

grant execute on function public.has_role(text) to authenticated;
grant execute on function public.is_admin() to authenticated;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select using (id = auth.uid());
drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles for insert with check (id = auth.uid());
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists cloud_saves_select_own on public.cloud_saves;
create policy cloud_saves_select_own on public.cloud_saves for select using (user_id = auth.uid());
drop policy if exists cloud_saves_insert_own on public.cloud_saves;
create policy cloud_saves_insert_own on public.cloud_saves for insert with check (user_id = auth.uid());
drop policy if exists cloud_saves_update_own on public.cloud_saves;
create policy cloud_saves_update_own on public.cloud_saves for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists decks_select_own_or_public on public.decks;
create policy decks_select_own_or_public on public.decks for select using (user_id = auth.uid() or is_public = true);
drop policy if exists decks_insert_own on public.decks;
create policy decks_insert_own on public.decks for insert with check (user_id = auth.uid());
drop policy if exists decks_update_own on public.decks;
create policy decks_update_own on public.decks for update using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists decks_delete_own on public.decks;
create policy decks_delete_own on public.decks for delete using (user_id = auth.uid());

drop policy if exists collections_select_own on public.collections;
create policy collections_select_own on public.collections for select using (user_id = auth.uid());
drop policy if exists collections_insert_own on public.collections;
create policy collections_insert_own on public.collections for insert with check (user_id = auth.uid());
drop policy if exists collections_update_own on public.collections;
create policy collections_update_own on public.collections for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists achievements_select_own on public.achievements;
create policy achievements_select_own on public.achievements for select using (user_id = auth.uid());
drop policy if exists achievements_insert_own on public.achievements;
create policy achievements_insert_own on public.achievements for insert with check (user_id = auth.uid());

drop policy if exists admin_content_read_all on public.admin_content;
create policy admin_content_read_all on public.admin_content for select using (enabled = true or public.is_admin());
drop policy if exists admin_content_write_admin on public.admin_content;
create policy admin_content_write_admin on public.admin_content for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists feedback_insert_anyone on public.feedback;
create policy feedback_insert_anyone on public.feedback for insert with check (true);
drop policy if exists feedback_read_admin on public.feedback;
create policy feedback_read_admin on public.feedback for select using (public.is_admin());

drop policy if exists user_roles_read_own_or_admin on public.user_roles;
create policy user_roles_read_own_or_admin on public.user_roles for select using (user_id = auth.uid() or public.is_admin());
drop policy if exists user_roles_admin_write on public.user_roles;
create policy user_roles_admin_write on public.user_roles for all using (public.is_admin()) with check (public.is_admin());
