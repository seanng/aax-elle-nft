import {
  CaretDownButton,
  MintHeroDesktop,
  MintHeroMobile,
  MintLayout,
  ResponsivePrimaryButton,
  FlipCardsSection,
} from 'components'
import { saleStatus } from 'utils/config'
import { useWeb3Context } from 'context'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PRESALE, PUBLIC_SALE } from 'shared/constants'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import Image from 'next/image'
// import dynamic from 'next/dynamic'
// import { useState } from 'react'

// const Carousel = dynamic(() => import('react-spring-3d-carousel'), {
//   ssr: false,
// })

function getImageUrl(type, useDefault = undefined) {
  return 'https://s.conceptjs.com/tni/' + type + '.png'
}
const imageUrl = getImageUrl('WHITE')

const TniCard = () => {
  return (
    <div>
      <img src={imageUrl} height="300" width="300" />
    </div>
  )
}

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
]

const WelcomePage: NextPage = () => {
  // const [goToSlide, setGoToSlide] = useState(0)
  const { address, connect } = useWeb3Context()
  const router = useRouter()

  // const slides = [
  //   {
  //     key: 'a',
  //     content: <TniCard />,
  //   },
  //   {
  //     key: 'b',
  //     content: <TniCard />,
  //   },
  //   {
  //     key: 'c',
  //     content: <TniCard />,
  //   },
  //   {
  //     key: 'd',
  //     content: <TniCard />,
  //   },
  //   {
  //     key: 'e',
  //     content: <TniCard />,
  //   },
  //   {
  //     key: 'f',
  //     content: <TniCard />,
  //   },
  // ].map((slide, index) => {
  //   return { ...slide, onClick: () => setGoToSlide(index) }
  // })

  const handleCtaClick = async () => {
    if (saleStatus === PUBLIC_SALE) {
      router.push('/mint')
      return
    }
    if (saleStatus === PRESALE) {
      // Open connect wallet modal.
      let connected = true
      if (!address) connected = await connect()
      if (connected) {
        // Open loading modal to display Loading.
        // Check if address contains whitelist token
        // If address does not contain whitelist token, display Sorry modal.
        // If address contains whitelist token, continue to Mint (wizard.nextStep())
      }
    }
  }

  return (
    <MintLayout className="flex flex-col items-center overflow-hidden w-full">
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
      <CaretDownButton className="my-6" />
      {/* TODO: deleteme. */}
      {/* <div className="h-[500px] w-[40%] mx-auto my-0">
        <Carousel
          showNavigation
          slides={slides}
          goToSlide={goToSlide}
          offsetRadius={500}
        />
      </div> */}
      {/* Mobile Carousel */}
      <div className="md:hidden w-full mb-10" id="landing-carousel-mobile">
        <Swiper
          grabCursor
          loop
          slidesPerView={'auto'}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
        >
          {carouselItems.map(({ src }, i) => (
            <SwiperSlide key={i}>
              <CarouselItem src={src} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <FlipCardsSection />
    </MintLayout>
  )
}

const CarouselItem = ({ src }) => (
  <div className="flex flex-col items-center">
    <div className="h-4 w-mobile-modal-top bg-white" />
    <div className="bg-white w-mobile-modal-body text-center">
      <Image width={300} height={300} src={src} />
    </div>
    <div className="h-4 w-mobile-modal-top bg-white" />
  </div>
)

export default WelcomePage
