import { ReactNode, useEffect, useState } from 'react'
import {
  OutlinedHeading,
  LinkAndPasscode,
  MintLayout,
  SpinningOverlay,
  PrimaryButton,
  NotConnectedView,
  TokenInfoBox,
  SquareShareButton,
} from 'components'
import type { NextPage } from 'next'
import axios from 'lib/axios'
import { MessageToken, PrizeToken } from '@prisma/client'
import { useDetectionContext, useWeb3Context } from 'context'
import Link from 'next/link'
import { PRIVATE_SALE, SAFARI } from 'shared/constants'
import {
  contractAddress,
  metadata,
  openseaBaseUrl,
  s3BaseUrl,
  salePhase,
} from 'utils/config'
import { useRouter } from 'next/router'
import Image from 'next/image'

const LOADING = 'LOADING'
const NOT_CONNECTED = 'NOT_CONNECTED'
const NO_TOKENS = 'NO_TOKENS'
const HAS_TOKENS = 'HAS_TOKENS'

const CollectionPage: NextPage = () => {
  const [displayMode, setDisplayMode] = useState(LOADING)
  const [messageTokens, setMessageTokens] = useState<MessageToken[]>([])
  const [isFetchingPrizeTokens, setIsFetchingPrizeTokens] = useState(true)
  const [prizeTokens, setPrizeTokens] = useState<PrizeToken[]>([])
  const { address } = useWeb3Context()
  const { setIsProcessingCloseClick, isProcessingCloseClick } =
    useDetectionContext()
  const router = useRouter()

  useEffect(() => {
    if (isProcessingCloseClick) {
      setIsProcessingCloseClick(false)
      router.replace('/')
    }
  }, [isProcessingCloseClick])

  useEffect(() => {
    async function getTokensFromWallet() {
      setDisplayMode(LOADING)
      if (!address) {
        setDisplayMode(NOT_CONNECTED)
        return
      }

      // Get Message Tokens
      try {
        const {
          data: { data },
        } = (await axios.get(`/api/message-tokens?address=${address}`)) as {
          data: { data: MessageToken[] }
        }
        setMessageTokens(data)
        setDisplayMode(HAS_TOKENS)
      } catch (error) {
        console.log('error retrieving message-tokens: ', error)
        setDisplayMode(NO_TOKENS)
      }

      // Get WLT / PrizeTokens
      try {
        setIsFetchingPrizeTokens(true)
        const {
          data: { data },
        } = (await axios.get(`/api/prize-tokens?address=${address}`)) as {
          data: { data: PrizeToken[] }
        }
        setPrizeTokens(
          data.filter((t) =>
            salePhase === PRIVATE_SALE
              ? t.isPrivateSale
              : !t.isPrivateSale && !t.openedAt
          )
        )
        setIsFetchingPrizeTokens(false)
      } catch (error) {
        console.log('error retrieving prize-tokens', error)
        setIsFetchingPrizeTokens(false)
      }
    }
    getTokensFromWallet()
  }, [address])

  const tokenInfoBox = (
    <TokenInfoBox
      tokens={prizeTokens}
      isLoading={isFetchingPrizeTokens}
      showsPrizeTokens={salePhase !== PRIVATE_SALE}
    >
      <div className="text-center underline text-blue-600">
        {salePhase !== PRIVATE_SALE ? (
          <Link href="/lucky-draw">
            <a>前往 ELLE 抽獎頁</a>
          </Link>
        ) : (
          <Link href="/faq">
            <a>什麼是白名單NFT？</a>
          </Link>
        )}
      </div>
    </TokenInfoBox>
  )

  return (
    <>
      <MintLayout className="flex flex-col items-center font-noto">
        <OutlinedHeading className="pt-6 md:pt-12 mb-8">
          My Love Secrets
        </OutlinedHeading>
        {
          {
            [NO_TOKENS]: <NoTokensView {...{ tokenInfoBox }} />,
            [NOT_CONNECTED]: <NotConnectedView />,
            [HAS_TOKENS]: (
              <HasTokensView {...{ messageTokens, tokenInfoBox }} />
            ),
            [LOADING]: <SpinningOverlay />,
          }[displayMode ?? LOADING]
        }
      </MintLayout>
    </>
  )
}

