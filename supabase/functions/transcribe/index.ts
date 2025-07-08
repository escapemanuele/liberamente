// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// supabase/functions/transcribe/index.ts
import { serve } from 'https://deno.land/std/http/server.ts'
import { supabase, openai } from '../_shared/clients.ts'

serve(async req => {
  try {
    const { dump_id } = await req.json()
    const { data: dump } = await supabase.from('brain_dumps').select('raw_audio_url,user_id').eq('id', dump_id).single()
    const audio = await fetch(dump.raw_audio_url).then(r => r.arrayBuffer())

    const transcription = await openai.audio.transcriptions.create({
      file: new File([audio], 'audio.mp3'),
      model: 'whisper-1'
    })

    await supabase.from('brain_dumps').update({ content: transcription.text }).eq('id', dump_id)
    return new Response('ok')
  } catch (e) {
    console.error(e)
    return new Response('error', { status: 500 })
  }
})
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/transcribe' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
