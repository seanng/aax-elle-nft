import { Files, MintResponseData } from 'shared/types'
import { FormHeading, LinkAndPasscode, SocialButtons } from 'components'
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
      <FormHeading className="mb-2 md:mb-7">
        恭喜成功鑄造 Impact NFT！
      </FormHeading>
      <div className="text-center mx-auto">
        <p className="w-64 md:w-full mb-4 md:mb-7 md:text-xl mx-auto tracking-wide">
          這份愛的告白會永久保存在區塊鏈上也可以分享NFT到社群喔
        </p>
        <div dangerouslySetInnerHTML={{ __html: preview as string }} />
        <LinkAndPasscode
          link={link}
          passcode={data?.passcode ?? 'abc12'}
          className="mb-5 md:mb-9 mt-4"
        />
        <p className="w-64 md:w-full mx-auto md:text-lg tracking-wide mb-6 md:mb-8">
          我們已將上鎖密碼即連結寄到你的email，你可以稍後查看。
        </p>
        <Link href="/collection">
          <a>
            <GoToCollectionButton />
          </a>
        </Link>
      </div>
    </div>
  )
}

const GoToCollectionButton = ({ width = 226, height = 42, ...props }) => (
  <button className="relative" {...props}>
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 226 42`}
    >
      <path
        fill="#55F263"
        d="M5 36h221v6H5zM2 36h1v3H2zM3 36h1v4H3zM4 36h1v5H4zM1 36h1v2H1zM0 36h1v1H0zM220 5h6v31h-6zM220 2h3v1h-3zM220 3h4v1h-4zM220 4h5v1h-5zM220 0h1v1h-1zM220 1h2v1h-2z"
      />
      <path fill="#EDFA00" d="M0 0h221v37H0z" />
    </svg>
    <div className="absolute mx-auto text-black font-medium md:text-lg font-mono w-full h-full top-0 leading-[38px] md:leading-[40px]">
      前往我的秘密告白
    </div>
  </button>
)
