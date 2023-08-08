'use client'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'

const Likes = ({
  tweet,
  setOptimisticTweet,
}: {
  tweet: TweetWithAuthor
  setOptimisticTweet: (newTweet: TweetWithAuthor) => void
}) => {
  const router = useRouter()

  const handleLikes = async () => {
    const supabase = createClientComponentClient<DatabaseSchema>()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      if (tweet.user_has_liked_tweet) {
        setOptimisticTweet({
          ...tweet,
          likes: tweet.likes - 1,
          user_has_liked_tweet: false,
        })
        await supabase.from('likes').delete().match({ user_id: user.id, tweet_id: tweet.id })
      } else {
        setOptimisticTweet({
          ...tweet,
          likes: tweet.likes + 1,
          user_has_liked_tweet: true,
        })
        await supabase.from('likes').insert({ user_id: user.id, tweet_id: tweet.id })
      }
      router.refresh()
    }
  }

  return (
    <Button variant="link" className="group flex items-center space-x-1 p-0 hover:no-underline" onClick={handleLikes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          'group-hover:fill-red-400 group-hover:stroke-red-400',
          tweet.user_has_liked_tweet ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-500',
        )}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <span className="text-sm">{tweet.likes}</span>
    </Button>
  )
}

export default Likes
