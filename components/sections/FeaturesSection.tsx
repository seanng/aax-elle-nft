import { BLCursorButton } from 'components'
import Image from 'next/image'

export function FeaturesSection() {
  return (
    <div className="section bg-black w-full">
      <div className="w-full flex flex-col items-center px-8 py-20 lg:py-24">
        <div className="w-[365px] h-[299px] md:w-[730px] md:h-[598px] lg:w-[914px] lg:h-[749px] relative">
          <Image src="/spca.png" layout="fill" alt="SPCA" objectFit="contain" />
        </div>
        <div className="mt-7 lg:mt-20 text-white text-center max-w-[819px]">
          <h2 className="text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6 lg:mb-7 font-black">
            我們一樣有幸福的權利
          </h2>
          <p className="text-base md:text-xl lg:text-3xl font-light mb-8 md:mb-12 lg:mb-14">
            TSPCA目標是替所有的動物發聲，爭取福利，及提供動物必要的協助，成為有效率、公開透明，可信任的動物福利組織。
            協會努力將符合國際標準的動物福利帶入台灣，
            來自於不同領域的理監事成員、專業工作人員， 及愛心志工與支持者。
          </p>
          <BLCursorButton>認識SPCA</BLCursorButton>
        </div>
        <div className="w-[350px] h-[274px] md:w-[700px] md:h-[548px] lg:w-[1058px] lg:h-[827px] mt-20 md:mt-28 lg:mt-44 relative">
          <Image
            src="/elleverse.png"
            layout="fill"
            alt="Elleverse"
            objectFit="contain"
          />
        </div>
        <div className="mt-7 lg:mt-20 text-white text-center max-w-[819px]">
          <h2 className="text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6 lg:mb-7 font-black">
            ELLEVERSE 風格飛向元宇宙
          </h2>
          <p className="text-base md:text-xl lg:text-3xl font-light mb-8 md:mb-12 lg:mb-14">
            ELLE+Metaverse=ELLEverse。元宇宙發生中，時代像一艘往無垠宇宙噴飛的火箭，疾速奔馳而我們必須搭上；所謂的未來時空，已經失去距離、更非幻想，唯有抓住當下的機會才能抵達。在ELLE創造的元宇宙ELLEverse中，從講座、創作競賽、慈善Impact
            NFT、到虛擬角色養成的酷點地圖，囊括一系列虛擬世界大冒險無限擴充，請和ELLE用最具風格的方式踏入Web3.0。Remember,
            It&apos;s all about style。
          </p>
          <BLCursorButton>ELLEverse</BLCursorButton>
        </div>
      </div>
    </div>
  )
}
