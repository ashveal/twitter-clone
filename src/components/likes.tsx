'use client'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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

  return <Button onClick={handleLikes}>{tweet.likes} Likes</Button>
}

export default Likes
