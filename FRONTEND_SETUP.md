# Frontend Setup Instructions

## Environment Configuration

To connect the frontend to your Supabase backend, you need to set up environment variables.

### 1. Create Environment File

Create a `.env.local` file in the root directory with the following content:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Get Your Supabase Credentials

#### For Local Development:
1. Make sure Supabase is running locally: `supabase start`
2. Run `supabase status` to get your credentials:
   - **API URL**: Use this for `VITE_SUPABASE_URL`
   - **anon key**: Use this for `VITE_SUPABASE_ANON_KEY`

Example local setup:
```env
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=your_local_anon_key_from_supabase_status
```

#### For Production:
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the values:
   - **Project URL**: Use this for `VITE_SUPABASE_URL`
   - **Project API Keys → anon/public**: Use this for `VITE_SUPABASE_ANON_KEY`

### 3. Start the Development Server

```bash
npm run dev
```

## What's Been Implemented

✅ **Authentication Integration**:
- Login, signup, and forgot password forms are fully wired up
- Auth state management with React Context
- Protected routes that redirect to login when not authenticated

✅ **Brain Dump Functionality**:
- Create new brain dumps and save them to the database
- Fetch and display existing brain dumps
- Real-time quota checking for free users
- Loading states and error handling

✅ **UI Features**:
- Header updates based on authentication state
- Real user profile display (name/email from Supabase)
- Logout functionality
- Form validation and loading states

## Testing the Integration

1. **Sign up for a new account** - Should create a profile in the profiles table
2. **Log in** - Should redirect to dashboard and show user info in header
3. **Create a brain dump** - Should save to database and trigger AI processing
4. **Check quotas** - Free users should see quota restrictions
5. **Log out** - Should clear auth state and redirect to home

## Next Steps

The backend AI processing should automatically trigger when you create a brain dump. Check the Supabase logs to see the Edge Functions being called.

If you need to customize the AI prompts or add more functionality, check the Edge Functions in the `supabase/functions/` directory. 