import { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import dynamic from 'next/dynamic'
import clsx from 'clsx'

const FlipCard1 = dynamic(() => import('components').then((m) => m.FlipCard1))
const FlipCard2 = dynamic(() => import('components').then((m) => m.FlipCard2))
const FlipCard3 = dynamic(() => import('components').then((m) => m.FlipCard3))
const FlipCard4 = dynamic(() => import('components').then((m) => m.FlipCard4))
const FlipCard5 = dynamic(() => import('components').then((m) => m.FlipCard5))

const withClass = (custom = '') =>
  clsx('absolute w-full md:text-[32px]', custom)

const data = [
  {
    Svg: FlipCard1,
    front: (
      <div className={withClass('text-lime top-20 md:top-40 font-bold')}>
        什麼是Impact NFT？
      </div>
    ),
    back: (
      <div className={withClass('text-black top-20 md:top-40 px-8')}>
        非營利、連結公益慈善的NFT
      </div>
    ),
  },
  {
    Svg: FlipCard2,
    front: (
      <div className={withClass('text-guava top-16 md:top-32 px-7 font-bold')}>
        ELLE的Impact NFT有什麼特別？
      </div>
    ),
    back: (
      <div className={withClass('text-black top-14 md:top-28 px-7 md:px-14')}>
        每個NFT都是自己設計、獨一無二 首創互動式NFT 愛的告白永遠保存
      </div>
    ),
  },
  {
    Svg: FlipCard3,
    front: (
      <div
        className={withClass(
          'text-lemon top-20 md:top-40 px-10 md:px-20 font-bold'
        )}
      >
        為什麼愛的告白可以永恆？
      </div>
    ),
    back: (
      <div className={withClass('text-black top-20 md:top-40 px-8 md:px-14')}>
        透過NFT上鏈後，愛可以永恆於區塊鏈上
      </div>
    ),
  },
  {
    Svg: FlipCard4,
    front: (
      <div className={withClass('text-mandarin top-16 md:top-32 font-bold')}>
        大家都能擁有嗎？
      </div>
    ),
    back: (
      <div className={withClass('text-black top-12 md:top-24 px-7 md:px-14')}>
        ELLE Impact NFT限量3,113個 (3113倒過來就是ELLE喔)
      </div>
    ),
  },
  {
    Svg: FlipCard5,
    front: (
      <div className={withClass('text-steel top-28 md:top-56 font-bold')}>
        什麼是互動式NFT?
      </div>
    ),
    back: (
      <div className={withClass('text-black top-24 md:top-48 px-8 md:px-16')}>
        寄件者寫完愛的告白後，需要寄給某人+密碼才能打開
      </div>
    ),
  },
]

export function FlipCardsSection({ className = '', ...props }) {
  return (
    <div
      className={clsx(
        className,
        'mt-20 flex flex-col items-start w-[360px] md:w-[670px]'
      )}
      {...props}
    >
      {data.map((props, i) => (
        <FlipCard
          key={i}
          className={`-mt-20 self-${i % 2 === 0 ? 'start' : 'end'}`}
          {...props}
        />
      ))}
    </div>
  )
}

const FlipCard = ({ Svg, front, back, ...props }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      {...props}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <button className="relative">
          <Svg className="block md:hidden" />
          <Svg className="hidden md:block" height={400} width={400} />
          {front}
        </button>
        <button className="relative">
          <Svg className="block md:hidden" isBack />
          <Svg className="hidden md:block" height={400} width={400} isBack />
          {back}
        </button>
      </ReactCardFlip>
    </div>
  )
}
