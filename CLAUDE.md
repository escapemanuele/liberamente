# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BrainDump is a Next.js application for capturing and processing thoughts/brain dumps with AI assistance. Users can input text or voice recordings, which are processed by OpenAI to generate insights, todos, and summaries. The app includes a freemium model with quota limits and Stripe integration.

## Architecture

- **Frontend**: Next.js 15 with TypeScript, TailwindCSS, React Router DOM
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions, Realtime)
- **AI Processing**: OpenAI GPT-4o for insights, Whisper for transcription
- **Payment**: Stripe integration for premium subscriptions
- **Email**: Resend for weekly review emails

### Key Database Tables
- `profiles` - User data with quota and premium status
- `brain_dumps` - User input content and audio
- `ai_outputs` - AI-generated insights, summaries, todos
- `todos` - Task management with completion status
- `weekly_summaries` - Weekly review aggregations
- `usage_counters` - Quota tracking
- `stripe_*` tables - Payment and subscription data

### Edge Functions (Deno)
- `process-dump` - Processes brain dumps with OpenAI
- `transcribe` - Audio transcription with Whisper
- `weekly-review` - Generates and emails weekly summaries
- `check-quota` - Validates user quota limits
- `stripe-webhook` - Handles Stripe payment events

## Development Commands

```bash
# Install dependencies
npm install

# Start Next.js development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Start local Supabase stack
supabase start

# Check Supabase status and get local keys
supabase status

# Stop Supabase
supabase stop

# Apply database migrations
supabase db push

# Deploy edge functions
supabase functions deploy --project-ref YOUR_PROJECT_REF

# Deploy specific function
supabase functions deploy process-dump --project-ref YOUR_PROJECT_REF
```

## Environment Setup

Required environment variables in `.env.local`:

```env
# Supabase (get from `supabase status` for local dev)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_local_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_local_service_role_key

# AI Services
OPENAI_API_KEY=your_openai_api_key

# Email
RESEND_API_KEY=your_resend_api_key
REVIEW_FROM_EMAIL=your_from_email@domain.com

# Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Code Conventions

- **TypeScript**: Strict typing throughout
- **Components**: React functional components with hooks
- **State Management**: React Context for auth, local state otherwise
- **Styling**: TailwindCSS utility classes
- **Database**: Supabase client-side SDK with RLS policies
- **Error Handling**: Try-catch blocks with console.error for Edge Functions

## Key Files and Patterns

- `src/lib/supabaseClient.ts` - Browser client configuration
- `src/lib/supabaseServer.ts` - Server-side client for SSR
- `src/lib/braindumps.ts` - Core business logic for brain dump operations
- `src/contexts/AuthContext.tsx` - Authentication state management
- `src/components/ProtectedRoute.tsx` - Route protection wrapper
- `supabase/functions/_shared/clients.ts` - Shared edge function utilities

## Testing and Quality

- ESLint configuration with React hooks and TypeScript rules
- Use `npm run lint` before committing
- Edge functions should include error logging for monitoring
- Database operations should use RLS policies for security

## Quota and Premium Features

- Free users: Limited daily brain dumps
- Premium users: Unlimited usage
- Quota enforced via `check-quota` function returning HTTP 402
- Usage tracked in `usage_counters` table
- Monthly quota reset via scheduled task

## Deployment Notes

- Frontend deploys to Vercel with environment variables
- Edge functions deploy via Supabase CLI
- Database migrations managed through Supabase
- Stripe webhooks require proper endpoint configuration
- Email templates use Resend service

## Plan & Review

### Before starting work
- Always in plan mode to make a plan
- After get the plan, make sure you Write the plan to .claude/tasks/TASK_NAME.md.
- The plan should be a detailed implementation plan and the reasoning behind them, as well as tasks broken down.
- If the task require external knowledge or certain package, also research to get latest knowledge (Use Task tool for research)
- Don't over plan it, always think MVP.
- Once you write the plan, firstly ask me to review it. Do not continue until I approve the plan.

### While implementing
- You should update the plan as you work.
- After you complete tasks in the plan, you should update and append detailed descriptions of the changes you made, so following tasks can be easily hand over to other engineers.