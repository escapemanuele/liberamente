// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std/http/server.ts'
import { stripe, supabase } from '../_shared/clients.ts'

serve(async req => {
  const sig = req.headers.get('stripe-signature')!
  const buf = await req.arrayBuffer()

  let event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, Deno.env.get('STRIPE_WEBHOOK_SECRET')!)
  } catch (err) {
    return new Response('Invalid signature', { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.updated':
      case 'customer.subscription.created':
      case 'invoice.paid': {
        const sub = event.data.object as Stripe.Subscription
        await supabase.from('stripe_subscriptions').upsert({
          stripe_subscription_id: sub.id,
          user_id: sub.metadata.user_id,
          status: sub.status,
          current_period_end: new Date(sub.current_period_end * 1000).toISOString()
        })
        await supabase.from('profiles').update({ is_premium: sub.status === 'active' }).eq('id', sub.metadata.user_id)
        break
      }
      case 'customer.subscription.deleted':
        const sub = event.data.object as Stripe.Subscription
        await supabase.from('profiles').update({ is_premium: false }).eq('id', sub.metadata.user_id)
        break
    }
    return new Response('ok')
  } catch (e) {
    console.error(e)
    return new Response('error', { status: 500 })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/stripe-webhook' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
