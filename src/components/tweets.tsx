'use client'

import { useEffect, experimental_useOptimistic as useOptimistic } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { formatDate } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  return optimisticTweets.map((tweet) => (
    <Card key={tweet.id}>
      <CardHeader className="py-4">
        <div className="flex space-x-2">
          <Avatar>
            <AvatarImage src={tweet.author.avatar_url} alt="AV" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{tweet.author.name}</CardTitle>
            <CardDescription>@{tweet.author.username}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className="text-md">{tweet.title}</div>
        <Likes tweet={tweet} setOptimisticTweet={setOptimisticTweets} />
      </CardContent>
      <CardFooter className="py-4">
        <time dateTime={tweet.created_at} className="text-light text-sm text-gray-500">
          {formatDate(tweet.created_at)}
        </time>
      </CardFooter>
    </Card>
  ))
}

export default Tweets
