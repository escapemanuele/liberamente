// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from 'https://deno.land/std/http/server.ts'
import { supabase, openai } from '../_shared/clients.ts'

serve(async req => {
  try {
    const { dump_id } = await req.json()
    const { data: dump } = await supabase.from('brain_dumps').select('*').eq('id', dump_id).single()
    if (!dump) return new Response('dump not found', { status: 404 })

    const prompt = `Summarize and extract actionable todos:\n\n${dump.content}`
    const chat = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    })
    const result = chat.choices[0].message.content ?? ''

    // naive split → todo vs summary
    const [summary, ...todos] = result.split('\n').filter(Boolean)

    // insert summary
    await supabase.from('ai_outputs').insert({
      dump_id, user_id: dump.user_id, kind: 'summary', content: summary
    })

    // insert todos
    if (todos.length)
      await supabase.from('todos').insert(
        todos.map(t => ({ user_id: dump.user_id, dump_id, title: t }))
      )

    return new Response('ok')
  } catch (e) {
    console.error(e)
    return new Response('error', { status: 500 })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/process-dump' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
