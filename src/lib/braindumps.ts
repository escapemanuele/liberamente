import { supabase, BrainDump, AIOutput, Todo } from './supabaseClient'
import { PostgrestError } from '@supabase/supabase-js'

export interface CreateBrainDumpData {
  content: string
}

export interface BrainDumpWithDetails extends BrainDump {
  ai_outputs?: AIOutput[]
  todos?: Todo[]
}

// Create a new brain dump
export const createBrainDump = async (data: CreateBrainDumpData): Promise<{ data: BrainDump | null; error: PostgrestError | Error | null }> => {
  try {
    const { data: userData, error: authError } = await supabase.auth.getUser()
    if (authError) {
      console.error('getUser error:', authError)
    }
    const { user } = userData
    
    if (!user) {
      return { data: null, error: new Error('User not authenticated') }
    }

    const { data: brainDump, error: supabaseError } = await supabase
      .from('brain_dumps')
      .insert({
        user_id: user.id,
        content: data.content
      })
      .select()
      .single()

    return { data: brainDump, error: supabaseError }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') }
  }
}

// Fetch brain dumps for the current user
export const fetchBrainDumps = async (limit = 10): Promise<{ data: BrainDump[] | null; error: PostgrestError | Error | null }> => {
  try {
    const { data: userData2, error: authError2 } = await supabase.auth.getUser()
    if (authError2) {
      console.error('getUser error:', authError2)
    }
    const { user } = userData2
    
    if (!user) {
      return { data: null, error: new Error('User not authenticated') }
    }

    const { data: brainDumps, error: supabaseError } = await supabase
      .from('brain_dumps')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit)

    return { data: brainDumps, error: supabaseError }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') }
  }
} 