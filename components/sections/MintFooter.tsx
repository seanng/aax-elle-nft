import { FBIcon, IGIcon, YTIcon } from 'components'
import Image from 'next/image'

export function MintFooter() {
  return (
    <div className="bg-black flex flex-col items-center p-4 md:px-20 md:py-10">
      <div className="flex items-center mb-4 md:mb-10 space-x-4">
        <a target="_blank" href="https://www.accucrazy.com" rel="noreferrer">
          <Image
            priority
            src="/logos/accucrazy.svg"
            alt="Accucrazy"
            height={12}
            width={101}
          />
        </a>
        <a target="_blank" href="http://crzy.io" rel="noreferrer">
          <Image
            priority
            src="/logos/crzy.svg"
            alt="CRZY"
            height={12}
            width={55}
          />
        </a>
        <a target="_blank" href="https://www.elle.com/tw/" rel="noreferrer">
          <Image
            priority
            src="/logos/elle-white.svg"
            alt="ELLE"
            height={21}
            width={54}
          />
        </a>
        <a target="_blank" href="https://www.hearst.com.tw" rel="noreferrer">
          <Image
            priority
            src="/logos/hearst.png"
            alt="Hearst"
            height={26}
            width={83}
          />
        </a>
        {/* <a target="_blank" href="https://www.aax.com" rel="noreferrer">
          <Image
            priority
            src="/logos/aax.svg"
            alt="AAX"
            height={37}
            width={80}
          />
        </a> */}
        <a target="_blank" href="https://pointof.co" rel="noreferrer">
          <Image
            priority
            src="/logos/point-of.svg"
            alt="Point Of"
            height={37}
            width={80}
          />
        </a>
      </div>
      <div className="font-mono text-center text-xs md:text-base leading-120%">
        <p className="text-dark-gray mb-8">
          ©2022 Hearst Magazine Taiwan 台灣赫斯特媒體股份有限公司
        </p>
        <div className="flex md:space-x-1 items-center justify-center mb-6">
          <a
            href="https://www.facebook.com/elle.tw"
            target="_blank"
            rel="noreferrer"
          >
            <FBIcon className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/elletaiwan/"
            target="_blank"
            rel="noreferrer"
          >
            <IGIcon className="h-6 w-6" />
          </a>
          <a
            href="https://www.youtube.com/user/elletw123"
            target="_blank"
            rel="noreferrer"
          >
            <YTIcon className="h-6 w-6 ml-2" />
          </a>
        </div>
        <p className="text-white mb-4">Powered by AAX</p>
      </div>
    </div>
  )
}
