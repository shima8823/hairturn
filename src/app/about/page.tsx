'use client'

import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useRouter } from 'next/navigation'

export default function About() {
  const router = useRouter()
  return (
    <Container fluid className="h-100 bg-light">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={10} md={8} lg={6} className="text-center">
          <h1 className="display-4 mb-4">かんたんに髪型を変えてみよう。</h1>
          <p className="lead mb-3">
            髪型を変えたいけど、決めるのがめんどくさい
          </p>
          <p className="lead mb-3">
            似合う似合わない関係ない、とりあえず変えてみたい
          </p>
          <p className="lead">積みヘアを管理したい</p>
          <button
            className="btn btn-primary btn-lg mr-3"
            onClick={() => router.push('/signup')}
          >
            新規登録
          </button>
        </Col>
      </Row>
    </Container>
  )
}
