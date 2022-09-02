import type { NextPage } from 'next'
import { getNFTSettings } from 'utils/nft'
import CompsNFTMain from 'components/NFT/Main'
import { NFTParameters } from 'shared/types'

const TestPage: NextPage = () => {
  const data: NFTParameters = getNFTSettings(
    {
      aroundText:
        'AAAAAAAAAA BBBBBBBBBB CCCCCCCCC DDDDDDDDD gpqy EEEEEEEEEE FFFFFFFFFF GGGGGGGGGG HHHHHHHHHH',
      message:
        '在旅途中，\n小王子思考愛的真諦明白馴養的意義。\n小王子思考愛的真諦明白馴養的意義。\nI love you.\n我愛你。',
    },
    'default'
  )

  return (
    <CompsNFTMain
      data={data}
      assetsCB={(assets) => {
        console.log(assets)
      }}
    />
  )
}

export default TestPage
