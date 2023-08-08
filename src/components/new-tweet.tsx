import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/auth-helpers-nextjs'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const NewTweet = ({ user }: { user: User }) => {
  const handleCreateTweet = async (formData: FormData) => {
    'use server'
    const title = String(formData.get('title'))
    const supabase = createServerActionClient<DatabaseSchema>({ cookies })
    await supabase.from('tweets').insert({ title, user_id: user.id })
  }

  return (
    <form action={handleCreateTweet} className="space-y-4">
      <div className="flex space-x-2">
        <Avatar>
          <AvatarImage src={user.user_metadata.avatar_url} alt="AV" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <Input name="title" placeholder="What's happening?" type="text" />
        <Button type="submit">Create</Button>
      </div>
    </form>
  )
}

export default NewTweet
