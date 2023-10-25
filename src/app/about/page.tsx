'use client'

import { Container, Row, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/app/about/page.module.css'
import Image from 'next/image'

import { useRouter } from 'next/navigation'

const hairstylesListImage = '/assets/image/hairstyles-list.png'
const randomStyleImage = '/assets/image/random.png'

export default function About() {
  const router = useRouter()
  return (
    <Container className="my-5">
      <div className="text-center">
        <h1 className="mb-5">かんたんに髪型を変えてみよう。</h1>
        <p className={`${styles['large-text']} mb-2`}>積みヘアを管理したい</p>
        <div className={`${styles['service-point']} mb-5 p-1 `}>
          <Image
            src={hairstylesListImage}
            alt="hairstyles list"
            width={1200}
            height={700}
            className={`${styles['image-style']}`}
          />
          <p className={`${styles['large-text']} mb-2`}>
            髪型をリストに登録して管理できます。
          </p>
        </div>
        <p className={`${styles['large-text']} mb-2`}>
          髪型を変えたいけど、決めるのがめんどくさい
        </p>
        <div className={`${styles['service-point']} mb-5 p-1 `}>
          <Image
            src={randomStyleImage}
            alt="random style"
            width={1200}
            height={700}
            className={`${styles['image-style']}`}
          />
          <p className={`${styles['large-text']}`}>
            リストからランダムに髪型を選んでくれます。
          </p>
        </div>
        <Button variant="outline-success" href="/signup">
          新規登録
        </Button>
      </div>
    </Container>
  )
}
