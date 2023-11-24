'use client'

import Reminder from './Reminder'
import { Modal } from 'react-bootstrap'

export default function ReminderModal(props: {
  show: boolean
  handleClose: () => void
}) {
  const handleClose = () => {
    props.handleClose()
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reminder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Reminder />
      </Modal.Body>
    </Modal>
  )
}
