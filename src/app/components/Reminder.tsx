'use client'

import { Form, Button } from 'react-bootstrap'

import { Database } from '@/lib/database.types'
import { useState } from 'react'
type User = Database['public']['Tables']['users']['Row']

export default function Reminder() {
  const [reminderDate, setReminderDate] = useState<string>('')

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = {
      id: '0',
      reminder_date: reminderDate
    } as User

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/account', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    if (!res.ok) {
      alert('更新に失敗しました')
      return
    }
    alert('更新しました')
  }
  return (
    <div style={{ padding: '20px', width: '50%', margin: 'auto' }}>
      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-4">
          <Form.Label>髪型変更のリマインド日</Form.Label>
          <Form.Control
            type="date"
            required
            onChange={(e) => setReminderDate(e.target.value)}
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button className="mb-4" type="submit">
            更新
          </Button>
        </div>
      </Form>
    </div>
  )
}
