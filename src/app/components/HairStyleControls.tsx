'use client'

import { useState } from 'react'
import { Button } from 'react-bootstrap'
import RegisterCardModal from './RegisterCardModal'
import { Session } from '@supabase/supabase-js'
import DisplayCard from './DisplayCard'

import { Database } from '@/lib/database.types'
type Hairstyle = Database['public']['Tables']['hairstyles']['Row']

export default function HairStyleControls({
  hairstyles,
  session
}: {
  hairstyles: Hairstyle[]
  session: Session | null
}) {
  //   DisplayCard
  const [showRandomCard, setShowRandomCard] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Hairstyle | null>(null)
  const selectRandomCard = () => {
    setSelectedCard(hairstyles[Math.floor(Math.random() * hairstyles.length)])
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
  }

  const handleClose = () => {
    setShow(false)
  }

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
          hairstyle={selectedCard}
          session={session}
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
