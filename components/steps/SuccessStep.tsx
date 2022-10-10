import { Files, MintResponseData } from 'shared/types'
import {
  SquareShareButton,
  ResponsiveSecondaryButton,
  OutlinedHeading,
  LinkAndPasscode,
} from 'components'
import { metadata } from 'utils/config'
import Link from 'next/link'
import { usePreviewHtml } from 'hooks'

interface Props {
  data: MintResponseData
  files: Files
}

export function SuccessStep({ data, files }: Props) {
  const preview = usePreviewHtml(files.beforeOpenHtml)
  const link = `${metadata.siteUrl}/open/${data?.slug}`

  return (
    <div className="flex flex-col font-noto pt-16 text-center">
      <OutlinedHeading className="mb-2 md:mb-7">
        恭喜成功鑄造 Impact NFT！
      </OutlinedHeading>
      <div className="text-center mx-auto">
        <p className="w-64 md:w-full mb-4 md:mb-7 md:text-xl mx-auto tracking-wide">
          這份愛的告白會永久保存在區塊鏈上也可以分享NFT到社群喔
        </p>
        <div dangerouslySetInnerHTML={{ __html: preview as string }} />
        <div className="mt-6 mb-4 flex items-center justify-center space-x-3 md:space-x-4">
          <Link href="/collection" passHref>
            <a target="__blank" className="leading-0">
              <ResponsiveSecondaryButton type="button">
                前往我的秘密
              </ResponsiveSecondaryButton>
            </a>
          </Link>
          <Link href={`/ig-share?id=${data?.tokenId}&lol`} passHref>
            <a target="__blank" className="leading-0">
              <SquareShareButton />
            </a>
          </Link>
        </div>
        <LinkAndPasscode
          link={link}
          passcode={data?.passcode ?? 'abc12'}
          className="mb-5 md:mb-9 mt-8"
        />
      </div>
    </div>
  )
}
