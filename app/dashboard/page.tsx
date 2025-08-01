import { redirect } from 'next/navigation'
import Dashboard from '@/src/components/Dashboard'
import { createServerSupabaseClient } from '@/src/lib/supabaseServer'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signup')
  }

  return <Dashboard />
} 