# Frontend Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Supabase CLI** (for local development)

## Environment Setup

Create a `.env.local` file in the root directory. You can copy from `.env.example`:

```bash
cp .env.example .env.local
```

Then update the values:

### For Local Development (using Supabase local stack):

1. Start Supabase locally: `supabase start`
2. Run `supabase status` to get your local keys
3. Update `.env.local` with the local values:

```env
# Local Supabase (from `supabase status`)
SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=your_local_anon_key_from_supabase_status
SUPABASE_SERVICE_ROLE_KEY=your_local_service_role_key_from_supabase_status

# Add your OpenAI key for AI processing
OPENAI_API_KEY=your_openai_api_key_here
```

### For Production:

Get these from your Supabase dashboard → Settings → API:

```env
# Production Supabase
SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

OPENAI_API_KEY=your_openai_api_key_here
```

## Key Differences

- **Frontend** (`VITE_*`): Uses anon key (safe for client-side, limited permissions)
- **Backend** (Edge Functions): Uses service role key (server-side only, full permissions)
- Both use the same `SUPABASE_URL` but different keys for security

## Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Testing Authentication

1. Visit http://localhost:5173
2. Click "Get Started" 
3. Sign up with a test email
4. Login and test creating brain dumps

The app will automatically:
- Save brain dumps to database
- Trigger AI processing 
- Generate todos and insights
- Enforce quota limits for free users 