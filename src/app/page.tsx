import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import AuthButtonServer from '@/components/auth-button-server'
import NewTweet from '@/components/new-tweet'
import Tweets from '@/components/tweets'

export default async function Home() {
  const supabase = createServerComponentClient<DatabaseSchema>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const { data } = await supabase.from('tweets').select('*, author: profiles(*), likes(user_id)')

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      user_has_liked_tweet: !!tweet.likes?.find((like) => like.user_id === session.user.id),
      likes: tweet.likes?.length,
    })) ?? []

  return (
    <main className="min-h-screen">
      <AuthButtonServer />
      <NewTweet />
      <div className="space-y-2">
        <Tweets tweets={tweets} />
      </div>
    </main>
  )
}
