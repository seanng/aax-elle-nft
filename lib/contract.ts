// ! Used on Node server
import { Contract, providers, Wallet, Signer } from 'ethers'
import { correctNetwork, contractAddress } from 'utils/config'
import contractABI from 'artifacts/contracts/Elleverse.sol/Elleverse.json'

const GOERLI_PRIVATE_KEY =
  process.env.GOERLI_PRIVATE_KEY ?? 'YOUR GOERLI PRIVATE KEY'

const goerliGetSigner = () =>
  new Wallet(
    GOERLI_PRIVATE_KEY,
    providers.getDefaultProvider(correctNetwork, {
      etherscan: process.env.ETHERSCAN_API_KEY,
      infura: process.env.INFURA_PROJECT_KEY,
    })
  )

const getSigner: () => Signer = {
  localhost: () => new providers.JsonRpcProvider().getSigner(),
  goerli: goerliGetSigner,
  homestead: goerliGetSigner,
  default: goerliGetSigner,
}[correctNetwork ?? 'default']

export default new Contract(
  contractAddress as string,
  contractABI.abi,
  getSigner()
)
