import { PrizeToken } from '@prisma/client'
import {
  MintLayout,
  NotConnectedView,
  OutlinedHeading,
  TokenInfoBox,
} from 'components'
import { useWeb3Context } from 'context'
import axios from 'lib/axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { FINISHED, PRIVATE_SALE, PUBLIC_SALE } from 'shared/constants'
import { salePhase } from 'utils/config'

const LOADING = 'LOADING'
const NOT_CONNECTED = 'NOT_CONNECTED'
const READY = 'READY'

const LuckyDrawPage: NextPage = () => {
  const [displayMode, setDisplayMode] = useState(LOADING)
  const [prizeTokens, setPrizeTokens] = useState<PrizeToken[]>([])
  const { address } = useWeb3Context()

  useEffect(() => {
    async function getPrizeTokensFromWallet() {
      setDisplayMode(LOADING)
      try {
        const {
          data: { data },
        } = (await axios.get(`/api/prize-tokens?address=${address}`)) as {
          data: { data: PrizeToken[] }
        }
        setPrizeTokens(data.filter((t) => !t.isPrivateSale && !t.openedAt))
        setDisplayMode(READY)
      } catch (error) {
        console.log('error: ', error)
        setPrizeTokens([])
        setDisplayMode(READY)
      }
    }
    if (!address) {
      setDisplayMode(NOT_CONNECTED)
      return
    }
    if (![FINISHED, PUBLIC_SALE].includes(salePhase)) {
      setDisplayMode(READY)
      return
    }
    getPrizeTokensFromWallet()
  }, [address])

  return (
    <>
      <MintLayout className="flex flex-col items-center">
        <div className="font-mono font-medium text-xl text-center text-black bg-guava py-2 w-full mb-6 md:mb-10">
          抽獎第一波將於 12/24開始！
        </div>
        <OutlinedHeading fontSizeClass="text-3xl md:text-6xl">
          ELLEverse 抽獎
        </OutlinedHeading>
        {displayMode === NOT_CONNECTED ? (
          <NotConnectedView />
        ) : (
          <>
            <TokenInfoBox
              isLoading={displayMode === LOADING}
              tokens={prizeTokens}
              showsPrizeTokens
            />
            {/* LUCKY DRAW REEL */}
          </>
        )}
      </MintLayout>
      {/* Maybe a modal goes here? */}
    </>
  )
}

export default LuckyDrawPage
