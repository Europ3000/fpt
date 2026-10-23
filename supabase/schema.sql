-- Fitness Progress Tracker: one table with each user's data, readable and writable only by that user.
-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.

create table if not exists public.fpt_store (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  key text not null,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

alter table public.fpt_store enable row level security;

drop policy if exists "fpt own rows: read" on public.fpt_store;
drop policy if exists "fpt own rows: add" on public.fpt_store;
drop policy if exists "fpt own rows: change" on public.fpt_store;
drop policy if exists "fpt own rows: delete" on public.fpt_store;

create policy "fpt own rows: read" on public.fpt_store
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "fpt own rows: add" on public.fpt_store
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "fpt own rows: change" on public.fpt_store
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "fpt own rows: delete" on public.fpt_store
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Only logged-in users get access to the table; anonymous visitors get nothing.
revoke all on public.fpt_store from anon;
grant select, insert, update, delete on public.fpt_store to authenticated;
