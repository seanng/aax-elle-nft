import { PrimaryButton, WarningIcon } from 'components'
import { useWeb3Context } from 'context'

export const NotConnectedView = ({}) => {
  const { openConnectModal } = useWeb3Context()

  return (
    <>
      <div className="pt-36 pb-6">
        <WarningIcon />
      </div>
      <p className="text-cement text-2xl md:text-3xl mb-3 md:mb-5">
        請先連結錢包
      </p>
      <p className="text-cement md:text-xl tracking-wide mb-8 md:mb-12">
        此頁面需要連結錢包才能瀏覽
      </p>
      <PrimaryButton onClick={() => openConnectModal()}>連結錢包</PrimaryButton>
    </>
  )
}
