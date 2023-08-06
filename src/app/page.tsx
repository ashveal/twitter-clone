import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import AuthButton from '@/components/auth-button'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const { data: tweets, error } = await supabase.from('tweets').select()

  return (
    <main className="flex min-h-screen">
      <AuthButton />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </main>
  )
}
