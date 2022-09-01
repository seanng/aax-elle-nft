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
    front: <div className={withClass('text-lime top-10')}>what is nft</div>,
    back: (
      <div className={withClass('text-black top-20')}>
        its the most wonderful nft in the world
      </div>
    ),
  },
  {
    Svg: FlipCard2,
    front: <div className={withClass('text-guava top-10')}>what is nft</div>,
    back: (
      <div className={withClass('text-black top-20')}>
        its the most wonderful nft in the world
      </div>
    ),
  },
  {
    Svg: FlipCard3,
    front: <div className={withClass('text-lemon top-10')}>what is nft</div>,
    back: (
      <div className={withClass('text-black top-20')}>
        its the most wonderful nft in the world
      </div>
    ),
  },
  {
    Svg: FlipCard4,
    front: <div className={withClass('text-mandarin top-10')}>what is nft</div>,
    back: (
      <div className={withClass('text-black top-20')}>
        its the most wonderful nft in the world
      </div>
    ),
  },
  {
    Svg: FlipCard5,
    front: <div className={withClass('text-steel top-10')}>what is nft</div>,
    back: (
      <div className={withClass('text-black top-20')}>
        its the most wonderful nft in the world
      </div>
    ),
  },
]

export function FlipCardsSection() {
  const [isFlipped, setIsFlipped] = useState(Array(5).fill(false))
  const handleFlip = (idx) => {
    const flipped = isFlipped.slice()
    flipped[idx] = !flipped[idx]
    setIsFlipped(flipped)
  }

  return (
    <div className="mt-20 flex flex-col items-start w-[360px]">
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
