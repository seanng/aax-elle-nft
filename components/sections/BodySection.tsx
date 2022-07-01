import {
  BLCursorButton,
  GreenDialog,
  PoopSmall,
  PinkSunflower,
} from 'components'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import { PlusIcon, MinusIcon } from '@heroicons/react/outline'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper'

const faqs = [
  {
    question: '我一定要有虛擬錢包和乙太幣，才能鑄造一個秘密NFT嗎？',
    answer: 'The answer is love.',
  },
  {
    question: 'What is the answer? 2',
    answer: 'The answer is love.',
  },
  {
    question: 'What is the answer? 3',
    answer: 'The answer is love.',
  },
  {
    question: 'What is the answer? 4',
    answer: 'The answer is love.',
  },
  {
    question: 'What is the answer? 5',
    answer: 'The answer is love.',
  },
]

const teamMembers = [
  {
    title: 'ELLEverse Producer',
    name: 'ELLEverse Producer',
    site: 'www.elle.com/tw',
    src: '/images/LipsElle.png',
  },
  {
    title: 'Tech Partner',
    name: 'AAX Limited',
    site: 'www.aax.com',
    src: '/images/LipsAax.png',
  },
  {
    title: 'Strategic Planner',
    name: 'CRZY.io 肖準行銷',
    site: 'http://crzy.io/',
    src: '/images/LipsCrzy.png',
  },
  {
    title: 'Visual Partner',
    name: '白晝有限公司 Baizhou.tw',
    site: 'IG@baizhou.tw',
    src: '/images/LipsBaizhou.png',
  },
  {
    title: 'Visual Partner',
    name: 'Point of',
    site: 'www.pointof.co',
    src: '/images/LipsPointof.png',
  },
]

