import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import Reminder from './Reminder'

export default async function ReminderServer() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session == null) {
    window.location.href = '/login'
  }

  return (
    <div>
      <Reminder />
    </div>
  )
}
