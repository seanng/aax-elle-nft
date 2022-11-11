import type { NextPage } from 'next'
import {
  MintLayout,
  BigQuestionIcon,
  ClosePinkIcon,
  CaretDownPinkIcon,
} from 'components'
import { Disclosure } from '@headlessui/react'

const faqs = [
  {
    question:
      '我一定要有虛擬錢包和以太幣(ETH)，才能鑄造 ELLE Love Impact NFT 嗎？',
    answer: (
      <>
        <p>
          是的，因為鑄造(mint) NFT 需要連結虛擬錢包，其中也會衍伸部分 Gas Fee
          (手續費)，所以我們建議你在活動開始前，就先辦好錢包，並轉帳好所需的以太幣喔，以利於鑄造獨一無二的
          ELLE Love Impact NFT 喔～
        </p>
        <br />
        <p>
          - 如何使用虛擬錢包轉帳和交易？ {'>>'} 連結至{' '}
          <a
            href="https://www.aax.com/zh-TW/newbie/"
            target="_blank"
            rel="noreferrer"
          >
            https://www.aax.com/zh-TW/newbie/
          </a>
        </p>
        <p>
          - 轉帳常見問題？ {'>>'} 連結至{' '}
          <a href="https://reurl.cc/8pl2p4" target="_blank" rel="noreferrer">
            https://reurl.cc/8pl2p4
          </a>
        </p>
      </>
    ),
  },
  {
    question: '我可以自留 ELLE Love Impact NFT，不傳給對方嗎？',
    answer: (
      <p>
        當然可以啊！ELLE 也鼓勵你鑄造(mint) Love Impact NFT
        給未來的自己，與自己對話、輸入完愛的訊息 E-mail 後，記得要用 E-mail
        的連結與自訂的專屬密碼開啟 Love Impact NFT，就能自留這個專屬於自己的 NFT
        啦～
      </p>
    ),
  },
  {
    question: '如果我不想鑄造 NFT，輸入完愛的訊息後，我會拿到什麼呢？',
    answer: (
      <>
        <p>
          若你沒有連結虛擬錢包，也不想鑄造(mint)
          NFT，輸入完愛的訊息後，會拿到大眾版本的 LOVE
          Message，可以分享至社群媒體，或是直接傳給那個他/她，讓大家知道你說了什麼喔！
        </p>
        <br />
        <p>
          若想要參與 ELLE Love Impact NFT
          的「互動」機制，取得這份「專屬又特別」的愛的憑證，就需要開通虛擬錢包、轉入得以支付
          Gas Fee 的以太幣，以利於鑄造獨一無二的 ELLE Love Impact NFT 喔～
        </p>
        <br />
        <p>
          - 如何使用虛擬錢包轉帳和交易？ {'>>'} 連結至{' '}
          <a href="https://reurl.cc/NRaZ0Q" target="_blank" rel="noreferrer">
            https://reurl.cc/NRaZ0Q
          </a>
        </p>
        <p>
          - 轉帳常見問題？ {'>>'} 連結至{' '}
          <a href="https://reurl.cc/8pl2p4" target="_blank" rel="noreferrer">
            https://reurl.cc/8pl2p4
          </a>
        </p>
      </>
    ),
  },
  {
    question: '為什麼我選擇以 0 元鑄造，還需要支付 Gas Fee？',
    answer: (
      <p>
        鑄造(mint) NFT 的過程，需由 NFT 持有者負擔簽署智能合約交易產生的 Gas
        Fee。Gas Fee 類似於「交易轉帳手續費」的概念。連結加密貨幣錢包並確認鑄造
        NFT 後，即完成 Love Impact NFT
        的鑄造，一旦完成將不能取消喔，請謹慎決定。
      </p>
    ),
  },
  {
    question: 'Gas Fee 是什麼？多少錢是比較正常的？Gas Fee 過高怎麼辦？',
    answer: (
      <p>
        Gas Fee 類似於「交易轉帳手續費」的概念，鑄造(mint) NFT 的過程中，需由
        NFT 持有者負擔簽署智能合約交易產生的費用。一般來說，台幣 1,000 以內的
        Gas Fee 是比較合理正常，如果你在鑄造時發現 Gas Fee
        飆高的狀況，有可能是當下鑄造 NFT 的人比較多 ，建議你稍待一下，通常 Gas
        Fee 在供需平衡時的價格就會降下來囉～
      </p>
    ),
  },
  {
    question: '我該如何知道對方已經開啟我送他/她的 Love Impact NFT？',
    answer: (
      <>
        <p>
          一旦對方開啟了你送他/她的 Love Impact NFT，NFT
          圖像就會改變並顯示「示愛」的內容囉！
        </p>
        <p>*[小秘訣] 點擊 &quot;Refresh metadata&quot; 按鈕，可以更新資訊喔</p>
      </>
    ),
  },
  {
    question: '如果對方沒有開啟 Love Impact NFT 怎麼辦？',
    answer: (
      <>
        <p>如果對方沒有開啟 Love Impact NFT，</p>
        <p>
          - 活動期間內：你可以選擇自己用 E-mail
          內的連結與專屬密碼開啟這個專屬於自己的 Love Impact NFT
        </p>
        <p>- 活動截止後：NFT 圖像將會顯示成新的圖像，成為一張永恆的紀念</p>
      </>
    ),
  },
  {
    question: '我該如何拿到「限定版」的 ELLE Love Impact NFT？',
    answer: (
      <p>
        限定版」的 ELLE Love Impact NFT 只有限量 300
        張，需要透過點擊藝人/網紅於社群平台上分享的特定連結，填寫「愛的白名單」問券，就有機會空投取得囉～
      </p>
    ),
  },
  {
    question: '我該如何取得本次活動的「抽獎券」呢？',
    answer: (
      <>
        <p>
          只要鑄造(mint) 一張 ELLE Love Impact NFT，取得獨一無二 Impact NFT
          的同時，你也會於虛擬錢包中一併獲得一張本次活動的「抽獎券」NFT！Mint
          越多愛，中獎機率越高～ 預祝你抽中 ELLE
          特別準備的大禮喔～（待補大禮內容）
        </p>
        <p>
          *中獎名單將於抽獎後統一公布於活動網站，中獎者需於指定期間內完成回填完整中獎所需資料，逾期未領獎者視為放棄中獎資格。
        </p>
      </>
    ),
  },
  {
    question: '我該如何進入「愛的白名單」，搶先取得參與活動的資格呢？',
    answer: (
      <p>
        活動期間，可以透過點擊合作藝人/網紅於社群平台上分享的特定連結，填寫「愛的白名單」問券，就有機會進入「愛的白名單」，搶先取得空投「限定版」的
        ELLE Love Impact NFT，比別人優先參與本次的活動喔！
      </p>
    ),
  },
]

const FaqPage: NextPage = () => {
  return (
    <MintLayout>
      <div className="pt-10 mb-10 md:mb-16 flex flex-col items-center">
        <BigQuestionIcon />
      </div>
      <dl className="pr-4 max-w-[968px] mx-auto">
        {faqs.map((faq) => (
          <Disclosure as="div" key={faq.question} className="!mt-0">
            {({ open }) => (
              <>
                <dt className="py-3">
                  <Disclosure.Button className="text-left w-full flex justify-between text-lemon">
                    <div className="flex items-center">
                      <div className="bg-lemon h-4 w-4 mt-1 mr-4" />
                      <p className="font-noto font-bold text-white text-xl md:text-2xl leading-120%">
                        {faq.question}
                      </p>
                    </div>
                    <div className="ml-6 h-7 lg:ml-12 flex items-center">
                      {open ? <ClosePinkIcon /> : <CaretDownPinkIcon />}
                    </div>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel
                  as="dd"
                  className="pt-2 pb-6 pl-8 font-noto text-lemon text-base md:text-lg leading-150%"
                >
                  {faq.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </MintLayout>
  )
}

export default FaqPage
