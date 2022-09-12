import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SpinningOverlay, OutlinedHeading } from 'components'
import CompsNFTBeforeOpen from 'components/NFT/BeforeOpen'
import { useCallback, useEffect, useState } from 'react'
import { genImageFile, getAssets } from 'utils/nft'

const CompsNFTSingle = ({ data, assetsCB }) => {
  const [beforeOpenImg, setBeforeOpenImg] = useState(null)

  useEffect(() => {
    if (beforeOpenImg) {
      assetsCB({
        beforeOpenImage: beforeOpenImg,
      })
    }
  }, [beforeOpenImg, assetsCB])

  return (
    <CompsNFTBeforeOpen
      data={data}
      setImage={setBeforeOpenImg}
      setHTML={() => {}}
    />
  )
}

const IgSharePage: NextPage = () => {
  const router = useRouter()
  const [beforeOpenImg, setBeforeOpenImg] = useState<any>(null)
  const [finalImgFile, setFinalImgFile] = useState<any>(null)
  const [finalImgPreview, setFinalImgPreview] = useState<any>(null)

  const [compNode, setCompNode] = useState<any>(null)
  const compRef = useCallback((node) => {
    if (node) setCompNode(node)
  }, [])

  useEffect(() => {
    if (router.query.aroundtext) {
      const getImg = async () => {
        const assets = await getAssets({
          message: '',
          aroundText: router.query.aroundtext as string,
          Comps: CompsNFTSingle,
        })

        const reader = new FileReader()
        reader.addEventListener(
          'load',
          () => {
            setBeforeOpenImg(reader.result)
          },
          false
        )

        reader.readAsDataURL(assets.beforeOpenImage as File)
      }

      getImg()
    }
  }, [router.query])

  useEffect(() => {
    if (beforeOpenImg && compNode) {
      const getImg = async () => {
        await genImageFile(compNode, 'final', setFinalImgFile, {
          height: 534,
          windowHeight: 534,
        })
      }
      getImg()
    }
  }, [beforeOpenImg, compNode])

  useEffect(() => {
    if (finalImgFile) {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          setFinalImgPreview(reader.result)
        },
        false
      )

      reader.readAsDataURL(finalImgFile as File)
    }
  }, [finalImgFile])

  return (
    <>
      <div className="flex flex-col items-center bg-black min-h-screen text-white py-10 md:py-20">
        <OutlinedHeading className="mb-10">
          如何儲存分享Impact NFT？
        </OutlinedHeading>
        {finalImgPreview ? (
          <img src={finalImgPreview} alt="finalImg" />
        ) : (
          <div
            ref={compRef}
            className="bg-black h-[534px] flex flex-col justify-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(85, 242, 99, 0.3) 0.1px, transparent 1px), linear-gradient(to bottom, rgba(85, 242, 99, 0.3) 0.1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          >
            <span className="text-white text-3xl text-center mb-5">ELLE</span>
            {beforeOpenImg && <img src={beforeOpenImg} alt="beforeOpenImg" />}
            <span className="text-white text-3xl text-center mb-5">ELLE</span>
          </div>
        )}
      </div>
      <SpinningOverlay isLoading={!beforeOpenImg} />
    </>
  )
}

export default IgSharePage
