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
        className="mb-3 mt-3 mx-auto d-block"
        style={{ width: '50%' }}
      >
        新しい髪型
      </Button>
      {session && (
        <div className="d-flex justify-content-end">
          <Button
            variant="outline-secondary"
            onClick={handleShow}
            className="mb-3 mt-3 mx-auto d-block"
            style={{ width: '50%' }}
          >
            追加
          </Button>
        </div>
      )}
    </div>
  )
}
