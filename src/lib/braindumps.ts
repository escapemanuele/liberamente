import { supabase, BrainDump, AIOutput, Todo } from './supabase'
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
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { data: null, error: new Error('User not authenticated') }
    }

    const { data: brainDump, error } = await supabase
      .from('brain_dumps')
      .insert({
        user_id: user.id,
        content: data.content
      })
      .select()
      .single()

    return { data: brainDump, error }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') }
  }
}

// Fetch brain dumps for the current user
export const fetchBrainDumps = async (limit = 10): Promise<{ data: BrainDump[] | null; error: PostgrestError | Error | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { data: null, error: new Error('User not authenticated') }
    }

    const { data, error } = await supabase
      .from('brain_dumps')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit)

    return { data, error }
  } catch (error) {
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') }
  }
} 