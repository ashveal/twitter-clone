import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import AuthButtonClient from '@/components/auth-button-client'

export default async function LoginPage() {
  const supabase = createServerComponentClient<DatabaseSchema>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }

  return <AuthButtonClient session={session} />
}
