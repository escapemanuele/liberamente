// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from 'https://deno.land/std/http/server.ts'
import { supabase } from '../_shared/clients.ts'

interface Profile {
  quota_remaining: number | null
  is_premium: boolean | null
}

serve(async req => {
  try {
    const userId = req.headers.get('x-user-id') // Pass this from frontend until we wire auth context
    if (!userId) return new Response('missing user id', { status: 400 })

    // fetch quota + premium flag in one go
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('quota_remaining,is_premium')
      .eq('id', userId)
      .single<Profile>()

    if (error || !profile) {
      console.error(error)
      return new Response('profile not found', { status: 404 })
    }

    if (profile.is_premium) {
      return new Response(JSON.stringify({ remaining: null, premium: true }))
    }

    const remaining = profile.quota_remaining ?? 0
    if (remaining <= 0) {
      return new Response('quota exceeded', { status: 402 })
    }
    return new Response(JSON.stringify({ remaining }))
  } catch (e) {
    console.error(e)
    return new Response('error', { status: 500 })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/check-quota' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
