'use client'

import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { cardData } from '../cardUtils'
import RegisterCardModal from './RegisterCardModal'
import { Session } from '@supabase/supabase-js'
import DisplayCard from './DisplayCard'

export default function HairStyleControls({
  cards,
  session
}: {
  cards: cardData[]
  session: Session | null
}) {
  //   DisplayCard
  const [showRandomCard, setShowRandomCard] = useState(false)
  const [selectedCard, setSelectedCard] = useState<cardData | null>(null)
  const selectRandomCard = () => {
    console.log('selectRandomCard')
    setSelectedCard(cards[Math.floor(Math.random() * cards.length)])
    setShowRandomCard(true)
  }
  const handleCloseRandomCard = () => {
    setShowRandomCard(false)
    setSelectedCard(null)
  }

  //   RegisterCardModal
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(true)
    console.log('show')
  }

  const handleClose = () => {
    setShow(false)
  }
  console.log(session === null)

  return (
    <div>
      {session && (
        <RegisterCardModal
          show={show}
          handleClose={handleClose}
          session={session}
        />
      )}
      {selectedCard && (
        <DisplayCard
          show={showRandomCard}
          handleClose={handleCloseRandomCard}
          card={selectedCard}
        />
      )}

      <Button
        variant="primary"
        onClick={selectRandomCard}
        // className={styles['random-button']}
      >
        New Hair
      </Button>
      {/* 右寄り */}
      <div className="d-flex justify-content-end">
        {/* 検索バー */}
        <input
          type="text"
          placeholder="Search.."
          name="search"
          className="mr-3"
        />
        {/* ソート */}
        <select name="cars" id="cars" className="mr-3">
          <option value="volvo">New</option>
          <option value="saab">Old</option>
        </select>
        {/* New Card modal */}

        {session && (
          <Button variant="primary" onClick={handleShow}>
            追加
          </Button>
        )}
      </div>
    </div>
  )
}
