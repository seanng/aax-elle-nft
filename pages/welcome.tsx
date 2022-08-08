import { CaretDownButton, MintNavigation, PrimaryButton } from 'components'
import { config } from 'utils/config'
import { useWeb3Context } from 'context'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { PRESALE, PUBLIC_SALE } from 'shared/constants'

const WelcomePage: NextPage = () => {
  const { address, connect } = useWeb3Context()
  const router = useRouter()

  const handleCtaClick = async () => {
    if (config.saleStatus === PUBLIC_SALE) {
      router.push('/mint')
      return
    }
    if (config.saleStatus === PRESALE) {
      // Open connect wallet modal.
      let connected = true
      if (!address) connected = await connect()
      if (connected) {
        // Open loading modal to display Loading.
        // Check if address contains whitelist token
        // If address does not contain whitelist token, display Sorry modal.
        // If address contains whitelist token, continue to Mint (wizard.nextStep())
      }
    }
  }

  return (
    <>
      <MintNavigation />
      <div
        className="bg-black min-h-screen pt-navbar-height text-white bg-repeat flex flex-col items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(85, 242, 99, 0.5) 0.1px, transparent 1px), linear-gradient(to bottom, rgba(85, 242, 99, 0.5) 0.1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        <div className="font-mono font-medium text-xl text-center text-white bg-guava py-2 w-full">
          Limited time offer till 8/15
        </div>
        <div
          className="relative text-black font-mono font-medium italic text-6xl w-full leading-120% h-20 overflow-x-hidden"
          style={{
            textShadow:
              '-1px -1px 0 #C3FA08, 1px -1px 0 #C3FA08, -1px 1px 0 #C3FA08, 1px 1px 0 #C3FA08',
          }}
        >
          <p className="marquee scroll-left">
            <span>
              Welcome to ELLEverse&nbsp;&nbsp;&nbsp;Welcome to
              ELLEverse&nbsp;&nbsp;&nbsp;Welcome to ELLEverse&nbsp;&nbsp;&nbsp;
            </span>
          </p>
          <p className="marquee scroll-left marquee-delayed">
            <span>
              Welcome to ELLEverse&nbsp;&nbsp;&nbsp;Welcome to
              ELLEverse&nbsp;&nbsp;&nbsp;Welcome to ELLEverse&nbsp;&nbsp;&nbsp;
            </span>
          </p>
        </div>
        <div className="relative h-[514px] w-full max-w-[514px] mb-14">
          <Image
            src="/images/mint-cover-hero.png"
            layout="fill"
            alt="cover"
            objectFit="cover"
          />
        </div>
        {(config.saleStatus === PUBLIC_SALE ||
          config.saleStatus === PRESALE) && (
          <PrimaryButton className="mb-6" onClick={handleCtaClick}>
            我要告白
          </PrimaryButton>
        )}
        <CaretDownButton />
      </div>
    </>
  )
}

export default WelcomePage
