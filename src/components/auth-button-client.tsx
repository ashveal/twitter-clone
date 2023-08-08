'use client'

import { useRouter } from 'next/navigation'
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs'

import { Button } from '@/components/ui/button'

const AuthButtonClient = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient<DatabaseSchema>()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return session ? <Button onClick={handleSignOut}>Logout</Button> : <Button onClick={handleSignIn}>Login</Button>
}

export default AuthButtonClient
