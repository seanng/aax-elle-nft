import CompsNFTBeforeOpenBare from 'components/NFT/BeforeOpenBare'
import Icon10 from 'components/NFT/shared/background-icons/10'
import { useEffect, useState } from 'react'
import type { NFTParameters } from 'shared/types'
import {
  BG_COLORS,
  genRandomAColor,
  genRandomBColor,
  TGI_Colors,
} from 'utils/nft'

const genRandomNftProps = (withIcons = false): NFTParameters[] => {
  const retArr = [] as NFTParameters[]
  for (const colorA of BG_COLORS) {
    for (const colorB of TGI_Colors) {
      const iOColor = genRandomBColor()
      const iIColor = genRandomAColor()

      retArr.push({
        aroundText:
          "Once upon a time you dressed so fine Threw the bums a dime in your prime, didn't you? People call say 'beware doll, you're bound to fall' You thought they were all kidding you",
        message: 'Hello John how are you my friend?',
        messageColor: '#000000',
        backgroundStyle: colorA,
        gridStyle: colorB,
        aroundTextColor: colorB,
        iconOutlineColor: iOColor,
        iconFillColor: iIColor,
        ...(withIcons ? { gridIconTemplate: Icon10 } : {}),
      })
    }
  }
  return retArr
}

export const ColorCombosScreen = ({ withIcons = false }) => {
  const [nftList, setNftList] = useState<NFTParameters[]>([])

  useEffect(() => {
    setNftList(genRandomNftProps(withIcons))
  }, [])

  return nftList.length > 0 ? (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-8">
      {nftList.map((data, i) => (
        <div key={i}>
          <p>{`${i + 1}) ${data.backgroundStyle} & ${data.gridStyle}`} </p>
          <CompsNFTBeforeOpenBare
            {...{ data, setImage: () => {}, setHTML: () => {} }}
          />
        </div>
      ))}
    </div>
  ) : null
}
