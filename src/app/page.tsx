import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import AuthButtonServer from '@/components/auth-button-server'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const { data: tweets, error } = await supabase.from('tweets').select()

  return (
    <main className="flex min-h-screen">
      <AuthButtonServer />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </main>
  )
}
