'use client'
import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

export default function Login() {
  return (
    <Container className="p-3 my-5 d-flex flex-column w-50">
      <Form.Group className="mb-4">
        <Form.Label>メールアドレス</Form.Label>
        <Form.Control type="email" />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>パスワード</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Row className="d-flex justify-content-between mx-3 mb-4">
        <Col>
          <Form.Check label="Remember me" />
        </Col>
        <Col className="text-end">
          <a href="!#">パスワードを忘れた方</a>
        </Col>
      </Row>

      <Button className="mb-4">ログイン</Button>

      <div className="text-center">
        <a href="#!">会員登録はこちら</a>
        <p>or sign up with:</p>

        <div
          className="d-flex justify-content-between mx-auto"
          style={{ width: '40%' }}
        >
          <Button variant="outline-primary" className="m-1">
            <i className="fab fa-facebook-f"></i>
          </Button>
          <Button variant="outline-primary" className="m-1">
            <i className="fab fa-twitter"></i>
          </Button>
          <Button variant="outline-primary" className="m-1">
            <i className="fab fa-google"></i>
          </Button>
          <Button variant="outline-primary" className="m-1">
            <i className="fab fa-github"></i>
          </Button>
        </div>
      </div>
    </Container>
  )
}
