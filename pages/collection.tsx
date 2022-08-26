import { useEffect, useState } from 'react'
import {
  FormHeading,
  LinkAndPasscode,
  MintLayout,
  PinkGiftIcon,
  MobilePrimaryButton,
  SpinningOverlay,
  WarningIcon,
} from 'components'
import type { NextPage } from 'next'
import axios from 'lib/axios'
import { Mint } from '@prisma/client'
import { useWeb3Context } from 'context'
import Link from 'next/link'
import { S3_BASE_URL } from 'shared/constants'
import { metadata } from 'utils/config'

const LOADING = 'LOADING'
const NOT_CONNECTED = 'NOT_CONNECTED'
const NO_TOKENS = 'NO_TOKENS'
const HAS_TOKENS = 'HAS_TOKENS'

type MintWithHtml = Mint & { html: string }

const CollectionPage: NextPage = () => {
  const [displayMode, setDisplayMode] = useState(LOADING)
  const [data, setData] = useState<MintWithHtml[]>([])
  const { address, openConnectModal } = useWeb3Context()

  useEffect(() => {
    async function getTokensOfWallet() {
      setDisplayMode(LOADING)
      if (!address) {
        setDisplayMode(NOT_CONNECTED)
        return
      }
      try {
        const {
          data: { data },
        } = (await axios.get(`/api/collection?address=${address}`)) as {
          data: { data: MintWithHtml[] }
        }
        for (const token of data) {
          const { data: html } = await axios.get(
            `/public/${token.messageTokenId}.html`,
            {
              baseURL: S3_BASE_URL,
            }
          )
          token.html = html
        }
        setData(data)
        setDisplayMode(HAS_TOKENS)
      } catch (error) {
        console.log('error: ', error)
        setDisplayMode(NO_TOKENS)
      }
    }
    getTokensOfWallet()
  }, [address])

  return (
    <>
      <MintLayout className="flex flex-col items-center font-noto">
        <FormHeading className="pt-6 mb-8">我的秘密告白</FormHeading>
        {
          {
            [NO_TOKENS]: <NoTokensView />,
            [NOT_CONNECTED]: <NotConnectedView {...{ openConnectModal }} />,
            [HAS_TOKENS]: <HasTokensView {...{ tokens: data }} />,
          }[displayMode ?? NOT_CONNECTED]
        }
      </MintLayout>
      <SpinningOverlay isLoading={displayMode === LOADING} />
    </>
  )
}

const NoTokensView = () => {
  return (
    <>
      <div className="pt-36 pb-6">
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
      <p className="pb-12 text-cement">你目前還沒有任何秘密告白</p>
      <Link href="/mint">
        <a>
          <MobilePrimaryButton>我要告白</MobilePrimaryButton>
        </a>
      </Link>
    </>
  )
}

const NotConnectedView = ({ openConnectModal }) => {
  return (
    <>
      <div className="pt-36 pb-6">
        <WarningIcon />
      </div>
      <p className="text-cement text-2xl mb-3">請先連結錢包</p>
      <p className="text-cement tracking-wide mb-8">
        此頁面需要連結錢包才能瀏覽
      </p>
      <MobilePrimaryButton onClick={() => openConnectModal()}>
        連結錢包
      </MobilePrimaryButton>
    </>
  )
}

const HasTokensView = ({ tokens }: { tokens: MintWithHtml[] }) => {
  return (
    <>
      <PinkGiftIcon />
      <p className="text-guava mt-3 mb-10">恭喜獲得抽獎機會！</p>
      <div className="flex flex-col items-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-14 xl:gap-20">
        {tokens.map((t, i) => (
          <div key={t.id} className="pb-10">
            <div dangerouslySetInnerHTML={{ __html: t.html }} />
            <LinkAndPasscode
              link={`${metadata.siteUrl}/open/${t.slug}`}
              passcode={t.passcode}
              className="mt-6 mb-10"
            />
            {i < tokens.length - 1 && (
              <div className="flex flex-col items-center md:hidden">
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
    </>
  )
}

export default CollectionPage
