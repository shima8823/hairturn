interface cardData {
  image_url: string | null
  title: string
  description: string | null
}

const directory = '/assets/image/'

const cardsData: cardData[] = [
  {
    title: 'ツーブロック',
    image_url: directory + 'block.png',
    description: 'サイドを短く、トップを長くするスタイル'
  },
  {
    title: 'ロングヘア',
    image_url: directory + 'long.png',
    description: '長めの髪の毛をパーマにかけて、動きを出すスタイル'
  },
  {
    title: 'ソフトモヒカン',
    image_url: directory + 'softmohawk.png',
    description: 'サイドを短く、トップを長くするスタイル'
  },
  {
    title: 'アート',
    image_url: directory + 'art.png',
    description: ''
  },
  {
    title: 'ツートンカラー',
    image_url: directory + 'two-tone.png',
    description: 'カラー2色使うスタイル'
  },
  {
    title: 'ポンパドール',
    image_url: directory + 'pompadour.png',
    description: 'トップを立たせるスタイル'
  }
]

export { cardsData }
export type { cardData }
