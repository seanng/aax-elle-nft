import { useWeb3Context } from 'context'
import { ethers } from 'ethers'
import contractABI from 'artifacts/contracts/Elleverse.sol/Elleverse.json'
import { useState } from 'react'
import { config } from 'utils/config'
import { PUBLIC_SALE } from 'shared/constants'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

interface RetVal {
  contract: ethers.Contract | null
  calcMintGasFee: () => Promise<void>
  mintGasFee: string
}

export function useContract(): RetVal {
  const { web3Provider } = useWeb3Context()
  const [mintGasFee, setMintGasFee] = useState<string>('')

  const contract = web3Provider
    ? new ethers.Contract(
        contractAddress as string,
        contractABI.abi,
        web3Provider.getSigner()
      )
    : null

  const calcMintGasFee = async (): Promise<void> => {
    if (contract && web3Provider) {
      try {
        const mintMethod =
          config.saleStatus === PUBLIC_SALE ? 'publicSaleMint' : 'preSaleMint'
        const functionFee = await contract.estimateGas[mintMethod]({
          value: ethers.utils.parseEther('0.1'),
        })
        const feeData = await web3Provider.getFeeData()
        const estGasFeeBN = feeData.maxFeePerGas?.mul(functionFee)
        estGasFeeBN && setMintGasFee(ethers.utils.formatEther(estGasFeeBN))
      } catch (error) {
        console.log('error calculating gas fee: ', error)
        setMintGasFee('')
      }
    }
  }

  return {
    contract,
    calcMintGasFee,
    mintGasFee,
  }
}
