import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const NewTweet = () => {
  const handleCreateTweet = async (formData: FormData) => {
    'use server'
    const title = String(formData.get('title'))
    const supabase = createServerActionClient<DatabaseSchema>({ cookies })
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('tweets').insert({ title, user_id: user.id })
    }
  }

  return (
    <form action={handleCreateTweet} className="space-y-4">
      <div className="flex space-x-2">
        <Input name="title" placeholder="Enter a tweet" type="text" />
        <Button type="submit">Create</Button>
      </div>
    </form>
  )
}

export default NewTweet
