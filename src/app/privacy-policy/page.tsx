'use client'

import styles from '@/app/styles/policies.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useRouter } from 'next/navigation'

export default function PrivacyPolicy() {
  const router = useRouter()
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className={`${styles['policies-contents']} col-md-8`}>
          <h1 className="text-center mb-4">プライバシーポリシー</h1>
          <p>
            運営する者（以下、「運営者」）は本ウェブサイト上で提供するサービス（以下、「本サービス」）におけるユーザーの個人情報、およびユーザーデーターの取扱いについて以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
          </p>
          <div className="p-3 rounded">
            <h2>第1条（個人情報とユーザーデータ）</h2>
            <p>
              本サービスで取り扱う個人情報を、本サービス登録時の外部SNSアカウント情報とし、それ以外のユーザーが入力し保存したデータをユーザーデータと定義します。
              ユーザーデータには本サービスで管理するテキスト、それに付随する情報すべてを指し、アップロードする画像等も含まれます。
            </p>
            <h2>第2条（個人情報の収集方法）</h2>
            <ol>
              <li>
                本サービスをユーザーが登録するときに、外部SNSのAPIを通じ、紐づくメールアドレス、ユーザー名、および一意となる外部SNSのIDを取得させていただきます。
              </li>
              <li>
                本サービスの問い合わせメールアドレス宛に、メール送信時の送信者情報としてのメールアドレスについても取得させていただきます。
                <ul style={{ listStyleType: 'disc' }}>
                  <li>
                    この場合、本サービス内で管理する個人情報としてではなく、問い合わせされた方と運営者間のメールでのやり取りを主目的とし、運営者の本サービス開発および運営で使用する端末にメールとして保存されます。
                  </li>
                  <li>
                    本サービス終了時、または問い合わせされた方本人の削除依頼により、速やかに該当のメールを端末から削除いたします。
                  </li>
                  <li>
                    メールサーバに残るデータは、送信日から6ヶ月を目処に削除いたします。
                  </li>
                </ul>
              </li>
            </ol>
            <h2>第3条（ユーザーデータの収集方法）</h2>
            <p>
              本サービスを利用する上で、ユーザーご自身で入力し保存するデータを取得させていただきます。
              これにはアップロードする画像も含まれます。
            </p>
            <h2>第4条（個人情報を収集・利用する目的）</h2>
            <p>
              本サービスをユーザーが利用する上で、登録時の外部SNSに紐づくメールアドレスを利用させていただく場合がございます。
              本サービスの利用規約、または本ポリシーに変更が生じた場合の周知をメールで送信するときの宛先として利用させていただく場合がございます。
              本サービスの利用規約に違反をした、あるいは違反を疑われる行為をしたと運営者が判断した場合の連絡手段として、利用させていただく場合がございます。
            </p>
            <h2>第5条（個人情報の第三者提供）</h2>
            次に掲げる場合を除いてあらかじめユーザーの同意を得ることなく第三者に個人情報を提供することはありません。
            <ol>
              <li>法令に基づく場合</li>
              <li>
                人の生命身体または財産の保護のために必要がある場合であって本人の同意を得ることが困難である場合
              </li>
              <li>
                公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって本人の同意を得ることが困難である場合
              </li>
              <li>
                国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがある場合
              </li>
              <li>
                利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
              </li>
              <li>
                合併その他の事由による事業の承継に伴って個人情報が提供される場合
              </li>
            </ol>
            <h2>第6条（個人情報の開示）</h2>
            <p>
              本人から個人情報の開示を求められたときは本人に対し遅滞なくこれを開示します。ただし、現時点では個人情報としてなり得る情報が外部SNSに紐づく情報となり、本サービスが主となる情報を保持していないことから、開示する必要性のないものとなります。
            </p>
            <h2>第8条（個人情報の利用停止等）</h2>
            個人情報利用停止は以下のときです。
            <ol>
              <li>本サービス終了時</li>
            </ol>
            <h2>第9条（プライバシーポリシーの変更）</h2>
            <p>
              本ポリシーの内容は法令その他本ポリシーに別段の定めのある事項を除いてユーザーに通知することなく変更することができるものとします。
              変更後のプライバシーポリシーは本ウェブサイトに掲載したときから効力を生じるものとします。
            </p>
            <h2>第10条（お問い合わせ窓口）</h2>
            <p>
              本ポリシーに関するお問い合わせは下記のメールアドレスまでお願いいたします。
            </p>
            <p>
              メールアドレス：
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
              </a>
            </p>
            2023年10月1日 制定
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
