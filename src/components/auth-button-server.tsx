import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import AuthButtonClient from './auth-button-client'

export const dynamic = 'force-dynamic'

const AuthButtonServer = async () => {
  const supabase = createServerComponentClient<DatabaseSchema>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <AuthButtonClient session={session} />
}

export default AuthButtonServer
