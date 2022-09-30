import { NextPage } from 'next'
import { decrypt } from 'lib/crypto'
import { useRouter } from 'next/router'
import { OutlinedHeading, WarningIcon, IgShareInstructions } from 'components'
import CompsNFTBeforeOpen from 'components/NFT/BeforeOpen'
import { useCallback, useEffect, useState } from 'react'
import { genImageFile, getAssets } from 'utils/nft'
import randomstring from 'randomstring'
import Image from 'next/image'
import { S3_BASE_URL } from 'shared/constants'

const html2canvasOpts = {
  height: 534,
  windowHeight: 534,
  // scale: 1,
  // height: 534 * IMG_SCALE,
  // windowHeight: 534 * IMG_SCALE,
  // IMG_SCALE,
}

const IgSharePage: NextPage = () => {
  const [previewImage, setPreviewImage] = useState<any>(null)
  const [compNode, setCompNode] = useState<any>(null)
  const nftImageSource = useNftImageSource()

  const compRef = useCallback((node) => {
    if (node) setCompNode(node)
  }, [])

  // Set Image from Component
  useEffect(() => {
    if (nftImageSource && compNode) {
      ;(async () => {
        const file = await genImageFile(
          compNode,
          'Impact NFT Shareable Image',
          undefined,
          html2canvasOpts
        )
        const reader = new FileReader()
        reader.addEventListener(
          'load',
          () => {
            setPreviewImage(reader.result)
          },
          false
        )
        reader.readAsDataURL(file as File)
      })()
    }
  }, [nftImageSource, compNode])

  return (
    <>
      <div className="flex flex-col items-center bg-black min-h-screen text-white py-10 md:py-20">
        <OutlinedHeading className="mb-10">
          如何儲存分享Impact NFT？
        </OutlinedHeading>
        <IgShareInstructions />
        <div className="flex justify-center w-80 md:w-[650px] text-orange space-x-2 mb-4 md:mb-16">
          <WarningIcon className="mt-1" width={16} height={16} />
          <div>
            你的告白完成到一半摟！想要把你心中的愛真正分享給愛的收件者並獲得抽獎資格嗎？趕緊去鑄造一張Impact
            NFT吧！
          </div>
        </div>

        {previewImage ? (
          <img src={previewImage} height="534" width="350" alt="finalImg" />
        ) : (
          <div className="pt-10">
            <Image
              priority
              src="/images/loading-icon.gif"
              layout="fixed"
              height={104}
              width={104}
            />
          </div>
        )}

        {/* Hidden div */}
        <div className="h-0 overflow-hidden">
          <div
            ref={compRef}
            className="bg-black h-[534px] flex flex-col items-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(85, 242, 99, 0.3) 0.5px, transparent 1px), linear-gradient(to bottom, rgba(85, 242, 99, 0.3) 0.5px, transparent 1px)`,
              backgroundSize: '40px 40px',
              backgroundPosition: '-10% -10%',
            }}
          >
            <img
              className="py-8"
              src="/logos/elle-white.png"
              height="27"
              width="72"
            />
            {nftImageSource && (
              <img
                src={nftImageSource}
                width="350"
                height="350"
                alt="beforeOpenImg"
              />
            )}
            <div className="flex justify-between font-mono py-8 items-center">
              <OutlinedHeading
                className="mb-0.5"
                fontSizeClass="text-lg tracking-wider font-noto"
                color="#EDFA00"
              >
                前往鑄造
              </OutlinedHeading>
              <OutlinedHeading
                fontSizeClass="text-lg tracking-wider italic"
                color="#EDFA00"
                className="ml-2"
              >
                {`>>>`}
              </OutlinedHeading>
              <OutlinedHeading
                className="ml-4"
                fontSizeClass="text-lg tracking-wider italic"
                color="#FF66FF"
              >
                elleverse.io
              </OutlinedHeading>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const CompsNFTSingle = ({ data, assetsCB }) => {
  const [file, setFile] = useState(null)

  useEffect(() => {
    if (file) assetsCB(file)
  }, [file, assetsCB])

  const setImage = setFile
  return <CompsNFTBeforeOpen {...{ data, setImage, setHTML: () => {} }} />
}

function useNftImageSource() {
  const [imageSource, setImageSource] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    if (router.query.id) {
      const id = Number(router.query.id)
      // Randomizing the query param force-fetches the image from source
      const randomQuery = randomstring.generate({ length: 6 })
      if (id >= 0 && id < 3113)
        fetch(`${S3_BASE_URL}/public/${id}.png?${randomQuery}`)
          .then((response) => response.blob())
          .then((imageBlob) => setImageSource(URL.createObjectURL(imageBlob)))
      return
    }

    if (router.query.at) {
      ;(async () => {
        const imageFile = await getAssets({
          message: '',
          aroundText: decrypt(router.query.at as string) ?? '',
          Comps: CompsNFTSingle,
        })

        const reader = new FileReader()
        reader.addEventListener(
          'load',
          () => setImageSource(reader.result),
          false
        )

        reader.readAsDataURL(imageFile as File)
      })()
    }
  }, [router.query])

  return imageSource
}

export default IgSharePage
