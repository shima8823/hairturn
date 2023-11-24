'use client'

import { useState } from 'react'
import { Card, Dropdown, ButtonGroup, Button } from 'react-bootstrap'
import DisplayCard from './DisplayCard'

import { Database } from '@/lib/database.types'
type Hairstyle = Database['public']['Tables']['hairstyles']['Row']

export default function HairStyleCards({
  hairstyles
}: {
  hairstyles: Hairstyle[]
}) {
  const [showModal, setShowModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Hairstyle | null>(null)
  const [isDesc, setIsDesc] = useState(true)

  const sortedHairstyles = hairstyles.sort((a, b) => {
    if (isDesc) {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    } else {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    }
  })

  const handleCardClick = (hairstyle: Hairstyle) => {
    setSelectedCard(hairstyle)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedCard(null)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString('ja-JP', options)
  }

  return (
    <div style={{ padding: '20px', margin: '0 auto', maxWidth: '1200px' }}>
      <div
        className="d-flex justify-content-between"
        style={{ padding: '20px' }}
      >
        <h1 style={{ textAlign: 'left', marginLeft: '200px' }}>History</h1>

        <div
          className="d-flex align-items-center"
          style={{
            justifyContent: 'flex-end',
            marginRight: '200px'
          }}
        >
          <ButtonGroup>
            <Button
              variant={isDesc ? 'primary' : 'light'}
              onClick={() => setIsDesc(true)}
            >
              新しい順
            </Button>
            <Button
              variant={!isDesc ? 'primary' : 'light'}
              onClick={() => setIsDesc(false)}
            >
              古い順
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <p style={{ marginLeft: '20px', color: 'gray', textAlign: 'center' }}>
        ※履歴は最大6件まで保存されます。7件目が追加されると、最も古い履歴が自動的に削除されます。
      </p>

      <div style={{ padding: '20px' }}>
        {sortedHairstyles.map((hairstyle, i) => (
          <Card
            key={i}
            className="d-flex flex-row mb-3"
            style={{ maxWidth: '700px', margin: 'auto' }}
            onClick={() => handleCardClick(hairstyle)}
          >
            <Card.Body style={{ flex: 1, display: 'flex' }}>
              <div
                style={{
                  minWidth: '100px',
                  height: '100px',
                  overflow: 'hidden',
                  marginRight: '20px'
                }}
              >
                <Card.Img
                  src={hairstyle.image_url ? hairstyle.image_url : ''}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <Card.Title>{hairstyle.title}</Card.Title>
                  <Card.Text>{hairstyle.description}</Card.Text>
                </div>
                <Card.Footer style={{ textAlign: 'right', paddingTop: '5px' }}>
                  {formatDate(hairstyle.created_at)}
                </Card.Footer>
              </div>
            </Card.Body>
          </Card>
        ))}
        {selectedCard && (
          <DisplayCard
            show={showModal}
            handleClose={handleCloseModal}
            hairstyle={selectedCard}
            session={null}
          />
        )}
      </div>
    </div>
  )
}
