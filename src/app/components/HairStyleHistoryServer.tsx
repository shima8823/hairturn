import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import HairStyleHistory from './HairStyleHistory'

import { Database } from '@/lib/database.types'
type Hairstyle = Database['public']['Tables']['hairstyles']['Row']

export default async function HairStyleHistoryServer() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  var hairstyles: Hairstyle[] = []

  if (session) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/hairstyle-history',
      {
        method: 'GET',
        headers: {
          Cookie: cookieStore.toString()
        }
      }
    )
    if (!res.ok) {
      return
    }
    const json = await res.json()
    if (json) {
      json.forEach((hairstyle: Hairstyle) => {
        const newHair: Hairstyle = {
          id: hairstyle.id,
          user_id: hairstyle.user_id,
          image_url: hairstyle.image_url,
          title: hairstyle.title,
          description: hairstyle.description,
          created_at: hairstyle.created_at,
          updated_at: hairstyle.updated_at,
          is_deleted: hairstyle.is_deleted
        }
        hairstyles.push(newHair)
      })
    }
  }

  return (
    <div>
      <HairStyleHistory hairstyles={hairstyles} />
      <div
        className="d-flex justify-content-center mt-4 mb-4"
        style={{ gap: '1rem' }}
      >
        <a
          href="/terms-of-use"
          style={{ color: 'gray', textDecoration: 'none' }}
        >
          利用規約
        </a>
        <a
          href="/privacy-policy"
          style={{ color: 'gray', textDecoration: 'none' }}
        >
          プライバシーポリシー
        </a>
        <a href="/contact" style={{ color: 'gray', textDecoration: 'none' }}>
          お問い合わせ
        </a>
      </div>
    </div>
  )
}
