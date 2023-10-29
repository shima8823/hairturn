'use client'

import { useState } from 'react'
import { InputGroup } from 'react-bootstrap'
import { Container, Form, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/lib/database.types'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClientComponentClient<Database>()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!emailRegex.test(email)) {
      alert('正しいメールアドレスを入力してください')
      return
    }

    if (!passwordRegex.test(password)) {
      alert(
        'パスワードは8文字以上で、大文字・小文字・数字・記号を含めてください'
      )
      return
    }

    supabase.auth
      .signUp({
        email: email,
        password: password
      })
      .then((data) => {
        if (data.data.user !== null) {
          fetch('/api/account', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: data.data.user?.id
            })
          }).then(() => {
            alert('メールアドレス確認メールを送信しました。')
            router.back()
          })
        }
      })
      .catch((error) => {
        alert(error.error_description || error.message)
      })
  }
  return (
    <Container className="p-3 my-5 d-flex flex-column w-50">
      <Form onSubmit={handleSignUp}>
        <Form.Group className="mb-4">
          <Form.Label>メールアドレス</Form.Label>
          <Form.Control
            id="email"
            type="email"
            required
            placeholder="m@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>パスワード</Form.Label>
          <Form.Control
            id="password"
            required
            autoComplete="new-password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputGroup>
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button className="mb-4" type="submit">
          同意して登録する
        </Button>
      </Form>

      <div className="text-center">
        <p>
          新規登録には、
          <a href="/terms-of-use">利用規約</a>と{' '}
          <a href="/privacy-policy">プライバシーポリシー</a>{' '}
          への同意が必要です。
        </p>
      </div>
    </Container>
  )
}
