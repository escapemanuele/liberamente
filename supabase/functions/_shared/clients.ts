/// <reference types="https://deno.land/x/deno@v1.36.0/lib/deno.d.ts" />

// deno: npm:@supabase/supabase-js@2
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import OpenAI from 'npm:openai'
import Stripe from 'npm:stripe'
import { Resend } from 'npm:resend'

export const supabase = createClient(
  Deno.env.get('VITE_SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

export const openai  = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') })
// export const stripe  = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2023-10-16' })
// export const resend  = new Resend(Deno.env.get('RESEND_API_KEY')!)
