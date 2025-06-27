-- 000_initial.sql
-- Enable uuid generator
create extension if not exists "uuid-ossp";

-------------------- core user profile --------------------
create table profiles (
  id                uuid primary key default auth.uid(),
  email             text unique not null,
  full_name         text,
  avatar_url        text,
  is_premium        boolean      not null default false,
  quota_remaining   int          not null default 15,
  created_at        timestamptz  not null default now()
);

-------------------- user-generated dumps --------------------
create table brain_dumps (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references profiles(id) on delete cascade,
  content      text,               -- final transcript or text dump
  raw_audio_url text,
  created_at   timestamptz not null default now()
);
create index on brain_dumps(user_id);

create table ai_outputs (
  id        uuid primary key default uuid_generate_v4(),
  dump_id   uuid references brain_dumps(id) on delete cascade,
  user_id   uuid references profiles(id) on delete cascade,
  kind      text not null check (kind in ('summary','todo','raw')),
  content   text not null,
  created_at timestamptz not null default now()
);
create index on ai_outputs(user_id);
create index on ai_outputs(dump_id);

create table todos (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid references profiles(id) on delete cascade,
  dump_id    uuid references brain_dumps(id) on delete set null,
  title      text not null,
  done       boolean not null default false,
  due_date   date,
  created_at timestamptz not null default now()
);
create index on todos(user_id);

create table weekly_summaries (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references profiles(id) on delete cascade,
  week_start  date not null,
  week_end    date not null,
  content     text not null,
  created_at  timestamptz not null default now(),
  unique (user_id, week_start)
);

create table usage_counters (
  user_id           uuid primary key references profiles(id) on delete cascade,
  dumps_total       int not null default 0,
  dumps_this_month  int not null default 0,
  updated_at        timestamptz not null default now()
);

-------------------- Stripe caches --------------------
create table stripe_subscriptions (
  id                    uuid primary key default uuid_generate_v4(),
  user_id               uuid unique references profiles(id) on delete cascade,
  stripe_customer_id    text unique not null,
  stripe_subscription_id text unique not null,
  status                text not null,
  current_period_end    timestamptz,
  cancel_at_within_period boolean default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create table stripe_events (
  id          text primary key,
  type        text not null,
  data        jsonb not null,
  received_at timestamptz not null default now()
);

create table stripe_products (
  id        text primary key,
  name      text,
  active    boolean,
  metadata  jsonb,
  created_at timestamptz default now()
);

create table stripe_prices (
  id                text primary key,
  product_id        text references stripe_products(id),
  unit_amount       int,
  currency          char(3),
  recurring_interval text,
  active            boolean,
  is_usage_based    boolean default false,
  metadata          jsonb,
  created_at        timestamptz default now()
);

-------------------- optional: idempotent email tracking --------------------
create table if not exists email_logs (
  id        uuid primary key default uuid_generate_v4(),
  user_id   uuid references profiles(id) on delete cascade,
  template  text not null,
  sent_at   timestamptz not null default now()
);