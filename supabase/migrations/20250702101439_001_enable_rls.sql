-- 001_enable_rls.sql

-------------------- Enable RLS on all user tables --------------------
alter table profiles enable row level security;
alter table brain_dumps enable row level security;
alter table ai_outputs enable row level security;
alter table todos enable row level security;
alter table weekly_summaries enable row level security;
alter table usage_counters enable row level security;
alter table stripe_subscriptions enable row level security;
alter table email_logs enable row level security;

-- Stripe cache tables (products/prices/events) remain public read for now
-- We'll add policies if needed later

-------------------- Profiles: user can only see/edit their own --------------------
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-------------------- Brain dumps: user owns rows --------------------
create policy "Users can view own brain dumps" on brain_dumps
  for select using (auth.uid() = user_id);

create policy "Users can insert own brain dumps" on brain_dumps
  for insert with check (auth.uid() = user_id);

create policy "Users can update own brain dumps" on brain_dumps
  for update using (auth.uid() = user_id);

create policy "Users can delete own brain dumps" on brain_dumps
  for delete using (auth.uid() = user_id);

-------------------- AI outputs: user owns rows --------------------
create policy "Users can view own ai outputs" on ai_outputs
  for select using (auth.uid() = user_id);

create policy "Users can insert own ai outputs" on ai_outputs
  for insert with check (auth.uid() = user_id);

create policy "Users can update own ai outputs" on ai_outputs
  for update using (auth.uid() = user_id);

create policy "Users can delete own ai outputs" on ai_outputs
  for delete using (auth.uid() = user_id);

-------------------- Todos: user owns rows --------------------
create policy "Users can view own todos" on todos
  for select using (auth.uid() = user_id);

create policy "Users can insert own todos" on todos
  for insert with check (auth.uid() = user_id);

create policy "Users can update own todos" on todos
  for update using (auth.uid() = user_id);

create policy "Users can delete own todos" on todos
  for delete using (auth.uid() = user_id);

-------------------- Weekly summaries: user owns rows --------------------
create policy "Users can view own weekly summaries" on weekly_summaries
  for select using (auth.uid() = user_id);

create policy "Users can insert own weekly summaries" on weekly_summaries
  for insert with check (auth.uid() = user_id);

create policy "Users can update own weekly summaries" on weekly_summaries
  for update using (auth.uid() = user_id);

create policy "Users can delete own weekly summaries" on weekly_summaries
  for delete using (auth.uid() = user_id);

-------------------- Usage counters: user owns rows --------------------
create policy "Users can view own usage counters" on usage_counters
  for select using (auth.uid() = user_id);

create policy "Users can insert own usage counters" on usage_counters
  for insert with check (auth.uid() = user_id);

create policy "Users can update own usage counters" on usage_counters
  for update using (auth.uid() = user_id);

-------------------- Stripe subscriptions: user owns rows --------------------
create policy "Users can view own stripe subscriptions" on stripe_subscriptions
  for select using (auth.uid() = user_id);

create policy "Users can insert own stripe subscriptions" on stripe_subscriptions
  for insert with check (auth.uid() = user_id);

create policy "Users can update own stripe subscriptions" on stripe_subscriptions
  for update using (auth.uid() = user_id);

-------------------- Email logs: user owns rows --------------------
create policy "Users can view own email logs" on email_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert own email logs" on email_logs
  for insert with check (auth.uid() = user_id);

-------------------- Service role bypass for Edge Functions --------------------
-- Edge Functions need to bypass RLS when writing AI outputs, todos, etc.
-- Grant the app_service role permissions to bypass RLS

-- Allow app_service to insert/update any row (for Edge Function operations)
create policy "Service role can manage all data" on profiles
  for all using (auth.jwt() ->> 'role' = 'service_role');

create policy "Service role can manage all brain dumps" on brain_dumps
  for all using (auth.jwt() ->> 'role' = 'service_role');

create policy "Service role can manage all ai outputs" on ai_outputs
  for all using (auth.jwt() ->> 'role' = 'service_role');

create policy "Service role can manage all todos" on todos
  for all using (auth.jwt() ->> 'role' = 'service_role');

create policy "Service role can manage all weekly summaries" on weekly_summaries
  for all using (auth.jwt() ->> 'role' = 'service_role');

create policy "Service role can manage all usage counters" on usage_counters
  for all using (auth.jwt() ->> 'role' = 'service_role');

create policy "Service role can manage all stripe subscriptions" on stripe_subscriptions
  for all using (auth.jwt() ->> 'role' = 'service_role');

create policy "Service role can manage all email logs" on email_logs
  for all using (auth.jwt() ->> 'role' = 'service_role');