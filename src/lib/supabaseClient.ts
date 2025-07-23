import { createBrowserClient } from '@supabase/ssr'

// Using NEXT_PUBLIC_* vars so both server & client share values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase credentials missing – define NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local',
  )
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

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
