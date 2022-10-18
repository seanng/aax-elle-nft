import { FBIcon, IGIcon, YTIcon } from 'components'
import Image from 'next/image'
import Link from 'next/link'

export function MintFooter() {
  return (
    <div className="bg-black flex flex-col items-center p-4 md:px-20 md:py-10">
      <div className="flex justify-between w-[344px] items-center mb-4 md:mb-10">
        <div>
          <a href="https://www.hearst.com.tw" className="mr-4">
            <Image
              priority
              src="/logos/hearst.png"
              alt="ELLE"
              height={37}
              width={120}
            />
          </a>
          <a href="https://www.aax.com">
            <Image
              priority
              src="/logos/aax.svg"
              alt="ELLE"
              height={37}
              width={80}
            />
          </a>
        </div>
        {/* socials. */}
        <div className="flex md:space-x-1 items-center">
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
      </div>
      <div className="font-mono text-center text-xs md:text-base leading-120%">
        <p className="text-dark-gray mb-8">
          ©2022 Hearst Magazine Taiwan 台灣赫斯特媒體股份有限公司
        </p>
        <p className="text-white mb-4">Powered by AAX</p>
      </div>
    </div>
  )
}
