import { FBIcon, IGIcon, YTIcon } from 'components'
import Image from 'next/image'
import Link from 'next/link'

export function MintFooter() {
  return (
    <div className="bg-black p-4 md:px-20 md:py-10">
      <div className="flex items-center space-x-4 md:space-x-10 mb-4 md:mb-10">
        <Link href="/">
          <a>
            <Image
              priority
              src="/logos/elle-white.png"
              alt="ELLE"
              height={24}
              width={64}
            />
          </a>
        </Link>
        <Link href="/">
          <a>
            <Image
              priority
              src="/logos/hearst.png"
              alt="ELLE"
              height={37}
              width={120}
            />
          </a>
        </Link>
        {/* socials. */}
        <div className="flex md:space-x-1">
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
      <p className="font-mono text-xs leading-120% text-dark-gray">
        A Part of Hearst Digital Media ELLE participates in various affiliate
        marketing programs, which means ELLE gets paid commissions on purchases
        made through our links to retailer sites.
        <br />
        <br />
        ©2022 Hearst Magazines Taiwan All Rights Reserved.
        <br />
        <br />
        任何未經本公司同意或授權，擅自抄襲、剽竊本公司報導、文章或照片，本公司為遏止抄襲歪風，維護創作秩序，一定會向法院提起民刑訴訟追究相關法律責任，絕不寬貸。
      </p>
    </div>
  )
}
