import type { NextPage } from 'next'
import { MintNavigation, PrimaryButton } from 'components'
import { useContract, useMint } from 'hooks'
import { useWeb3Context } from 'context'
import { config } from 'utils/config'

const TestPage: NextPage = () => {
  const { contract, mintGasFee, calcMintGasFee } = useContract()
  const { calcBalance, balance, openConnectModal, address } = useWeb3Context()
  const {
    preSaleMint,
    publicSaleMint,
    calcEthToNtd,
    ethToNtd,
    form,
    setForm,
    setFiles,
  } = useMint(contract)

  const ownsWhitelistToken = async (address: string) => {
    // Open loading modal to display Loading.
    const hasToken = await contract?.callStatic.ownsWhitelistToken(address)
    console.log('hasToken: ', hasToken)
    // Close loading modal
    return hasToken
  }

  const handleButtonClick = () => {
    console.log('CURRENT PHASE: ', config.saleStatus)

    if (!address) {
      console.log('NOT CONNECTED.')
      return
    }

    ownsWhitelistToken(address)
  }

  return (
    <>
      <MintNavigation />
      <div
        className="bg-black min-h-screen pt-navbar-height text-white bg-repeat flex flex-col items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(85, 242, 99, 0.3) 0.1px, transparent 1px), linear-gradient(to bottom, rgba(85, 242, 99, 0.3) 0.1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        <PrimaryButton onClick={handleButtonClick}>Test shit</PrimaryButton>
      </div>
    </>
  )
}

export default TestPage
