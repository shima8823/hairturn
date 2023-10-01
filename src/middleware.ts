import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const {
    data: { session }
  } = await supabase.auth.getSession()
  const path = req.nextUrl.pathname
  if (session) {
    if (path === '/login' || path === '/signup') {
      return NextResponse.redirect(new URL('/', req.nextUrl).href)
    }
  } else {
    if (path === '/test') {
      return NextResponse.redirect(new URL('/login', req.nextUrl).href)
    }
  }
  return res
}
