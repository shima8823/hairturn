import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import HairStyleCards from './HairStyleCards'
import { Database } from '@/lib/database.types'
import { cardData, cardsData } from '../cardUtils'
import HairStyleControls from './HairStyleControls'

type Hairstyle = Database['public']['Tables']['hairstyles']['Row']
export default async function HairStyleCardsServer() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  var cards: cardData[] = []

  if (session) {
    // apiを叩いてデータを取得 // cookieを使って認証

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/hairstyles', {
      method: 'GET',
      headers: {
        Cookie: cookieStore.toString()
      }
    })
    if (!res.ok) {
      return
    }
    const json = await res.json()
    if (json) {
      json.forEach((hairstyle: Hairstyle) => {
        const newCard: cardData = {
          image_url: hairstyle.image_url,
          title: hairstyle.title,
          description: hairstyle.description
        }
        cards.push(newCard)
      })
    }
  } else {
    cards = cardsData
  }

  return (
    <div>
      <HairStyleControls cards={cards} session={session} />
      <HairStyleCards cards={cards} session={session} />
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
