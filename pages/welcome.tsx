import {
  CaretDownButton,
  MintHeroDesktop,
  MintHeroMobile,
  MintLayout,
  PrimaryButton,
} from 'components'
import { config } from 'utils/config'
import { useWeb3Context } from 'context'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PRESALE, PUBLIC_SALE } from 'shared/constants'
import Link from 'next/link'

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
    <MintLayout className="flex flex-col items-center overflow-hidden">
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
      <MintHeroMobile className="md:hidden mb-14" />
      <MintHeroDesktop className="hidden md:block mb-14 max-h-[700px]" />
      <Link href="/mint">
        <a>
          <PrimaryButton>我要告白</PrimaryButton>
        </a>
      </Link>
      <CaretDownButton className="mt-6" />
    </MintLayout>
  )
}

export default WelcomePage
