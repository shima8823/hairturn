'use client'

import { useState } from 'react'
import { Card, ButtonGroup, Button } from 'react-bootstrap'

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
        style={{ padding: '20px', maxWidth: '70%', margin: 'auto' }}
      >
        <h1 style={{ textAlign: 'left', margin: '0 20px' }}>History</h1>

        <ButtonGroup
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '0 20px'
          }}
        >
          <Button
            variant={isDesc ? 'primary' : 'light'}
            onClick={() => setIsDesc(true)}
          >
            new
          </Button>
          <Button
            variant={!isDesc ? 'primary' : 'light'}
            onClick={() => setIsDesc(false)}
          >
            old
          </Button>
        </ButtonGroup>
      </div>

      <p style={{ marginLeft: '20px', color: 'gray', textAlign: 'center' }}>
        ※履歴は最大6件まで保存されます。7件目が追加されると、最も古い履歴が自動的に削除されます。
      </p>

      <div style={{ padding: '20px' }}>
        {sortedHairstyles.map((hairstyle, i) => (
          <Card
            key={i}
            className="mb-3"
            style={{ maxWidth: '70%', margin: 'auto' }}
            onClick={() => handleCardClick(hairstyle)}
          >
            <Card.Body style={{ flex: 1, display: 'flex' }}>
              <Card.Img
                src={hairstyle.image_url ? hairstyle.image_url : ''}
                style={{
                  marginRight: '20px',
                  minWidth: '100px',
                  overflow: 'hidden',
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover'
                }}
              />
              <div
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  wordWrap: 'break-word'
                }}
              >
                <Card.Title className="text-truncate">
                  {hairstyle.title}
                </Card.Title>
                <Card.Text className="text-truncate">
                  {hairstyle.description}
                </Card.Text>
              </div>
            </Card.Body>
            <Card.Footer style={{ textAlign: 'right', paddingTop: '5px' }}>
              {formatDate(hairstyle.created_at)}
            </Card.Footer>
          </Card>
        ))}
      </div>
      {selectedCard && (
        <DisplayCard
          show={showModal}
          handleClose={handleCloseModal}
          hairstyle={selectedCard}
          session={null}
        />
      )}
    </div>
  )
}
