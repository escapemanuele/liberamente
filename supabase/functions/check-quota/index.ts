// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from 'https://deno.land/std/http/server.ts'
import { supabase } from '../_shared/clients.ts'

serve(async req => {
  try {
    const user = req.headers.get('x-user-id') // caller passes this
    const { data: counter } = await supabase.from('usage_counters').select('dumps_this_month, quota_remaining').eq('user_id', user).single()
    if (!counter) return new Response(JSON.stringify({ remaining: 0 }), { status: 404 })
    if (counter.quota_remaining <= 0) return new Response('paywall', { status: 402 })
    return new Response(JSON.stringify({ remaining: counter.quota_remaining }))
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
