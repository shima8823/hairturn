'use client'

import { Form, Button } from 'react-bootstrap'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { passwordPattern } from '@/lib/user'

export default function Confirm() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newPassword !== confirmNewPassword) {
      alert('パスワードが一致しません。')
      return
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error || !data) {
      alert('パスワードのリセットに失敗しました。')
      return
    }

    router.push('/')
    alert('パスワードを変更しました。')
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold">パスワードのリセット</h1>
        <p className="mb-2 text-muted">
          下記のフォームに入力して、パスワードを変更してください。
        </p>
        <Form className="space-y-4" onSubmit={handleSubmit}>
          <Form.Group className="space-y-2">
            <Form.Label htmlFor="newPassword">新しいパスワード:</Form.Label>
            <Form.Text className="text-muted">
              大文字と小文字の英数字を含む8文字以上で入力してください。
            </Form.Text>
            <Form.Control
              id="newPassword"
              required
              pattern={passwordPattern}
              autoComplete="new-password"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="space-y-2 mb-3">
            <Form.Label htmlFor="confirmNewPassword">
              パスワードを確認
            </Form.Label>
            <Form.Control
              id="confirmNewPassword"
              required
              type="password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="w-full" type="submit">
            パスワードを変更する
          </Button>
        </Form>
      </div>
    </div>
  )
}
