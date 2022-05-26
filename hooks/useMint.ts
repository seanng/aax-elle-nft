import { useWeb3Context } from 'context'
import { ethers } from 'ethers'
import contractABI from 'artifacts/contracts/ElleNFT.sol/ElleNFT.json'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

function handleError(error) {
  if (error?.code === -32603) {
    console.log('Do something to show that donation is required!!! ')
  }
  if (error?.code === -32000) {
    console.log('You do not have enough funds in your wallet.')
  }
  console.log('error: ', error)
}

export function useMint() {
  const { web3Provider } = useWeb3Context()

  async function mint(tokenURI: string, eth: string): Promise<string | void> {
    if (!web3Provider) return console.log('no provider connected.')
    if (!contractAddress) return console.log('no contract address!! ')
    const contract = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      web3Provider.getSigner()
    )

    const opts = { value: ethers.utils.parseEther(eth) }

    try {
      const tokenId = await contract.callStatic.mint(tokenURI, opts)
      await contract.mint(tokenURI, opts)
      return tokenId
    } catch (error) {
      handleError(error)
    }
  }

  async function mint2(
    receiverWalletAddress: string,
    tokenURI: string,
    receiptURI: string
  ) {
    if (!web3Provider) return console.log('no provider connected.')
    if (!contractAddress) return console.log('no contract address!! ')
    const contract = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      web3Provider.getSigner()
    )

    try {
      // https://ethereum.stackexchange.com/a/109992
      const secretMessageId = await contract.callStatic.mint2(
        receiverWalletAddress,
        tokenURI,
        receiptURI,
        {
          value: ethers.utils.parseEther('0.005'),
        }
      )
      await contract.mint2(receiverWalletAddress, tokenURI, receiptURI, {
        value: ethers.utils.parseEther('0.005'),
      })
    } catch (error) {
      handleError(error)
    }
  }

  return {
    mint,
    // mint2,
  }
}
