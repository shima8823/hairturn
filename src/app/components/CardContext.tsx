'use client'

import { createContext } from 'react'

export const CardContext = createContext({
  cards: [] as any,
  selectRandomCard: () => {}
})
