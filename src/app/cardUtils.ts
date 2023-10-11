interface cardData {
  image_url: string | null
  title: string
  description: string | null
}

const cardsData: cardData[] = [
  {
    title: 'Card 1',
    image_url: 'hair500.webp',
    description: 'This is the content of Card 1.'
  },
  {
    title: 'Card 2',
    image_url: 'hair1000.webp',
    description: 'This is the content of Card 2.'
  },
  {
    title: 'Card 3',
    image_url: '',
    description: 'This is the content of Card 3.'
  },
  {
    title: 'Card 4',
    image_url: '',
    description: 'This is the content of Card 4.'
  },
  {
    title: 'Card 5',
    image_url: '',
    description: 'This is the content of Card 5.'
  }
]

export const selectRandomCard = () => {
  const randomCard = cardsData[Math.floor(Math.random() * cardsData.length)]
  console.log(randomCard)
  return randomCard
}

export { cardsData }
export type { cardData }
