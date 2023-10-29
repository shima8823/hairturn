'use client'

import { useState } from 'react'
import { Card, Row, Col, Container, Dropdown } from 'react-bootstrap'
import { cardData } from '../cardUtils'
import styles from './HairStyleCards.module.css'
import { useRouter } from 'next/navigation'
import {
  createClientComponentClient,
  Session
} from '@supabase/auth-helpers-nextjs'
import DisplayCard from './DisplayCard'

export default function HairStyleCards({
  cards,
  session
}: {
  cards: cardData[]
  session: Session | null
}) {
  const [showModal, setShowModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState<cardData | null>(null)
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleCardClick = (card: cardData) => {
    setSelectedCard(card)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedCard(null)
  }

  const handleDeleteHair = async (card: cardData) => {
    if (!card || !session) return

    // hairstylesテーブルから削除して、storageからも削除する
    // card.imageのファイル名を取得 urlの最後の/以降の文字列
    const url = card.image_url
    if (url) {
      const fileName = url.split('/').pop()
      if (fileName) {
        const { data, error } = await supabase.storage
          .from('hairstyles')
          .remove([session.user.id + '/' + fileName])

        if (error) {
          alert('画像の削除に失敗しました。')
          return
        }
      }
    }

    // hairstylesテーブルから削除
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/hairstyles', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    })
    if (!res.ok) {
      return
    }
    handleCloseModal()
    router.refresh()
  }

  return (
    <Container>
      <Row>
        {cards.map((card, index) => (
          <Col
            lg={4}
            md={6}
            sm={12}
            key={index}
            className="d-flex justify-content-center"
          >
            <div className={styles.cardContainer}>
              <Card onClick={() => handleCardClick(card)}>
                <Card.Img
                  variant="top"
                  src={card.image_url ? card.image_url : ''}
                  className={styles.cardImage}
                />
                <Card.Body>
                  <div className={styles.header}>
                    <Card.Title>{card.title}</Card.Title>
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
                            handleDeleteHair(card)
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
          card={selectedCard}
        />
      )}
    </Container>
  )
}
