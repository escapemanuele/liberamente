Backend Implementation Checklist — MVP "BrainDump" (updated for Resend emails)  
(cross off each ☐ as you go)

────────────────────────────────────────
1 Database & Authentication  
☐ Create Supabase project and note project-ref, anon, and service-role keys  
☐ Enable Email + Password provider; disable confirmation emails for speed  
☐ Set JWT expiration to 7 days in Auth → Settings  
☐ Run `supabase init`; commit the generated `supabase/` folder  
☐ Add `.env.example` with SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY, STRIPE_SECRET_KEY, **RESEND_API_KEY, REVIEW_FROM_EMAIL**  
☐ Create helper DB role `app_service` and grant to `authenticator` for Edge Functions  
☐ Set up local dev containers: `supabase start` for Postgres + auth emulation  

2 Schema & Migrations  
☐ Create 000_initial.sql migration containing tables: profiles, brain_dumps, ai_outputs, todos, weekly_summaries, usage_counters, stripe_subscriptions, stripe_events, stripe_products, stripe_prices  
☐ (OPTIONAL) Table `email_logs(id uuid pk, user_id uuid, template text, sent_at timestamptz)` for idempotent email tracking  
☐ Run `supabase db push` locally; verify schema applies without errors  
☐ Commit migration; set up CI step to fail PRs if `supabase db diff` shows drift  

3 Row-Level Security  
☐ Enable RLS on every user table (`alter table … enable row level security`)  
☐ Add "user owns row" policy for brain_dumps, todos, ai_outputs, weekly_summaries, usage_counters, stripe_subscriptions  
☐ Create read-only policy for stripe_* caches (public read) if needed  
☐ Test RLS via `supabase auth signin` CLI and simple selects/inserts  

4 Realtime Channels  
☐ Enable Realtime replication on brain_dumps, todos, ai_outputs tables  
☐ Grant `authenticated` role replication privileges  

5 Edge Functions  
☐ `supabase functions new process-dump` → call OpenAI and write ai_outputs + todos  
☐ `supabase functions new transcribe` → Whisper flow for voice dumps  
☐ `supabase functions new weekly-review` →  
  • Aggregate past 7 days, write weekly_summaries  
  • **Loop summaries, call Resend:**  
   `await resend.emails.send({ from: REVIEW_FROM_EMAIL, to: user.email, subject:"Your Weekly BrainDump", html })`  
  • (Optional) insert row in email_logs after each send  
☐ `supabase functions new check-quota` → return remaining free dumps for user  
☐ `supabase functions new stripe-webhook` → handle subscription events  
☐ Wrap every function with try/catch → console.error for Logflare ingestion  

6 Triggers & Scheduled Tasks  
☐ Create `call_ai_process()` trigger AFTER INSERT on brain_dumps to invoke process-dump  
☐ Supabase Scheduler: weekly-review every Monday 00:05 UTC (emails go out inside the same run)  
☐ Trigger to increment usage_counters on every brain_dump insert  
☐ Monthly cron (1st day 00:10 UTC) to reset quota_remaining for free users  

7 Stripe Integration  
☐ Inside stripe-webhook handle customer.created, subscription.* and invoice.paid → update stripe_subscriptions, profiles.is_premium, quota_remaining  
☐ Cache products/prices nightly via `stripe sync` job or admin call  
☐ Store Stripe keys in Supabase → Project Settings → Env Vars (encrypted)  

8 Rate Limiting & Paywall  
☐ In check-quota function: return HTTP 402 if user exceeds quota and !is_premium  
☐ Frontend blocks "New Dump" button on 402; shows upgrade CTA  
☐ Update quota_remaining –1 inside transaction when new dump saved  

9 Logging & Monitoring  
☐ Connect Supabase logs to Logflare; create alerts on Edge Function errors  
☐ Enable Sentry (or Vercel monitoring) in Edge Functions via DSN env var  
☐ Set usage alerts in Supabase (database rows, outbound traffic thresholds)  

10 Wire the frontend with the backend
☐ Make sure the user is able to login and signup
☐ Set up frontend form to submit dumps to brain_dumps
☐ Make sure the edge functions are able to prompt to GPT-4o to generate insights and categorized to-dos
☐ Implement logic to restrict Free users to 1 dump per day

11 Local & CI Testing  
☐ Write Playwright script: sign-up → create dump → wait for ai_outputs → mark todo complete → mock cron → assert weekly email API hit  
☐ GitHub Actions matrix: run Playwright on every PR with `supabase start` service  
☐ Add `npm run lint && npm run test:e2e` as required status checks  

12 Deployment  
☐ Deploy Edge Functions: `supabase functions deploy --project-ref {ref}`  
☐ Add Vercel env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY, STRIPE_PUBLIC_KEY, RESEND_API_KEY, REVIEW_FROM_EMAIL  
☐ Deploy Next.js frontend (`vercel --prod`)  
☐ Run post-deploy smoke test hitting production URLs  

13 Launch Prep  
☐ Configure custom domain for Supabase Auth emails  
☐ Upload brand email templates (login, reset PW)  
☐ Set Supabase spend cap and daily usage notifications  
☐ Publish Privacy Policy & TOS; link from app footer  
☐ Enable Stripe tax rates and set default statement descriptor  
 