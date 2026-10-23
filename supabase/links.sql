-- Linked apps (for now the Strava tokens). Only the Edge Function "strava" reaches this table, with its
-- service role: row level security is on and there is no policy, so the app's public key gets nothing.
create table if not exists public.fpt_links (
  user_id uuid not null references auth.users (id) on delete cascade,
  provider text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, provider)
);
alter table public.fpt_links enable row level security;
revoke all on public.fpt_links from anon, authenticated;
