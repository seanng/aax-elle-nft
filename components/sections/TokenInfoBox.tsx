import { PrizeToken } from '@prisma/client'
import Image from 'next/image'
import { ReactNode } from 'react'

interface Props {
  isLoading?: boolean
  tokens: PrizeToken[]
  children?: ReactNode
  showsPrizeTokens?: boolean
}

export const TokenInfoBox = ({
  isLoading = false,
  tokens = [],
  children = null,
  showsPrizeTokens = false,
}: Props) => {
  const [imgSrc, tokenName] = showsPrizeTokens
    ? ['/images/prize-token.svg', '抽獎卷']
    : ['/images/whitelist-token.svg', '白名單 NFT']

  return (
    <div className="border-2 border-dashed border-lime px-12 py-4 md:py-6">
      <div className="flex items-center justify-center">
        <div className="md:hidden">
          <Image height={32} width={32} src={imgSrc} />
        </div>
        <div className="hidden md:block">
          <Image height={48} width={48} src={imgSrc} />
        </div>
        <div className="font-cubic text-lg md:text-2xl ml-2 md:ml-4">
          {isLoading
            ? `正在檢查${tokenName}......`
            : `你有 ${tokens.length} 張${tokenName}`}
        </div>
      </div>
      {children}
    </div>
  )
}
