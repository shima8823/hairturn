'use client'

import styles from '@/app/styles/policies.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useRouter } from 'next/navigation'

export default function Terms() {
  const router = useRouter()
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className={`${styles['policies-contents']} col-md-8`}>
          <h1 className="text-center mb-4">利用規約</h1>
          <p>
            この利用規約（以下、「本規約」）は、運営者がこのウェブサイト上で提供するサービス（以下、「本サービス」）の利用条件を定めるものです。
            本サービスを利用するユーザーは本規約に従い、同意したうえで利用いただきます。
          </p>
          <div className="p-3 rounded">
            <h2>第1条（適用）</h2>
            <ol>
              <li>
                本規約は、ユーザーと運営者との間の本サービスの利用に関わる一切の関係に適用されるものとします。
              </li>
              <li>
                運営者は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
              </li>
              <li>
                本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
              </li>
            </ol>
            <h2>第2条（利用登録）</h2>
            <ol>
              <li>
                本サービスにおいては、登録希望者が本規約に同意の上、運営者の定める方法によって利用登録を行うものとします。
              </li>
              <li>
                運営者は、登録希望者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
                <ol>
                  <li>
                    第三者になりすましたり、虚偽の事項で利用登録を届け出た場合
                  </li>
                  <li>本規約に違反したことがある者からの申請である場合</li>
                  <li>その他、運営者が利用登録を相当でないと判断した場合</li>
                </ol>
              </li>
            </ol>
            <h2>第3条（アカウントの管理）</h2>
            <ol>
              <li>
                ユーザーは自己の責任において、本サービスのアカウント情報を適切に管理するものとします。
              </li>
              <li>
                ユーザーは、いかなる場合にも、アカウントを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。
                運営者は、本サービスのアカウントでログインされた場合には、そのアカウントを登録しているユーザー自身による利用とみなします。
              </li>
              <li>
                本サービスのユーザーアカウントが第三者によって使用されたことによって生じた損害は、運営者に故意又は重大な過失がある場合を除き、運営者は一切の責任を負わないものとします。
              </li>
            </ol>
            <h2>第4条（禁止事項）</h2>
            ユーザーは、本サービスの利用にあたり、以下の該当する行為、または運営者が該当すると判断する行為をしてはなりません。
            <ol>
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>
                本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為
              </li>
              <li>
                本サービスの稼働するシステムのサーバーまたはネットワークの機能を負荷を与え、妨害する行為
              </li>
              <li>本サービスによって得られた情報を商業的に利用する行為</li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>不正アクセスをし、またはこれを試みる行為</li>
              <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
              <li>不正な目的を持って本サービスを利用する行為</li>
              <li>
                本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為
              </li>
              <li>他のユーザーに成りすます行為</li>
              <li>本サービス上での宣伝、広告、勧誘、または営業行為</li>
              <li>面識のない異性との出会いを目的とした行為</li>
              <li>反社会的勢力に対して直接または間接に利益を供与する行為</li>
              <li>その他、運営者が不適切と判断する行為</li>
            </ol>
            <h2>第5条（本サービスの提供の停止等）</h2>
            <ol>
              <li>
                運営者は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                <ol>
                  <li>
                    本サービスに関連するサーバおよびネットワークの保守、点検または更新を行う場合
                  </li>
                  <li>
                    地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                  </li>
                  <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                  <li>その他、運営者が本サービスの提供が困難と判断した場合</li>
                </ol>
              </li>

              <li>
                運営者は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
              </li>
            </ol>
            <h2>第6条（ユーザーデータ）</h2>
            <ol>
              <li>
                本サービスを利用するうえでユーザーが入力したすべての情報について、運営者に対して、世界的、非独占的、サブライセンスおよび譲渡可能な無償ライセンスを付与するものとします。
              </li>
              <li>
                ユーザーが入力したすべての情報について、禁止事項に記載のある情報ではないことを運営者に対して表明し、保証するものとします。
              </li>
              <li>
                アップロードされたファイル（画像または写真）に映る著作物の著作権について、著作者に帰属します。
              </li>
              <li>
                本サービスの趣旨とは明らかに違う用途の使い方などをして、第三者ならびに運営者に対して損害、不利益などが生じた場合、損害賠償を請求できるものとします。
              </li>
              <li>
                運営者によるユーザーの個人情報、およびその他のユーザーデータの取り扱いについては、別途本サービス内のプライバシーポリシーの定めによるものとし、ユーザーはこのプライバシーポリシーに沿った形でユーザーの情報を取り扱うことについて同意するものとします。
              </li>
              <li>
                運営者は、ユーザーの個人情報を除くユーザーデータを個人を特定できない形で統計情報として、利用および公開することができるとし、ユーザーはこれに同意するものとします。
              </li>
            </ol>
            <h2>第7条（利用制限および登録抹消）</h2>
            <ol>
              <li>
                運営者は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
              </li>
              <ol>
                <li>本規約のいずれかの条項に違反した場合</li>
                <li>登録事項に虚偽の事実があることが判明した場合</li>
                <li>運営者からの連絡に対し、一定期間返答がない場合</li>
                <li>
                  本サービスについて、最終の利用から一定期間利用がない場合
                </li>
                <li>
                  その他、運営者が本サービスの利用を適当でないと判断した場合
                </li>
              </ol>
              <li>
                運営者は、本条に基づき運営者が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
              </li>
            </ol>
            <h2>第8条（退会）</h2>
            <p>
              ユーザーは、運営者の定める退会手続により、本サービスから退会できるものとします。
            </p>
            <h2>第9条（保証の否認および免責事項）</h2>
            <ol>
              <li>
                運営者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含む）がないことを明示的にも黙示的にも保証しておりません。
              </li>
              <li>
                運営者は、本サービスに起因してユーザーに生じたあらゆる損害について、運営者の故意又は重過失による場合を除き、一切の責任を負いません。ただし、本サービスに関する運営者とユーザーとの間の契約（本規約を含む）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
              </li>
              <li>
                運営者は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
              </li>
            </ol>
            <h2>第10条（サービス内容の変更等）</h2>
            <ol>
              <li>
                運営者は、運営者の都合により、本サービスの内容を変更および終了することがあり、ユーザーはこれを承諾するものとします。
              </li>
              <li>
                運営者は、本条に基づき、サービスの変更、終了をしたことで生じたユーザーへの損害について一切の責任を負いません。
              </li>
            </ol>
            <h2>第11条（利用規約の変更）</h2>
            <ol>
              <li>
                運営者は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
                <ul style={{ listStyleType: 'disc' }}>
                  <li>本規約の変更がユーザーの一般の利益に適合するとき。</li>
                  <li>
                    本規約の変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
                  </li>
                </ul>
              </li>
              <li>
                運営者はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
              </li>
            </ol>
            <h2>第12条（個人情報の取扱い）</h2>
            <p>
              運営者は、本サービスの利用によって取得する個人情報については、本サービス内の「プライバシーポリシー」に従い適切に取り扱うものとします。
            </p>
            <h2>第13条（通知または連絡）</h2>
            <p>
              ユーザーと運営者との間の通知または連絡は、運営者の定める方法によって行うものとします。運営者は、ユーザーから、運営者が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
            </p>
            <h2>第14条（権利義務の譲渡の禁止）</h2>
            <p>
              ユーザーは、運営者の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
            </p>
            <h2>第15条（準拠法・裁判管轄）</h2>
            <p>
              本規約の解釈にあたっては、日本法を準拠法とします。
              本サービスに関して紛争が生じた場合には、運営者の本店所在地を管轄する裁判所を専属的合意管轄とします。
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
