'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'

const GitHubButton = () => {
  const supabase = createClientComponentClient<DatabaseSchema>()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <Button onClick={handleSignIn}>
      <Icons.GitHub className="mr-2 h-4 w-4" />
      Login with GitHub
    </Button>
  )
}

export default GitHubButton
