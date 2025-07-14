-- 002_triggers_and_scheduled_tasks.sql

-- Ensure required extensions are available
create extension if not exists http;
create extension if not exists pg_cron;

-------------------- Trigger: call_ai_process --------------------
create or replace function public.call_ai_process()
returns trigger
language plpgsql
security definer
as $$
declare
  fn_url text := 'http://127.0.0.1:54321/functions/v1/process-dump';
begin
  -- Fire-and-forget HTTP call to the Edge Function
  perform http_post(
    fn_url,
    'application/json',
    json_build_object('dump_id', NEW.id)::text
  );
  return NEW;
end;
$$;

drop trigger if exists trg_call_ai_process on public.brain_dumps;
create trigger trg_call_ai_process
  after insert on public.brain_dumps
  for each row
  execute function public.call_ai_process();

-------------------- Trigger: update_usage_counters --------------------
create or replace function public.update_usage_counters()
returns trigger
language plpgsql
as $$
begin
  insert into usage_counters as uc (user_id, dumps_total, dumps_this_month, updated_at)
  values (NEW.user_id, 1, 1, now())
  on conflict (user_id)
  do update set
    dumps_total       = uc.dumps_total + 1,
    dumps_this_month  = uc.dumps_this_month + 1,
    updated_at        = now();

  -- decrement remaining monthly quota for free users
  update profiles
     set quota_remaining = greatest(quota_remaining - 1, 0)
   where id = NEW.user_id
     and is_premium = false;
  return NULL;
end;
$$;

drop trigger if exists trg_update_usage_counters on public.brain_dumps;
create trigger trg_update_usage_counters
  after insert on public.brain_dumps
  for each row
  execute function public.update_usage_counters();

-------------------- Cron: monthly quota reset --------------------
-- Runs at 00:10 UTC on the 1st of every month
select
  cron.schedule(
    'reset_quota',
    '10 0 1 * *',
    $$
      update profiles
         set quota_remaining = 30
       where is_premium = false;
      update usage_counters set dumps_this_month = 0, updated_at = now();
    $$
  ); 