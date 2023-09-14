interface cardData {
  image: string
  title: string
  description: string | null
}

const cardsData: cardData[] = [
  {
    image: 'hair500.webp',
    title: 'Card 1',
    description: 'This is the content of Card 1.'
  },
  {
    image: 'hair1000.webp',
    title: 'Card 2',
    description: 'This is the content of Card 2.'
  },
  {
    image: '',
    title: 'Card 3',
    description: 'This is the content of Card 3.'
  },
  {
    image: '',
    title: 'Card 4',
    description: 'This is the content of Card 4.'
  },
  {
    image: '',
    title: 'Card 5',
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
