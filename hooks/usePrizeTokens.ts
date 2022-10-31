import axios from 'lib/axios'
import { useWeb3Context } from 'context'
import { useEffect, useState } from 'react'
import { salePhase } from 'utils/config'
import {
  NOT_CONNECTED,
  FETCHING,
  READY,
  FINISHED,
  PUBLIC_SALE,
} from 'shared/constants'
import { PrizeToken } from '@prisma/client'
import { fakePrizeTokens } from 'data'

export function usePrizeTokens(setPageDisplay) {
  const [prizeTokens, setPrizeTokens] = useState<PrizeToken[]>(fakePrizeTokens)
  const { address } = useWeb3Context()

  useEffect(() => {
    async function getPrizeTokensFromWallet() {
      try {
        setPageDisplay(FETCHING)
        const { data } = await axios.get(`/api/prize-tokens?address=${address}`)
        const validPrizeTokens = (data.data as PrizeToken[]).filter(
          (t) => !t.isPrivateSale && !t.openedAt && t.prizeName
        )
        setPrizeTokens(validPrizeTokens)
        setPageDisplay(READY)
      } catch (error) {
        console.log('error: ', error)
        setPrizeTokens([])
        setPageDisplay(READY)
      }
    }
    if (!address) {
      setPageDisplay(NOT_CONNECTED)
      return
    }
    if (![FINISHED, PUBLIC_SALE].includes(salePhase)) {
      setPageDisplay(READY)
      return
    }
    // TODO: Uncomment
    // getPrizeTokensFromWallet()
  }, [address])

  const consumePrizeToken = () => {
    setPrizeTokens((tokens) => tokens.slice(1))
  }

  return { prizeTokens, setPrizeTokens, consumePrizeToken }
}
