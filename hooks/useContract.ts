import { useWeb3Context } from 'context'
import { ethers } from 'ethers'
import contractABI from 'artifacts/contracts/ElleNFT.sol/ElleNFT.json'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export function useContract(): ethers.Contract | void {
  const { web3Provider } = useWeb3Context()
  if (!web3Provider) return console.log('no provider connected.')
  if (!contractAddress) return console.log('no contract address!! ')

  return new ethers.Contract(
    contractAddress,
    contractABI.abi,
    web3Provider.getSigner()
  )
}
