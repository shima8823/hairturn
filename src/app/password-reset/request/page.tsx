'use client'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form } from 'react-bootstrap'

import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

export default function PasswordReset() {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.NEXT_PUBLIC_APP_URL + '/password-reset/confirm'
    })

    if (error) {
      alert('リンクの送信に失敗しました。')
      return
    }

    alert('パスワードをリセットするリンクを送信しました。')
  }

  return (
    <div className="container mt-5 w-50 p-3">
      <h1 className="text-2xl font-bold text-center mb-4">
        パスワードをリセット
      </h1>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
        メールアドレスを入力してください。パスワードをリセットするリンクを送信します。
      </p>
      <Form className="d-flex flex-column" onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>メール</Form.Label>
          <Form.Control
            className="w-full"
            id="email"
            placeholder="m@example.com"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mb-4">
          リセットリンクを送信
        </Button>
      </Form>
      <div className="mt-6 text-center">
        <Link className="text-blue-500 hover:text-blue-600" href="/login">
          ログインに戻る
        </Link>
      </div>
    </div>
  )
}
