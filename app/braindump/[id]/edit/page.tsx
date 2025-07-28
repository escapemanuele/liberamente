import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import EditBrainDump from '@/src/components/EditBrainDump'
import { createServerSupabaseClient } from '@/src/lib/supabaseServer'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  
  return {
    title: `Edit Brain Dump - ${id}`,
    description: 'Edit your brain dump content',
  }
}

export default async function EditBrainDumpPage({ params }: PageProps) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signup')
  }

  return <EditBrainDump />
}