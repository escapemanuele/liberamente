Below is a complete, copy-ready database design for the MVP.
Each entry lists the table name, core columns (name → type / constraints), key relationships, and a brief purpose paragraph.

---

Table: profiles  
• id → uuid / PK, FK → auth.users(id) on delete cascade  
• email → text / unique  
• is_premium → boolean / default false  
• stripe_customer_id → text / unique, nullable  
• quota_remaining → integer / default 30 (monthly brain-dump quota for free tier)  
• created_at → timestamptz / default now()  
• updated_at → timestamptz / default now()  

Relationships: 1-to-many with brain_dumps, weekly_summaries, stripe_subscriptions.  
Purpose: canonical user record that mirrors Auth, tracks premium status, Stripe linkage, and remaining free quota.

---

Table: brain_dumps  
• id → uuid / PK, default gen_random_uuid()  
• user_id → uuid / FK → profiles(id) on delete cascade  
• text → text / not null  
• created_at → timestamptz / default now()  

Relationships: 1-to-1 with ai_outputs, 1-to-many with todos.  
Purpose: raw, timestamped brain-dump text captured from the user.

---

Table: ai_outputs  
• id → uuid / PK  
• dump_id → uuid / unique FK → brain_dumps(id) on delete cascade  
• insights → jsonb  
• todos → jsonb (redundant snapshot)  
• worries → jsonb  
• created_at → timestamptz / default now()  

Relationships: 1-to-1 back to brain_dumps.  
Purpose: stores OpenAI's structured response for each dump—insights, extracted to-dos, and worries—so the frontend can render without re-hitting the LLM.

---

Table: todos  
• id → uuid / PK  
• dump_id → uuid / FK → brain_dumps(id) on delete cascade  
• title → text / not null  
• completed → boolean / default false  
• created_at → timestamptz / default now()  

Relationships: many-to-1 back to brain_dumps.  
Purpose: normalized, user-editable task list derived from each dump; completion status drives weekly stats.

---

Table: weekly_summaries  
• id → uuid / PK  
• user_id → uuid / FK → profiles(id) on delete cascade  
• week_start → date (Monday)  
• total_dumps → integer  
• completed_todos → integer  
• total_todos → integer  
• recurring_worries → jsonb  
• suggestions → jsonb  
• created_at → timestamptz / default now()  

Relationships: many-to-1 to profiles.  
Purpose: pre-computed Monday-morning digest used by the "Weekly Review" screen; avoids expensive on-the-fly aggregation.

---

Table: usage_counters  
• user_id → uuid / PK, FK → profiles(id) on delete cascade  
• period_start → timestamptz  
• dumps_created → integer / default 0  

Relationships: 1-to-1 with profiles.  
Purpose: cheap lookup for rate-limiting and pay-per-dump enforcement; resets monthly or when subscription upgrades.

---

Table: stripe_subscriptions  
• id → uuid / PK  
• user_id → uuid / FK → profiles(id) on delete cascade  
• stripe_subscription_id → text / unique  
• price_id → text  
• status → text (trialing, active, past_due, canceled, etc.)  
• current_period_end → timestamptz  
• cancel_at_period_end → boolean / default false  
• created_at → timestamptz / default now()  
• updated_at → timestamptz / default now()  

Relationships: 1-to-1 with profiles (latest record wins), optional history via updated_at.  
Purpose: mirrors Stripe subscription object for fast auth-check without hitting Stripe; drives `is_premium` flag, quota resets, and feature gates.

---

Table: stripe_events (optional but recommended)  
• id → bigint / PK, auto-increment  
• event_id → text / unique (Stripe's id)  
• type → text (invoice.paid, customer.subscription.deleted, etc.)  
• payload → jsonb  
• received_at → timestamptz / default now()  

Purpose: idempotent ledger of raw webhook payloads, simplifying replays/debugging and complying with Stripe best practices.

---

Table: stripe_products (optional cached catalog)  
• id → text / PK (Stripe product id)  
• name → text  
• description → text  
• active → boolean  
• metadata → jsonb  
• updated_at → timestamptz  

Purpose: local cache of Stripe products so pricing/plans can be queried without round-trip to Stripe; handy for corporate-plan dashboards.

---

Table: stripe_prices (optional cached catalog)  
• id → text / PK (Stripe price id)  
• product_id → text / FK → stripe_products(id)  
• unit_amount → integer (cents)  
• currency → text  
• interval → text (month, year)  
• interval_count → integer  
• active → boolean  
• metadata → jsonb  
• updated_at → timestamptz  

Purpose: synchronized price data powering in-app upgrade UI; ensures the frontend never hard-codes Stripe ids.

---

Key Relationships Recap  
• profiles ←→ brain_dumps (1-many)  
• brain_dumps ←→ ai_outputs (1-1)  
• brain_dumps ←→ todos (1-many)  
• profiles ←→ weekly_summaries (1-many)  
• profiles ←→ usage_counters (1-1)  
• profiles ←→ stripe_subscriptions (1-many, typically latest row drives state)  
• stripe_products ←→ stripe_prices (1-many)  

This schema cleanly separates user data, AI output, task tracking, analytics, rate-limiting, and monetization, while keeping Stripe coupling minimal and RLS-friendly. 