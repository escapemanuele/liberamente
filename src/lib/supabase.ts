import { createClient } from '@supabase/supabase-js'

// Environment variables for Supabase configuration
// For local development: http://127.0.0.1:54321 (when running `supabase start`)
// For production: Your Supabase project URL from https://supabase.com/dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://127.0.0.1:54321'

// Get your anon key from Supabase dashboard > Settings > API
// For local development: Copy from `supabase status` output
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Validate that we have the required configuration
if (!supabaseAnonKey) {
  console.warn('⚠️  VITE_SUPABASE_ANON_KEY is not set. Create a .env.local file with your Supabase credentials.')
  console.warn('   Run `supabase status` to get your local anon key, or check your Supabase dashboard for production keys.')
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database type definitions
export type Profile = {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  is_premium: boolean
  quota_remaining: number
  created_at: string
}

export type BrainDump = {
  id: string
  user_id: string
  content: string
  raw_audio_url?: string
  created_at: string
}

export type AIOutput = {
  id: string
  dump_id: string
  user_id: string
  kind: 'summary' | 'todo' | 'raw'
  content: string
  created_at: string
}

export type Todo = {
  id: string
  user_id: string
  dump_id?: string
  title: string
  done: boolean
  due_date?: string
  created_at: string
} 