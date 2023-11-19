'use client'
import { Modal, Button } from 'react-bootstrap'
import Image from 'next/image'
import { Session } from '@supabase/auth-helpers-nextjs'

import { Database } from '@/lib/database.types'
type Hairstyle = Database['public']['Tables']['hairstyles']['Row']

export default function DisplayCard(props: {
  show: boolean
  handleClose: () => void
  hairstyle: Hairstyle
  session: Session | null
}) {
  const handleClose = () => {
    props.handleClose()
  }

  const handleAddHistory = async () => {
    if (!props.session) return
    // cardのidとuseridが欲しい
    const res = await fetch('/api/hairstyle-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.hairstyle)
    })
    if (!res.ok) {
      alert('履歴の追加に失敗しました。')
      return
    }
    alert('履歴に追加しました。')
    handleClose()
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.hairstyle.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.hairstyle.image_url && (
          <Image
            src={props.hairstyle.image_url}
            alt={props.hairstyle.title}
            width={450}
            height={450}
            layout="responsive"
          />
        )}
        <p>{props.hairstyle.description}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleAddHistory}>履歴に追加</Button>
      </Modal.Footer>
    </Modal>
  )
}
