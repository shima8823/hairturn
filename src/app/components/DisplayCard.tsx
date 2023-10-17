'use client'
import { Modal } from 'react-bootstrap'
import Image from 'next/image'

import { cardData } from '../cardUtils'

export default function DisplayCard(props: {
  show: boolean
  handleClose: () => void
  card: cardData
}) {
  const handleClose = () => {
    props.handleClose()
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.card?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.card && props.card.image_url && (
          <Image
            src={props.card?.image_url}
            alt={props.card?.title}
            width={450}
            height={450}
            layout="responsive"
          />
        )}
        <p>{props.card?.description}</p>
      </Modal.Body>
    </Modal>
  )
}
