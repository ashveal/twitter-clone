import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { Separator } from '@/components/ui/separator'
import AuthButtonServer from '@/components/auth-button-server'
import NewTweet from '@/components/new-tweet'
import Tweets from '@/components/tweets'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient<DatabaseSchema>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const { data } = await supabase
    .from('tweets')
    .select('*, author: profiles(*), likes(user_id)')
    .order('created_at', { ascending: false })

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      user_has_liked_tweet: !!tweet.likes?.find((like) => like.user_id === session.user.id),
      likes: tweet.likes?.length,
    })) ?? []

  return (
    <div className="max-w-xl-auto w-full">
      <div className="flex justify-between px-4 py-6">
        <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tighter md:text-4xl">Home</h1>
        <AuthButtonServer />
      </div>
      <Separator />
      <div className="space-y-8 px-4 py-6">
        <NewTweet user={session.user} />
        <div className="space-y-2">
          <Tweets tweets={tweets} />
        </div>
      </div>
    </div>
  )
}
