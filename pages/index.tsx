import {
  MintHeroDesktop,
  MintHeroMobile,
  MintLayout,
  ResponsivePrimaryButton,
  FlipCardsSection,
  HowToSection,
  OutlinedHeading,
  BlingIcon,
  ButtonTooltip,
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
    src: '/test/artboard-88.jpg',
  },
  {
    src: '/test/artboard-88.jpg',
  },
  {
    src: '/test/artboard-88.jpg',
  },
  {
    src: '/test/artboard-88.jpg',
  },
  {
    src: '/test/artboard-88.jpg',
  },
  {
    src: '/test/artboard-88.jpg',
  },
  {
    src: '/test/artboard-88.jpg',
  },
  {
    src: '/test/artboard-88.jpg',
  },
  {
    src: '/test/artboard-88.jpg',
  },
]

const WelcomePage: NextPage = () => {
  const [goToSlide, setGoToSlide] = useState(0)

  const slides = carouselItems
    .map(({ src }) => ({ content: <DesktopCarouselItem src={src} /> }))
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
      <div className="font-mono font-medium text-xl text-center text-white bg-guava py-2 w-full">
        Limited time offer till 8/15
      </div>
      <div
        className="relative text-black font-mono font-medium italic text-6xl w-full leading-120% h-20 overflow-x-hidden"
        style={{
          textShadow:
            '-1px -1px 0 #C3FA08, 1px -1px 0 #C3FA08, -1px 1px 0 #C3FA08, 1px 1px 0 #C3FA08',
        }}
      >
        <p className="marquee scroll-left">
          <span>
            Welcome to ELLEverse&nbsp;&nbsp;&nbsp;Welcome to
            ELLEverse&nbsp;&nbsp;&nbsp;Welcome to
            ELLEverse&nbsp;&nbsp;&nbsp;Welcome to ELLEverse&nbsp;&nbsp;&nbsp;
          </span>
        </p>
        <p className="marquee scroll-left marquee-delayed">
          <span>
            Welcome to ELLEverse&nbsp;&nbsp;&nbsp;Welcome to
            ELLEverse&nbsp;&nbsp;&nbsp;Welcome to
            ELLEverse&nbsp;&nbsp;&nbsp;Welcome to ELLEverse&nbsp;&nbsp;&nbsp;
          </span>
        </p>
      </div>
      <MintHeroMobile className="md:hidden mb-14" />
      <MintHeroDesktop className="hidden md:block mb-14 max-h-[700px]" />
      <Link href="/mint">
        <a>
          <ResponsivePrimaryButton>我要告白</ResponsivePrimaryButton>
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
          {carouselItems.map(({ src }, i) => (
            <SwiperSlide key={i}>
              <MobileCarouselItem src={src} />
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
      <p className="text-lg md:text-2xl font-noto text-center mb-20 md:mb-32 md:leading-[36px]">
        好想說出<mark className="bg-lime">喜歡你</mark>
        <br />
        有個<mark className="bg-lime">秘密</mark>藏在心裡好久了{' '}
        到了嘴邊總說不出口
        <br />
        雖然分隔兩地 那些曾經有好多回憶<mark className="bg-lime">回憶</mark>
        <br />
        好想寫點東西給<mark className="bg-lime">未來</mark>的自己
      </p>
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

      <FlipCardsSection className="mb-16" />
      <div className="pb-4 mb-navbar-height" id="how-to" />
      <HowToSection />
      <Link href="/mint">
        <a>
          <ResponsivePrimaryButton>我要告白</ResponsivePrimaryButton>
        </a>
      </Link>
      {[PRIVATE_SALE, NOT_STARTED].includes(salePhase) && (
        <div className="fixed bottom-4 right-4 flex flex-col items-center z-10">
          <ButtonTooltip />
          <div className="absolute text-black top-3 text-sm font-noto">
            跟偶像告白?
          </div>
          <a href="#how-to">
            <Image
              width="80"
              height="80"
              src="/images/private-sale-sticky.png"
            />
          </a>
        </div>
      )}
    </MintLayout>
  )
}

const MobileCarouselItem = ({ src }) => (
  <div className="flex flex-col items-center">
    <div className="h-4 w-mobile-modal-top bg-white" />
    <div className="bg-white w-mobile-modal-body text-center">
      <Image width={300} height={300} src={src} />
    </div>
    <div className="h-4 w-mobile-modal-top bg-white" />
  </div>
)

const DesktopCarouselItem = ({ src }) => {
  return (
    <div>
      <img src={src} height="300" width="300" className="max-w-none" />
    </div>
  )
}

export default WelcomePage