const NoTokensView = ({ tokenInfoBox }: { tokenInfoBox: ReactNode }) => {
  return (
    <>
      {tokenInfoBox}
      <div className="pt-36 pb-6 md:pb-10">
        <svg
          width="121"
          height="120"
          viewBox="0 0 121 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M114.785 22.8583V17.1429H109.073V11.4274H103.358V5.71543H97.642V0H23.358V5.71543H17.6425V11.4274H11.927V17.1429H6.215V28.5703H0.499512V97.1417H6.215V102.857H11.927V108.573H17.6425V114.285H23.358V120H97.642V114.285H103.358V108.573H109.073V102.857H114.785V97.1417H120.501V28.5703H114.785V22.8583ZM109.073 34.2857V91.4297H103.358V97.1417H97.642V102.857H91.93V108.573H29.07V102.857H23.358V97.1417H17.6425V91.4297H11.927V28.5703H17.6425V22.8583H23.358V17.1429H29.07V11.4274H91.93V17.1429H97.642V22.8583H103.358V28.5703H109.073V34.2857Z"
            fill="#C4C4C4"
          />
          <path
            d="M91.9266 62.8561H86.2145H80.499V57.144H74.7836H69.0715H63.356H57.6406H51.9285H46.213H40.4976V62.8561H34.7855H29.07V68.5715H23.3546V74.2869V79.9989V85.7143V91.4298H29.07H34.7855V85.7143V79.9989V74.2869H40.4976V68.5715H46.213H51.9285H57.6406H63.356H69.0715H74.7836H80.499V74.2869H86.2145V79.9989V85.7143V91.4298H91.9266H97.642V85.7143V79.9989V74.2869V68.5715H91.9266V62.8561Z"
            fill="#C4C4C4"
          />
          <path
            d="M86.2145 45.7131H91.9266V40.0011V34.2856H86.2145H80.499H74.7836V40.0011V45.7131H80.499H86.2145Z"
            fill="#C4C4C4"
          />
          <path
            d="M40.4976 45.7131H46.213V40.0011V34.2856H40.4976H34.7855H29.07V40.0011V45.7131H34.7855H40.4976Z"
            fill="#C4C4C4"
          />
        </svg>
      </div>
      <p className="pb-12 md:pb-16 text-cement md:text-xl">
        你目前還沒有任何秘密告白
      </p>
      <Link href="/mint">
        <a>
          <PrimaryButton>我要告白</PrimaryButton>
        </a>
      </Link>
    </>
  )
}

const HasTokensView = ({
  tokenInfoBox,
  messageTokens,
}: {
  tokenInfoBox: ReactNode
  messageTokens: MessageToken[]
}) => {
  return (
    <>
      {tokenInfoBox}
      <div className="flex flex-col items-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-14 xl:gap-20 mt-10 md:mt-16">
        {messageTokens.map((t, i) => (
          <div key={t.id} className="pb-10">
            <iframe
              height={350}
              width={350}
              sandbox="allow-scripts"
              style={{ minHeight: 350 }}
              src={`${s3BaseUrl}/public/${t.tokenId}.html?abc`}
            />
            <div className="flex items-center justify-center my-6 space-x-6">
              <Link href={`/ig-share?id=${t?.tokenId}&seen`} passHref>
                <a className="leading-0" target="__blank">
                  <SquareShareButton />
                </a>
              </Link>
              <div className="flex items-center">
                <Image src="/logos/opensea.svg" height={24} width={24} />
                <a
                  href={`${openseaBaseUrl}/${contractAddress}/${t.tokenId}`}
                  target="__blank"
                  className="font-bold text-[#2081E2] underline ml-2 md:text-lg"
                >
                  前往 OpenSea
                </a>
              </div>
            </div>
            <div className="my-6">
              <LinkAndPasscode
                mobileOnly
                link={`${metadata.siteUrl}/open/${t.slug}`}
                passcode={t.passcode}
              />
            </div>

            {i < messageTokens.length - 1 && (
              <div className="flex flex-col items-center md:hidden mt-10">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.28619 29.7147H4.57101V34.2857H6.8572V36.5719H9.14339V38.8567H11.4282V41.1429H13.7144V43.429H16.0006V45.7138H18.2854V48H29.715V45.7138H31.9998V43.429H34.286V41.1429H36.5722V38.8567H38.857V36.5719H41.1432V34.2857H43.4294V29.7147H45.7142V27.4286H48.0004V6.85714H45.7142V4.57097H43.4294V2.28617H41.1432V0H29.715V2.28617H27.4288V4.57097H25.1426V9.14331H22.8578V4.57097H20.5716V2.28617H18.2854V0H6.8572V2.28617H4.57101V4.57097H2.28619V6.85714H0V27.4286H2.28619V29.7147ZM6.8572 25.1424V22.8576H4.57101V11.4281H6.8572V6.85714H9.14339V4.57097H16.0006V6.85714H18.2854V11.4281H20.5716V13.7143H27.4288V11.4281H29.715V6.85714H31.9998V4.57097H38.857V6.85714H41.1432V9.14331H43.4294V22.8576H41.1432V27.4286H38.857V31.9995H36.5722V34.2857H34.286V36.5719H31.9998V38.8567H29.715V41.1429H27.4288V43.429H20.5716V41.1429H18.2854V38.8567H16.0006V36.5719H13.7144V34.2857H11.4282V31.9995H9.14339V27.4286H6.8572V25.1424Z"
                    fill="#FF66FF"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-cement md:text-lg tracking-wide flex mb-16 px-8">
        <InfoIcon className="mt-1 flex-none" />
        <span className="ml-2">
          時間內NFT未被打開圖片將產生變化，如果對方不解開這份愛，也請好好愛自己
        </span>
      </div>
    </>
  )
}

const InfoIcon = ({ width = 16, height = 17, ...props }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 17"
    {...props}
  >
    <path fill="#9D9D9D" d="M6 13.5v-2h4v2z" />
    <path fill="#9D9D9D" d="M7 7.5h2v5H7z" />
    <path
      fill="#9D9D9D"
      d="M6 8.5v-2h3v2zM6.5 3.5h2v2h-2zM0 2.5h2v12H0zM14 2.5h2v12h-2zM2 .5h12v2H2zM2 14.5h12v2H2z"
    />
  </svg>
)

export default CollectionPage
