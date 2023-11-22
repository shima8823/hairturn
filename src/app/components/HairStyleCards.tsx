'use client'

import { useState } from 'react'
import { Card, Row, Col, Container, Dropdown } from 'react-bootstrap'
import styles from './HairStyleCards.module.css'
import { useRouter } from 'next/navigation'
import { Session } from '@supabase/auth-helpers-nextjs'
import DisplayCard from './DisplayCard'

import { Database } from '@/lib/database.types'
type Hairstyle = Database['public']['Tables']['hairstyles']['Row']

export default function HairStyleCards({
  hairstyles,
  session
}: {
  hairstyles: Hairstyle[]
  session: Session | null
}) {
  const [showModal, setShowModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Hairstyle | null>(null)
  const router = useRouter()

  const handleCardClick = (hairstyle: Hairstyle) => {
    setSelectedCard(hairstyle)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedCard(null)
  }

  const handleDeleteHair = async (hairstyle: Hairstyle) => {
    if (!hairstyle || !session) return

    // hairstylesテーブルから削除
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/hairstyles', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hairstyle)
    })
    if (!res.ok) {
      alert('削除に失敗しました。')
      return
    }

    handleCloseModal()
    router.refresh()
  }

  return (
    <Container>
      <Row>
        {hairstyles.map((hairstyle, index) => (
          <Col
            lg={4}
            md={6}
            sm={12}
            key={index}
            className="d-flex justify-content-center"
          >
            <div className={styles.cardContainer}>
              <Card onClick={() => handleCardClick(hairstyle)}>
                <Card.Img
                  variant="top"
                  src={hairstyle.image_url ? hairstyle.image_url : ''}
                  className={styles.cardImage}
                />
                <Card.Body>
                  <div className={styles.header}>
                    <Card.Title>{hairstyle.title}</Card.Title>
                    <Dropdown onClick={(e) => e.stopPropagation()}>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className={styles.dropdownToggle}
                      >
                        ︙
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            handleDeleteHair(hairstyle)
                          }}
                        >
                          削除
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      {selectedCard && (
        <DisplayCard
          show={showModal}
          handleClose={handleCloseModal}
          hairstyle={selectedCard}
          session={session}
        />
      )}
    </Container>
  )
}
