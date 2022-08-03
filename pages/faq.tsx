import type { NextPage } from 'next'
import {
  MintNavigation,
  BigQuestionIcon,
  ClosePinkIcon,
  CaretDownPinkIcon,
} from 'components'
import { Disclosure } from '@headlessui/react'

const faqs = [
  {
    question: '我一定要有虛擬錢包和乙太幣，才能鑄造一個秘密NFT嗎？',
    answer: 'Yes.',
  },
  {
    question: '我可以自留 ELLE Love Impact NFT，不傳給對方嗎？',
    answer: 'Yes.',
  },
  {
    question: '為什麼我選擇以 0 元鑄造，還需要支付 Gas Fee？',
    answer: 'Yes.',
  },
]

const FaqPage: NextPage = () => {
  return (
    <>
      <MintNavigation />
      <div className="bg-black min-h-screen pt-navbar-height flex flex-col items-center">
        <div className="pt-10 mb-10">
          <BigQuestionIcon />
        </div>
        <dl className="pr-4">
          {faqs.map((faq) => (
            <Disclosure as="div" key={faq.question} className="!mt-0">
              {({ open }) => (
                <>
                  <dt className="py-3">
                    <Disclosure.Button className="text-left w-full flex justify-between text-lemon">
                      <div className="flex">
                        <div className="bg-lemon h-4 w-4 mt-1 mr-4" />
                        <p className="font-noto text-white text-xl leading-[120%]">
                          {faq.question}
                        </p>
                      </div>
                      <div className="ml-6 h-7 lg:ml-12 flex items-center">
                        {open ? <ClosePinkIcon /> : <CaretDownPinkIcon />}
                      </div>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="pt-2 pb-6 pl-8">
                    <p className="font-noto text-lemon text-base leading-[140%]">
                      {faq.answer}
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </>
  )
}

export default FaqPage
