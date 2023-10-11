import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import HairStyleCards from './HairStyleCards'
import { Database } from '@/lib/database.types'
import { cardData, cardsData } from '../cardUtils'
import HairStyleControls from './HairStyleControls'

type Hairstyle = Database['public']['Tables']['hairstyles']['Row']
export default async function HairStyleCardsServer() {
  const supabase = createServerComponentClient({ cookies })
  console.log('HairStyleCardsServer')

  const {
    data: { session }
  } = await supabase.auth.getSession()

  //  sessionからユーザーの髪型を取得
  var cards: cardData[] = []

  if (session) {
    // apiを叩いてデータを取得 // cookieを使って認証

    const res = await fetch('http://localhost:3000/api/hairstyles', {
      method: 'GET',
      headers: {
        Cookie: cookies().toString()
      }
    })
    if (!res.ok) {
      console.log(res.status)
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
      console.log(cards)
    }
  } else {
    cards = cardsData
    console.log(cards)
  }

  return (
    <div>
      <HairStyleControls cards={cards} session={session} />
      <HairStyleCards cards={cards} session={session} />
    </div>
  )
}
