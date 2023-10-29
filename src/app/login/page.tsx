'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/lib/database.types'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClientComponentClient<Database>()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if (error) {
      alert(error.message)
      return
    }
    router.back()
  }

  return (
    <Container className="p-3 my-5 d-flex flex-column w-50">
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-4">
          <Form.Label>メールアドレス</Form.Label>
          <Form.Control
            autoComplete="username"
            type="email"
            placeholder="m@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>パスワード</Form.Label>
          <Form.Control
            autoComplete="current-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Row className="d-flex justify-content-between mx-3 mb-4">
          <Col>
            <a href="/password-reset/request">パスワードを忘れた方</a>
          </Col>
        </Row>

        <Button className="mb-4" type="submit">
          ログイン
        </Button>
      </Form>

      <div className="text-center">
        <a href="/signup">新規登録はこちら</a>
      </div>
    </Container>
  )
}
