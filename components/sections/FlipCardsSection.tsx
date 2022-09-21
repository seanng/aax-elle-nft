import { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import dynamic from 'next/dynamic'
import { classNames } from 'utils/helpers'

const FlipCard1 = dynamic(() => import('components').then((m) => m.FlipCard1))
const FlipCard2 = dynamic(() => import('components').then((m) => m.FlipCard2))
const FlipCard3 = dynamic(() => import('components').then((m) => m.FlipCard3))
const FlipCard4 = dynamic(() => import('components').then((m) => m.FlipCard4))
const FlipCard5 = dynamic(() => import('components').then((m) => m.FlipCard5))

const withClass = (custom = '') => classNames('absolute w-full', custom)

const data = [
  {
    Svg: FlipCard1,
    front: (
      <div className={withClass('text-lime top-20')}>什麼是Impact NFT？</div>
    ),
    back: (
      <div className={withClass('text-black top-20 px-8')}>
        非營利、連結公益慈善的NFT
      </div>
    ),
  },
  {
    Svg: FlipCard2,
    front: (
      <div className={withClass('text-guava top-16 px-7')}>
        ELLE的Impact NFT有什麼特別？
      </div>
    ),
    back: (
      <div className={withClass('text-black top-14 px-7')}>
        每個NFT都是自己設計、獨一無二 首創互動式NFT 愛的告白永遠保存
      </div>
    ),
  },
  {
    Svg: FlipCard3,
    front: (
      <div className={withClass('text-lemon top-20 px-10')}>
        為什麼愛的告白可以永恆？
      </div>
    ),
    back: (
      <div className={withClass('text-black top-20 px-8')}>
        透過NFT上鏈後，愛可以永恆於區塊鏈上
      </div>
    ),
  },
  {
    Svg: FlipCard4,
    front: (
      <div className={withClass('text-mandarin top-16')}>大家都能擁有嗎？</div>
    ),
    back: (
      <div className={withClass('text-black top-12 px-7 ')}>
        ELLE Impact NFT限量3,113個 (3113倒過來就是ELLE喔)
      </div>
    ),
  },
  {
    Svg: FlipCard5,
    front: (
      <div className={withClass('text-steel top-28')}>什麼是互動式NFT?</div>
    ),
    back: (
      <div className={withClass('text-black top-24 px-8')}>
        寄件者寫完愛的告白後，需要寄給某人+密碼才能打開
      </div>
    ),
  },
]

export function FlipCardsSection({ className = '', ...props }) {
  const [isFlipped, setIsFlipped] = useState(Array(5).fill(false))
  const handleFlip = (idx) => {
    const flipped = isFlipped.slice()
    flipped[idx] = !flipped[idx]
    setIsFlipped(flipped)
  }

  return (
    <div
      className={classNames(
        className,
        'mt-20 flex flex-col items-start w-[360px]'
      )}
      {...props}
    >
      {data.map((props, i) => (
        <FlipCard
          isFlipped={isFlipped[i]}
          key={i}
          onClick={() => handleFlip(i)}
          className={`-mt-20 self-${i % 2 === 0 ? 'start' : 'end'}`}
          {...props}
        />
      ))}
    </div>
  )
}

const FlipCard = ({ isFlipped, onClick, Svg, front, back, ...props }) => {
  return (
    <div {...props}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <button className="relative" onClick={onClick}>
          <Svg />
          {front}
        </button>
        <button className="relative" onClick={onClick}>
          <Svg isBack />
          {back}
        </button>
      </ReactCardFlip>
    </div>
  )
}
