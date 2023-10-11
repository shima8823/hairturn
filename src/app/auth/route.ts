import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'

// export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient<Database>({
    cookies
  })

  console.log('cookies', cookies)
  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (!session) {
    console.log('session', session)
    return NextResponse.redirect(new URL('/login', request.url).href)
  }

  const data = {
    user_id: session.user.id
  }
  //   responseにdataをエンコードして返す

  return NextResponse.json(data)
}
