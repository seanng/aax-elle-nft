import {
  MintHeroDesktop,
  MintHeroMobile,
  MintLayout,
  FlipCardsSection,
  HowToSection,
  OutlinedHeading,
  BlingIcon,
  Marquee,
  TinyPinkCat,
  TinyPinkSmiley,
  TinyPinkThumb,
  HowToHeartIcon,
  PrimaryButton,
} from 'components'
import { salePhase } from 'utils/config'
import type { NextPage } from 'next'
import { NOT_STARTED, PRIVATE_SALE } from 'shared/constants'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// @ts-ignore
const Carousel = dynamic(() => import('react-spring-3d-carousel'), {
  ssr: false,
})

const carouselItems = [
  {
    src: '/images/carousel-1.png',
    kolName: 'Mr Beast',
  },
  {
    src: '/images/carousel-2.png',
    kolName: '蔡依林',
  },
  {
    src: '/images/carousel-3.png',
    kolName: '周杰倫',
  },
  {
    src: '/images/carousel-4.png',
    kolName: '周星馳',
  },
  {
    src: '/images/carousel-5.png',
    kolName: 'Rihanna',
  },
  {
    src: '/images/carousel-6.png',
    kolName: '蔡英文',
  },
  {
    src: '/images/carousel-7.png',
    kolName: '張學友',
  },
  {
    src: '/images/carousel-8.png',
    kolName: '梁朝偉',
  },
  {
    src: '/images/carousel-9.png',
    kolName: 'Your mother',
  },
]

