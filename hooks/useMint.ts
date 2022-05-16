import { useWeb3Context } from 'context'
import { ethers } from 'ethers'
import contractABI from 'artifacts/contracts/ElleNFT.sol/ElleNFT.json'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export function useMint() {
  const { web3Provider } = useWeb3Context()

  return async function mint(tokenURI: string) {
    if (!web3Provider) return console.log('no provider connected.')
    if (!contractAddress) return console.log('no contract address!! ')
    const contract = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      web3Provider.getSigner()
    )

    try {
      const done = await contract.mint(tokenURI, {
        value: ethers.utils.parseEther('0.05'),
      })
      console.log('done: ', done)
    } catch (error) {
      if (error.code === -32603) {
        console.log('Do something to show that donation is required!!! ')
      }
    }
  }
}
