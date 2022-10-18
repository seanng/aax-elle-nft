// ! Used on Node server
import { Contract, providers, Wallet, Signer } from 'ethers'
import { correctNetwork, contractAddress } from 'utils/config'
import contractABI from 'artifacts/contracts/Elleverse.sol/Elleverse.json'

const defaultGetSigner = () =>
  new Wallet(
    process.env.WALLET_PRIVATE_KEY as string,
    providers.getDefaultProvider(correctNetwork, {
      etherscan: process.env.ETHERSCAN_API_KEY,
      infura: process.env.INFURA_PROJECT_KEY,
    })
  )

const getSigner: () => Signer = {
  localhost: () => new providers.JsonRpcProvider().getSigner(),
  goerli: defaultGetSigner,
  homestead: defaultGetSigner,
  default: defaultGetSigner,
}[correctNetwork ?? 'default']

export default new Contract(
  contractAddress as string,
  contractABI.abi,
  getSigner()
)
