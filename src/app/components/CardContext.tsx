'use client'

import React from 'react'
import { createContext } from 'react'

export const CardContext = createContext({
  cards: [] as any,
  selectRandomCard: () => {}
})
