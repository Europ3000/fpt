-- Limits against abuse: anyone can make an account, so one account must not be able to fill the database
-- (the free plan has 500 MB). Far above what the app itself writes: a few documents plus one per training day.
-- Run once in Supabase, after schema.sql: SQL Editor -> New query -> paste -> Run.

alter table public.fpt_store drop constraint if exists fpt_store_key_len;
alter table public.fpt_store add constraint fpt_store_key_len check (char_length(key) between 1 and 200);
alter table public.fpt_store drop constraint if exists fpt_store_value_size;
alter table public.fpt_store add constraint fpt_store_value_size check (pg_column_size(value) <= 2000000);

-- At most 20 000 rows per user (20 years of daily trainings is about 7 300).
create or replace function public.fpt_store_row_limit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.fpt_store where user_id = new.user_id and key = new.key)
     and (select count(*) from public.fpt_store where user_id = new.user_id) >= 20000 then
    raise exception 'fpt_store: too many rows for this user';
  end if;
  return new;
end $$;
revoke all on function public.fpt_store_row_limit() from public, anon, authenticated;
drop trigger if exists fpt_store_row_limit on public.fpt_store;
create trigger fpt_store_row_limit before insert on public.fpt_store
  for each row execute function public.fpt_store_row_limit();
