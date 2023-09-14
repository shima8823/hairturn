'use client'
import styles from './page.module.css'
import { useDropzone } from 'react-dropzone'
import { useCallback, useMemo, useState } from 'react'
import { Card, Row, Col, Container, Button, Modal, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CardContext } from './components/CardContext'
import { cardsData, cardData, selectRandomCard } from './cardUtils'
import HairStyleControls from './components/HairStyleControls'

function chunkArray<cardData>(
  array: cardData[],
  chunkSize: number
): cardData[][] {
  const results = []
  let arrayCopy = [...array] // コピーを作成して作業する
  while (arrayCopy.length) {
    results.push(arrayCopy.splice(0, chunkSize))
  }
  return results
}

export default function Home() {
  const [cards, setCards] = useState<cardData[][]>(chunkArray(cardsData, 3))
  const [show, setShow] = useState(false)

  const [image, setImage] = useState<string>('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState<string | null>('')

  const handleClose = () => setShow(false)
  const handleSaveHair = () => {
    const newCard = {
      image: image,
      title: title,
      description: description
    }
    const newCardsData = [...cardsData, newCard]
    cardsData.push(newCard)
    console.log(newCard)
    console.log(cardsData)
    console.log(newCardsData)
    newCard.image = 'hair500.webp'

    setCards(chunkArray(newCardsData, 3))
    setShow(false)
  }
  const handleShow = () => setShow(true)
  const selectRandomCard = () => {
    const randomCard = cardsData[Math.floor(Math.random() * cardsData.length)]
    console.log(randomCard)
  }

  const handleCardClick = (card: cardData) => {
    setShow(true)
  }

  return (
    <CardContext.Provider value={{ cards, selectRandomCard }}>
      <div>
        {/* ランダムに髪型を決めるボタン 中央*/}
        <Button
          variant="primary"
          onClick={selectRandomCard}
          className={styles['random-button']}
        >
          New Hair
        </Button>

        <HairStyleControls addHair={handleShow} />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Image Input */}
              <Form.Group className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.value)}
                />
              </Form.Group>

              {/* Title Input */}
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              {/* Description Input */}
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveHair}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Container>
          {cards.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((card, cardIndex) => (
                <Col md={4} key={cardIndex}>
                  <Card
                    style={{ width: '18rem' }}
                    onClick={() => handleCardClick(card)}
                  >
                    <Card.Img
                      variant="top"
                      src={card.image}
                      className={styles['card-img-top']}
                    />
                    <Card.Body>
                      <Card.Title>{card.title}</Card.Title>
                      {/* <Card.Text className={styles["card-text"]}>
											{card.description}
										</Card.Text> */}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      </div>
    </CardContext.Provider>
  )
}