const LandingPage: NextPage = () => {
  const [goToSlide, setGoToSlide] = useState(0)

  const slides = carouselItems
    .map(({ src, kolName }) => ({
      content: <CarouselItem src={src} kolName={kolName} />,
    }))
    .map((slide, index) => {
      return { ...slide, key: index, onClick: () => setGoToSlide(index) }
    })

  // Autoplay Slides.
  const AUTOPLAY_TIMER = 3000
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timeout = window.setTimeout(
        () => setGoToSlide(goToSlide < slides.length - 1 ? goToSlide + 1 : 0),
        AUTOPLAY_TIMER
      )
      return () => window.clearTimeout(timeout)
    }
  }, [goToSlide])

  return (
    <MintLayout className="relative flex flex-col items-center overflow-hidden w-full pb-14 md:pb-52">
      <div className="bg-guava py-2 w-full mb-8 md:mb-12">
        <Marquee velocity={100}>
          <span className="font-mono font-medium text-xl text-black">
            Impact NFT 限量預發10天，預售階段將在12/10截止!&nbsp;&nbsp;&nbsp;
            Impact NFT 限量預發10天，預售階段將在12/10截止!&nbsp;&nbsp;&nbsp;
            Impact NFT 限量預發10天，預售階段將在12/10截止!&nbsp;&nbsp;&nbsp;
          </span>
        </Marquee>
      </div>

      <OutlinedHeading
        color="#55F263"
        fontSizeClass="text-5xl md:text-6xl font-mono italic leading-120% text-center w-72 md:w-full mb-8 md:mb-16"
      >
        ELLEverse Impact NFT
      </OutlinedHeading>

      <MintHeroMobile className="md:hidden mb-14" />
      <MintHeroDesktop className="hidden md:block mb-14 max-h-[700px]" />
      <Link href="/mint">
        <a>
          <PrimaryButton>我要告白</PrimaryButton>
        </a>
      </Link>
      {/* <CaretDownButton className="my-6 md:mt-12 md:mb-14" /> */}
      {/* Desktop Carousel */}
      <div className="h-[500px] w-[600px] mx-auto my-0 hidden md:block">
        <Carousel
          showNavigation={false}
          slides={slides}
          goToSlide={goToSlide}
          offsetRadius={3}
          animationConfig={{}}
        />
      </div>
      {/* Mobile Carousel */}
      <div className="md:hidden w-full my-10" id="landing-carousel-mobile">
        <Swiper
          modules={[Pagination, Autoplay]}
          grabCursor
          loop
          slidesPerView={'auto'}
          pagination={{
            el: '.my-custom-pagination-div',
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {carouselItems.map((props, i) => (
            <SwiperSlide key={i}>
              <CarouselItem {...props} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="my-custom-pagination-div mt-8 ml-4" />
      </div>
      <OutlinedHeading
        fontSizeClass="text-[22px] md:text-5xl"
        className="mb-4 md:mb-7"
      >
        你是不是也有以下症狀?
      </OutlinedHeading>
      <p className="text-lg md:text-2xl font-noto text-center mb-10 md:mb-16 md:leading-[36px]">
        好想說出<mark className="bg-lime">喜歡你</mark>
        <br />
        有個<mark className="bg-lime">秘密</mark>藏在心裡好久了{' '}
        到了嘴邊總說不出口
        <br />
        雖然分隔兩地 那些曾經有好多<mark className="bg-lime">回憶</mark>
        <br />
        好想寫點東西給<mark className="bg-lime">未來</mark>的自己
      </p>

      {/* YOUTUBE VIDEO */}
      <div className="mb-20 md:mb-28 max-w-full w-[500px] h-[282px] md:w-[750px] md:h-[422px]">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/LJ-uCAu6acE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="flex items-center md:mb-4">
        <BlingIcon />
        <OutlinedHeading color="#FF66FF" className="mx-2 md:mx-4">
          歡迎光臨
        </OutlinedHeading>
        <BlingIcon />
      </div>
      <OutlinedHeading color="#FF66FF" className="mx-2 md:mx-4 mb-10 md:mb-20">
        鑄造愛的秘密工坊
      </OutlinedHeading>

      <FlipCardsSection className="mb-navbar-height" />
      {[NOT_STARTED, PRIVATE_SALE].includes(salePhase) && (
        <>
          <div className="hidden md:flex space-x-8 mb-8">
            <HowToHeartIcon width={50} height={50} />
            <TinyPinkSmiley width={50} height={50} />
            <TinyPinkThumb width={50} height={50} />
            <TinyPinkCat width={50} height={50} />
          </div>
          <div className="flex md:hidden space-x-8 mb-4">
            <HowToHeartIcon width={24} height={24} />
            <TinyPinkSmiley />
            <TinyPinkThumb />
            <TinyPinkCat />
          </div>
          <OutlinedHeading
            color="#FF66FF"
            className="mb-4 text-center tracking-widest leading-150% md:leading-150% font-bold"
          >
            想與喜愛的名人共同擁有
            <br />
            最特別的數位紀念品嗎？
          </OutlinedHeading>
          <p className="mt-4 md:mt-10 text-white md:text-2xl text-center tracking-wider leading-150% md:leading-150% font-noto">
            名人的一句話是特別框
            <br />
            他的回信將被鑄造為
            <br />
            Special Impact NFT
            <br />
            永存對彼此的愛
          </p>
        </>
      )}
      <div className="pb-4 mb-navbar-height" id="how-to" />
      <HowToSection />
      <Link href="/mint">
        <a>
          <PrimaryButton>我要告白</PrimaryButton>
        </a>
      </Link>
      {[PRIVATE_SALE, NOT_STARTED].includes(salePhase) && (
        <div className="fixed bottom-4 right-4 flex flex-col items-center z-10">
          <a href="#how-to">
            <Image
              width="105"
              height="123"
              src="/images/private-sale-sticky2.png"
            />
          </a>
        </div>
      )}
    </MintLayout>
  )
}

const CarouselItem = ({ src, kolName = '' }) => (
  <div className="flex flex-col items-center">
    <div className="h-4 w-mobile-modal-top bg-white" />
    <div className="bg-white w-mobile-modal-body text-center border border-white">
      <Image width={300} height={300} src={src} />
      <p className="text-black font-cubic mt-2 text-2xl">{''}</p>
    </div>
    <div className="h-4 w-mobile-modal-top bg-white" />
  </div>
)

export default LandingPage
