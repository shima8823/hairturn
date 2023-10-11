'use client'
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Modal,
  Form
} from 'react-bootstrap'
import { CardContext } from './CardContext'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  createClientComponentClient,
  Session
} from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'

import type { Database } from '@/lib/database.types'
import { cardData } from '../cardUtils'
import crypto from 'crypto'

// supabase storageからdownloadする関数

function generateSecureRandomString(length: number): string {
  return crypto.randomBytes(length).toString('hex').slice(0, length)
}

export default function RegisterCardModal(props: {
  show: boolean
  handleClose: () => void
  session: Session
}) {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [imageURL, setImageURL] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState<string | null>('')

  const supabase = createClientComponentClient()

  const handleClose = () => {
    props.handleClose()
    setImageURL(null)
    setFile(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleImageChange')
    if (!e.target.files) return
    console.log('handleImageChange2')

    const fileObj = e.target.files[0]
    if (fileObj) {
      const src = URL.createObjectURL(fileObj)
      //   console.log('file.name: ', file.name)
      setFile(fileObj)
      setImageURL(src)
      console.log('handleImageChange3')
      //   setFile(file)
    }
  }
  async function fetchImage(bucket: string, path: string): Promise<string> {
    console.log('fetchImage')
    console.log('bucket: ', bucket)
    console.log('path: ', path)

    const { data } = supabase.storage.from(bucket).getPublicUrl(path)

    console.log('data: ', data)
    console.log('fetchImage end')
    return data.publicUrl
  }

  const handleSaveHair = async () => {
    console.log('handleSaveHair')
    var imageStoragePath = ''
    if (file) {
      // supabase に保存、成功したらそのurlを取得してpublic.hairstylesに保存

      const randomFileName = generateSecureRandomString(15)
      const saveStoragePath = props.session.user.id + '/' + randomFileName
      const { data, error } = await supabase.storage
        .from('hairstyles')
        .upload(saveStoragePath, file)
      if (error) {
        console.log(error)
        return
      }

      console.log('data: ', data)
      console.log('imageURL: ', imageURL)

      imageStoragePath = await fetchImage('hairstyles', saveStoragePath)
    }

    console.log('after fetchImage')
    console.log('imageStoragePath: ', imageStoragePath)

    const newCard: cardData = {
      image_url: imageStoragePath ? imageStoragePath : '',
      title: title,
      description: description
    }
    console.log(newCard)

    const res = await fetch('/api/hairstyles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCard)
    })
    if (!res.ok) {
      console.log(res.status)
      return
    }
    console.log('handleSaveHair end')
    handleClose()
    router.refresh()
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Image Input */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
          {imageURL && (
            <div>
              <Image src={imageURL} alt="Selected" width={500} height={500} />
            </div>
            // <img
            //   src={imageURL}
            //   alt="Selected"
            //   style={{ maxWidth: '100%', height: 'auto' }}
            // />
          )}

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
  )
}