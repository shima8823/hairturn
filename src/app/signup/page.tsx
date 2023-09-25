'use client'
import { useState } from 'react'
import { InputGroup } from 'react-bootstrap'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Container className="p-3 my-5 d-flex flex-column w-50">
      <Form.Group className="mb-4">
        <Form.Label>メールアドレス</Form.Label>
        <Form.Control type="email" placeholder="mail@example.com" />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>パスワード</Form.Label>
        <Form.Control type={showPassword ? 'text' : 'password'} />
        <InputGroup>
          <Button
            variant="outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </InputGroup>
      </Form.Group>

      <Button className="mb-4">同意して登録する</Button>

      <div className="text-center">
        <p>
          会員登録には、
          <a href="">利用規約</a>と <a href="">プライバシーポリシー</a>{' '}
          への同意が必要です。
        </p>
      </div>
    </Container>
  )
}
