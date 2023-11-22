'use client'
import { Button, Modal, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  createClientComponentClient,
  Session
} from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import crypto from 'crypto'

import { Database } from '@/lib/database.types'
type Hairstyle = Database['public']['Tables']['hairstyles']['Row']

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
  const [title, setTitle] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)

  const supabase = createClientComponentClient()

  const handleClose = () => {
    props.handleClose()
    setImageURL(null)
    setTitle(null)
    setDescription(null)
    setFile(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const fileObj = e.target.files[0]
    if (fileObj) {
      const src = URL.createObjectURL(fileObj)
      setFile(fileObj)
      setImageURL(src)
    }
  }
  async function fetchImage(bucket: string, path: string): Promise<string> {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  }

  const handleSaveHair = async () => {
    var imageStoragePath = ''
    if (!title) {
      alert('タイトルを入力してください')
      return
    }
    if (file) {
      // supabase に保存、成功したらそのurlを取得してpublic.hairstylesに保存
      const randomFileName = generateSecureRandomString(15)
      const saveStoragePath = props.session.user.id + '/' + randomFileName
      const { data, error } = await supabase.storage
        .from('hairstyles')
        .upload(saveStoragePath, file)
      if (error) {
        alert('画像の保存に失敗しました')
        return
      }
      imageStoragePath = await fetchImage('hairstyles', saveStoragePath)
    }

    const newHair: Hairstyle = {
      id: 0,
      user_id: props.session.user.id,
      image_url: imageStoragePath ? imageStoragePath : null,
      title: title,
      description: description,
      created_at: '0001-01-01T00:00:00Z',
      updated_at: '0001-01-01T00:00:00Z',
      is_deleted: null
    }

    const res = await fetch('/api/hairstyles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newHair)
    })
    if (!res.ok) {
      alert('登録に失敗しました')
      if (newHair.image_url) {
        const fileName = newHair.image_url.split('/').pop()
        if (fileName) {
          const { data, error } = await supabase.storage
            .from('hairstyles')
            .remove([props.session.user.id + '/' + fileName])

          if (error) {
            return
          }
        }
      }
      return
    }
    handleClose()
    router.refresh()
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>カードを登録</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
            <Form.Text className="text-muted">
              ※有効なファイルサイズは1MB以下です
            </Form.Text>
          </Form.Group>
          {imageURL && (
            <div>
              <Image
                src={imageURL}
                alt="Selected"
                width={450}
                height={450}
                layout="responsive"
              />
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

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
        <p className="mb-2 mt-2 mx-auto d-block">※最大6種類まで登録できます</p>
        <Button variant="primary" onClick={handleSaveHair}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
