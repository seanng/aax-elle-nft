import { ethers } from 'ethers'
import { useWeb3Context } from 'context'
import { useState, useEffect } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { useContract } from 'hooks'
import { useForm } from 'react-hook-form'

interface Props extends Partial<StepWizardChildProps> {
  updateForm: (formValues: Record<string, string>) => void
}

export function DonationStep({ updateForm, ...wizard }: Props) {
  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm({ mode: 'onChange' })
  const [estGasFee, setEstGasFee] = useState('0')
  const { web3Provider } = useWeb3Context()

  const contract = useContract()

  const handleFormSubmit = (data) => {
    updateForm(data)
  }

  const handleBackClick = () => {
    wizard.previousStep && wizard.previousStep()
  }

  // TODO: not sure why i'm getting 0 gas fee. ask denis
  const getEstGasFee = async () => {
    if (contract && web3Provider) {
      // TODO: use a different proxy uri
      const functionFee = await contract.estimateGas.mint(
        'https://jsonkeeper.com/b/BTF9'
      )
      console.log('functionFee: ', functionFee)
      console.log('web3Provider: ', web3Provider)
      const feeData = await web3Provider.getFeeData()
      console.log('feeData: ', feeData)
      console.log('maxFeePerGas: ', feeData.maxFeePerGas)
      const estGasFeeBN = feeData.maxFeePerGas?.mul(functionFee)
      estGasFeeBN && setEstGasFee(ethers.utils.formatEther(estGasFeeBN))
    }
  }

  useEffect(() => {
    if (wizard.isActive) {
      console.log('hello?', wizard.isActive)
      getEstGasFee()
    }
  }, [wizard.isActive])

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <h2>你的告白能幫助小動物！</h2>
        <input
          type="number"
          id="donation"
          className="text-black"
          placeholder="Enter donation"
          min={0}
          {...register('donation', { required: true })}
        />
      </div>
      <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:text-sm"
        onClick={handleBackClick}
      >
        Back
      </button>
      <button
        type="submit"
        disabled={!isValid || !isDirty}
        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-300 focus:outline-none sm:text-sm"
      >
        鑄造
      </button>
      <div>
        <h2 className="py-4">Gas Fee Estimate</h2>
        <p>{estGasFee}</p>
      </div>
    </form>
  )
}
