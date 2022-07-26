import { StepWizardChildProps } from 'react-step-wizard'
import { PrimaryButton } from 'components'
import { config } from 'utils/config'
import { PRESALE, PUBLIC_SALE } from 'shared/constants'
import { useWeb3Context } from 'context'

interface Props extends Partial<StepWizardChildProps> {}

/**
 * @description Includes Impact NFT Perks Banner & How to win a prize & Onboarding & Start Journey.
 */
export function CoverStep({ ...wizard }: Props) {
  const { address, connect } = useWeb3Context()

  const handleCtaClick = async () => {
    if (config.saleStatus === PUBLIC_SALE) {
      if (wizard.nextStep) wizard.nextStep()
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
    <div className="relative">
      <div>Impact NFT Perks Banner</div>
      <div>How to win a prize?</div>
      {(config.saleStatus === PUBLIC_SALE || config.saleStatus === PRESALE) && (
        <div className="fixed bottom-10 w-full text-center">
          <PrimaryButton className="w-48" onClick={handleCtaClick}>
            我要告白
          </PrimaryButton>
        </div>
      )}
    </div>
  )
}
