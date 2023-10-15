'use client'

import styles from '@/app/styles/policies.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useRouter } from 'next/navigation'

export default function Contact() {
  const router = useRouter()
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className={`${styles['policies-contents']} col-md-8`}>
          <h1 className="text-center mb-4">お問い合わせ</h1>
          <p>
            サービスに関するお問い合わせ、ご質問ご相談、または運営者へのコンタクトは
            下記メールアドレス宛にお願い致します。
          </p>
          <div className="text-center">
            <a href="mailto:zubohair@gmail.com" className="text-center">
              zubohair@gmail.com
            </a>
          </div>
        </div>
        <a
          className={`${styles['pointer-cursor']} underline hover:text-gray-900 text-center d-block my-3`}
          onClick={() => router.back()}
        >
          戻る
        </a>
      </div>
    </div>
  )
}
