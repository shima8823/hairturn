'use client'

import { useState } from 'react'
import { Card, Row, Col, Container, Button, Modal, Form } from 'react-bootstrap'
import { cardData } from '../cardUtils'
import styles from './HairStyleCards.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  createClientComponentClient,
  Session
} from '@supabase/auth-helpers-nextjs'

export default function HairStyleCards({
  cards,
  session
}: {
  cards: cardData[]
  session: Session | null
}) {
  console.log('HairStyleCards: ', cards)
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

  const handleDeleteHair = async () => {
    console.log('handleDeleteHair')
    console.log('selectedCard: ', selectedCard == null)
    console.log('session: ', session == null)
    if (!selectedCard || !session) return

    // hairstylesテーブルから削除して、storageからも削除する
    // selectedCard.imageのファイル名を取得 urlの最後の/以降の文字列
    const url = selectedCard.image_url
    if (url) {
      const fileName = url.split('/').pop()
      console.log('fileName: ', fileName)
      if (fileName) {
        const { data, error } = await supabase.storage
          .from('hairstyles')
          .remove([session.user.id + '/' + fileName])

        if (error) {
          console.log('error: ', error)
          return
        }
      }
    }

    // hairstylesテーブルから削除
    const res = await fetch('http://localhost:3000/api/hairstyles', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedCard)
    })
    if (!res.ok) {
      console.log(res.status)
      return
    }
    console.log('handleDeleteHair end')
    handleCloseModal()
    router.refresh()
  }

  return (
    <Container>
      <Row>
        {cards.map((card, index) => (
          <Col lg={4} md={6} sm={12} key={index}>
            <div className={styles.cardContainer}>
              {' '}
              {/* Apply fixed width and height to this container */}
              <Card onClick={() => handleCardClick(card)}>
                <Card.Img
                  variant="top"
                  src={card.image_url ? card.image_url : ''}
                  className={styles.cardImage} // Apply max-width and max-height to the image
                />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCard?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCard && selectedCard.image_url && (
            <Image
              src={selectedCard?.image_url}
              alt={selectedCard?.title}
              width={500}
              height={500}
            />
          )}
          <p>{selectedCard?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          {/* 削除 */}
          <Button variant="danger" onClick={handleDeleteHair}>
            削除
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
