import { Database } from '@/lib/database.types'
type Hairstyle = Database['public']['Tables']['hairstyles']['Row']

const directory = '/assets/image/'

const cardsData: Hairstyle[] = [
  {
    id: 1,
    title: 'ツーブロック',
    image_url: directory + 'block.png',
    description: 'サイドを短く、トップを長くするスタイル',
    user_id: '1',
    created_at: '2023-10-01',
    updated_at: '2023-10-01',
    is_deleted: false
  },
  {
    id: 2,
    title: 'ロングヘア',
    image_url: directory + 'long.png',
    description: '長めの髪の毛をパーマにかけて、動きを出すスタイル',
    user_id: '1',
    created_at: '2023-10-01',
    updated_at: '2023-10-01',
    is_deleted: false
  },
  {
    id: 3,
    title: 'ソフトモヒカン',
    image_url: directory + 'softmohawk.png',
    description: 'サイドを短く、トップを長くするスタイル',
    user_id: '1',
    created_at: '2023-10-01',
    updated_at: '2023-10-01',
    is_deleted: false
  },
  {
    id: 4,
    title: 'アート',
    image_url: directory + 'art.png',
    description: '',
    user_id: '1',
    created_at: '2023-10-01',
    updated_at: '2023-10-01',
    is_deleted: false
  },
  {
    id: 5,
    title: 'ツートンカラー',
    image_url: directory + 'two-tone.png',
    description: 'カラー2色使うスタイル',
    user_id: '1',
    created_at: '2023-10-01',
    updated_at: '2023-10-01',
    is_deleted: false
  },
  {
    id: 6,
    title: 'ポンパドール',
    image_url: directory + 'pompadour.png',
    description: 'トップを立たせるスタイル',
    user_id: '1',
    created_at: '2023-10-01',
    updated_at: '2023-10-01',
    is_deleted: false
  }
]

export { cardsData }
