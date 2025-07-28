import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import BrainDumpDetails from '@/src/components/BrainDumpDetails'
import { createServerSupabaseClient } from '@/src/lib/supabaseServer'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  
  return {
    title: `Brain Dump Details - ${id}`,
    description: 'View and manage your brain dump insights, todos, and worries',
  }
}

export default async function BrainDumpDetailPage() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signup')
  }

  return <BrainDumpDetails />
}