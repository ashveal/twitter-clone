import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import AuthButtonClient from '@/components/auth-button-client'
import GitHubButton from '@/components/github-button'

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  const supabase = createServerComponentClient<DatabaseSchema>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }

  return (
    <div className="max-w-xl-auto flex w-full justify-center p-4">
      <GitHubButton />
    </div>
  )
  // return <AuthButtonClient session={session} />
}
