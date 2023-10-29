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

  const handleLogin = async () => {
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
      <Form.Group className="mb-4">
        <Form.Label>メールアドレス</Form.Label>
        <Form.Control
          type="email"
          placeholder="mail@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>パスワード</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Row className="d-flex justify-content-between mx-3 mb-4">
        <Col>
          <Form.Check label="Remember me" />
        </Col>
        <Col className="text-end">
          <a href="/password-reset/request">パスワードを忘れた方</a>
        </Col>
      </Row>

      <Button className="mb-4" onClick={handleLogin}>
        ログイン
      </Button>

      <div className="text-center">
        <a href="/signup">新規登録はこちら</a>
      </div>
    </Container>
  )
}
