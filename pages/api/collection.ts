import * as service from 'backend/services/message-tokens'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import contractABI from 'artifacts/contracts/Elleverse.sol/Elleverse.json'
import { correctNetwork, contractAddress } from 'utils/config'
import { Contract, providers, Wallet, Signer } from 'ethers'

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

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query
  if (!address || typeof address !== 'string' || Array.isArray(address)) {
    res.status(422).send('Single address not provided')
    return
  }
  try {
    const contract = new Contract(
      contractAddress as string,
      contractABI.abi,
      getSigner()
    )
    const tokenIdBnList = await contract.callStatic.tokensOfOwner(address)
    const tokenIdList = tokenIdBnList.map((bn) => bn.toNumber())
    const messageTokenIdList = tokenIdList.filter((id) => id % 2 === 0)

    if (messageTokenIdList.length === 0)
      return res.status(404).send('No Message Tokens Found')

    const data = await service.findMany({
      OR: messageTokenIdList.map((id) => ({ tokenId: id })),
    })

    res.status(200).json({ data })
  } catch (error) {
    console.log('error: ', error)
    if (error.code === 'INVALID_ARGUMENT')
      return res.status(422).send('Invalid Address')

    res.status(500).send(error.message)
  }
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
