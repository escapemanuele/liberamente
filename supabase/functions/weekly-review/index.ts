// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std/http/server.ts'
import { supabase, resend, openai } from '../_shared/clients.ts'

serve(async () => {
  const today = new Date()
  const weekStart = new Date(today); weekStart.setUTCDate(today.getUTCDate() - 7)

  const { data: users } = await supabase.from('profiles').select('id,email,full_name')

  for (const u of users ?? []) {
    const { data: dumps } = await supabase
      .from('brain_dumps')
      .select('content,created_at')
      .eq('user_id', u.id)
      .gte('created_at', weekStart.toISOString())

    if (!dumps?.length) continue

    const chat = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: `Summarize these notes:\n${dumps.map(d=>d.content).join('\n')}` }]
    })
    const summary = chat.choices[0].message.content ?? ''

    await supabase.from('weekly_summaries').insert({
      user_id: u.id,
      week_start: weekStart.toISOString().slice(0,10),
      week_end: today.toISOString().slice(0,10),
      content: summary
    })

    await resend.emails.send({
      from: Deno.env.get('REVIEW_FROM_EMAIL')!,
      to: u.email,
      subject: 'Your Weekly BrainDump',
      html: `<h2>Weekly Review</h2><p>${summary.replace(/\n/g,'<br>')}</p>`
    })
  }
  return new Response('done')
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/weekly-review' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
