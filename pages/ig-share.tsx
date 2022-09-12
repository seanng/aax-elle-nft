import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SpinningOverlay, OutlinedHeading } from 'components'
import CompsNFTBeforeOpen from 'components/NFT/BeforeOpen'
import { useState } from 'react'
import { getNFTSettings } from 'utils/nft'

const IgSharePage: NextPage = () => {
  const [beforeOpenImg, setBeforeOpenImg] = useState(null)
  const [beforeOpenHTML, setBeforeOpenHTML] = useState(null)
  const router = useRouter()
  const data = getNFTSettings({ aroundText: router.query.at })

  //

  return (
    <>
      <div className="flex flex-col items-center bg-black min-h-screen text-white py-10 md:py-20">
        <OutlinedHeading>如何儲存分享Impact NFT？</OutlinedHeading>
        {/* TODO: The component should be hidden. We should be showing an Img instead (from genImageFile(comp)), which would include the frame divs. */}
        <CompsNFTBeforeOpen
          data={data}
          setImage={setBeforeOpenImg}
          setHTML={setBeforeOpenHTML}
        />
      </div>
      <SpinningOverlay isLoading={!beforeOpenHTML || !beforeOpenImg} />
    </>
  )
}

export default IgSharePage
