'use client'

import { useEffect, experimental_useOptimistic as useOptimistic } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import Likes from '@/components/likes'

const Tweets = ({ tweets }: { tweets: TweetWithAuthor[] }) => {
  const [optimisticTweets, setOptimisticTweets] = useOptimistic<TweetWithAuthor[], TweetWithAuthor>(
    tweets,
    (currentOptimisticTweets, newTweet) => {
      const newOptimisticTweets = [...currentOptimisticTweets]
      const index = newOptimisticTweets.findIndex((tweet) => tweet.id === newTweet.id)
      newOptimisticTweets[index] = newTweet
      return newOptimisticTweets
    },
  )

  const supabase = createClientComponentClient<DatabaseSchema>()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel('realtime tweets')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tweets',
        },
        (payload) => {
          router.refresh()
        },
      )
      .subscribe()

    return () => {
      // channel.unsubscribe()
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  return optimisticTweets.map((tweet) => (
    <div key={tweet.id}>
      <div className="flex flex-col">
        <div className="text-sm">
          {tweet.author.name} {tweet.author.username}
        </div>
        <div className="font-bold">{tweet.title}</div>
        <Likes tweet={tweet} setOptimisticTweet={setOptimisticTweets} />
      </div>
    </div>
  ))
}

export default Tweets