export function BodySection() {
  return (
    <div className="section bg-black w-full overflow-x-clip">
      {/* Features */}
      <div className="w-full flex flex-col items-center px-8 py-20 lg:py-24">
        <div className="w-[365px] h-[299px] md:w-[730px] md:h-[598px] lg:w-[914px] lg:h-[749px] relative">
          <Image
            src="/images/spca.png"
            layout="fill"
            alt="SPCA"
            objectFit="contain"
          />
        </div>
        <Feature
          heading="我們一樣有幸福的權利"
          body="TSPCA目標是替所有的動物發聲，爭取福利，及提供動物必要的協助，成為有效率、公開透明，可信任的動物福利組織。
            協會努力將符合國際標準的動物福利帶入台灣，
            來自於不同領域的理監事成員、專業工作人員， 及愛心志工與支持者。"
          button={<BLCursorButton>認識SPCA</BLCursorButton>}
        />
        <div className="w-[350px] h-[274px] md:w-[700px] md:h-[548px] lg:w-[1058px] lg:h-[827px] mt-20 md:mt-28 lg:mt-44 relative">
          <Image
            src="/images/elleverse.png"
            layout="fill"
            alt="Elleverse"
            objectFit="contain"
          />
        </div>
        <Feature
          heading="ELLEVERSE 風格飛向元宇宙"
          body="ELLE+Metaverse=ELLEverse。元宇宙發生中，時代像一艘往無垠宇宙噴飛的火箭，疾速奔馳而我們必須搭上；所謂的未來時空，已經失去距離、更非幻想，唯有抓住當下的機會才能抵達。在ELLE創造的元宇宙ELLEverse中，從講座、創作競賽、慈善Impact
            NFT、到虛擬角色養成的酷點地圖，囊括一系列虛擬世界大冒險無限擴充，請和ELLE用最具風格的方式踏入Web3.0。Remember,
            It's all about style。"
          button={<BLCursorButton>ELLEverse</BLCursorButton>}
        />
      </div>
      {/* Team */}
      <div className="lg:px-28 mb-10 md:mb-36">
        {/* Heading */}
        <div className="relative flex justify-between items-center my-12 md:my-28 lg:my-40 px-8 md:px-20">
          <div className="w-full h-[2px] md:h-1 bg-lime" />
          <div className="text-white px-3 md:px-6 font-english font-black text-2xl md:text-5xl lg:text-7xl">
            TEAM
          </div>
          <div className="w-full h-[2px] md:h-1 bg-lime" />
          <GreenDialog className="absolute -top-[125%] left-[56%] md:left-[62%] w-[35px] h-[21px] md:w-[111px] md:h-[65px]" />
        </div>
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView={3}
            // coverflowEffect={{
            //   rotate: 50,
            //   stretch: 0,
            //   depth: 100,
            //   modifier: 1,
            //   slideShadows: true,
            // }}
            modules={[EffectCoverflow]}
          >
            {teamMembers.map((item) => (
              <SwiperSlide key={item.name}>
                <TeamMember
                  src={item.src}
                  name={item.name}
                  title={item.title}
                  site={item.site}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Desktop Grid */}
        <div className="hidden md:block text-center px-20">
          <div className="flex flex-wrap justify-center">
            {teamMembers.map((item) => (
              <div key={item.name} className="w-[33%]">
                <TeamMember
                  src={item.src}
                  name={item.name}
                  title={item.title}
                  site={item.site}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Marquee */}
      <div className="mb-14 md:mb-48 font-english w-[120%] -ml-[10%] -rotate-3 font-extrabold text-4xl md:text-[168px] leading-[48px] md:leading-[224px]">
        <div className="relative bg-lime h-12 md:h-56">
          <p className="marquee scroll-left">
            <span>
              SHHHH.......&nbsp;&nbsp;&nbsp;SHHHH.......&nbsp;&nbsp;&nbsp;SHHHH.......&nbsp;&nbsp;&nbsp;
            </span>
          </p>
          <p className="marquee scroll-left marquee-delayed">
            <span>
              SHHHH.......&nbsp;&nbsp;&nbsp;SHHHH.......&nbsp;&nbsp;&nbsp;SHHHH.......&nbsp;&nbsp;&nbsp;
            </span>
          </p>
        </div>
        <div className="relative bg-[#EDFA00] h-12 md:h-56">
          <p className="marquee scroll-right">
            <span>TELL YOU A SECRET ____ TELL YOU A SECRET ____</span>
          </p>
          <p className="marquee scroll-right marquee-delayed">
            <span>TELL YOU A SECRET ____ TELL YOU A SECRET ____</span>
          </p>
        </div>
      </div>
      {/* FAQ */}
      <div className="relative pb-14 md:pb-48">
        <div className="px-8 md:px-20 lg:px-28 mb-10 md:mb-36">
          {/* Heading */}
          <div className="relative text-white text-center px-3 md:px-6 font-english font-black text-2xl md:text-5xl lg:text-7xl">
            <span>FAQ</span>
            <GreenDialog className="absolute -top-[110%] left-[56%] md:left-[62%] w-[35px] h-[21px] md:w-[111px] md:h-[65px]" />
          </div>

          {/* Content */}
          <div className="relative z-10 bg-black-rgba">
            <dl className="mt-4 md:mt-24 lg:mt-32 space-y-2 md:space-y-6 divide-y-2 md:divide-y-4 divide-[#C3FA08] border-y-2 md:border-y-4 border-[#C3FA08] pb-2 md:pb-6">
              {faqs.map((faq) => (
                <Disclosure
                  as="div"
                  key={faq.question}
                  className="pt-2 md:pt-6"
                >
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="text-left w-full flex justify-between items-center text-[#C3FA08]">
                          <span className="font-bold text-white text-xs md:text-3xl lg:text-5xl lg:leading-[165%]">
                            {faq.question}
                          </span>
                          <span className="ml-6 h-7 lg:ml-12 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-6 w-6 md:h-12 md:w-12 lg:h-16 lg:w-16"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-6 w-6 md:h-12 md:w-12 lg:h-16 lg:w-16"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel
                        as="dd"
                        className="my-2 md:my-6 lg:my-8 pr-12"
                      >
                        <p className="font-extralight text-gray-100 text-xs md:text-3xl lg:text-5xl">
                          {faq.answer}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
        <PoopSmall className="absolute z-0 top-[255px] md:top-[600px] lg:top-[715px] left-[5%] w-[125px] h-[121px] md:w-[375px] md:h-[363px] lg:w-[568px] lg:h-[579px]" />
        <PinkSunflower className="absolute z-0 top-[115px] md:top-[200px] lg:top-[250px] right-[5%] w-[123px] h-[302px] md:w-[369px] md:h-[906px] lg:w-[493px] lg:h-[1206px]" />
      </div>
      {/* Footer */}
      <div className="h-10 md:h-44 py-2 md:py-11 bg-lime flex items-center justify-center">
        <div className="relative h-full w-full">
          <Image
            src="/logos/elle-black.svg"
            alt="ELLE"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  )
}

function Feature({ heading, body, button }) {
  return (
    <div className="mt-7 lg:mt-20 text-white text-center max-w-[819px]">
      <h2 className="text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6 lg:mb-7 font-black">
        {heading}
      </h2>
      <p className="text-base md:text-xl lg:text-3xl font-light mb-8 md:mb-12 lg:mb-14 md:leading-[30px] lg:leading-[45px]">
        {body}
      </p>
      {button}
    </div>
  )
}

function TeamMember({ src, name, title, site }) {
  return (
    <div className="font-english font-light text-white text-sm md:text-xl lg:text-3xl mx-2 md:px-4 md:mb-16 text-center">
      {/* <div className="max-w-[355px] w-[33%] min-w-[303px] font-english font-light text-white text-sm md:text-xl lg:text-3xl mx-3 md:mx-20"> */}
      <div className="relative h-[88px] md:h-[222px]">
        <Image src={src} layout="fill" alt={name} objectFit="contain" />
      </div>
      <h6 className="font-extrabold mt-3 md:mt-10 leading-5 md:leading-10">
        {name}
      </h6>
      <p>{title}</p>
      <p>{site}</p>
    </div>
  )
}