import * as service from 'backend/services/mints'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import contractABI from 'artifacts/contracts/Elleverse.sol/Elleverse.json'
import { CORRECT_NETWORK } from 'shared/constants'
import { Contract, providers, Wallet, Signer } from 'ethers'

const getSigner: () => Signer = {
  localhost: () => new providers.JsonRpcProvider().getSigner(),
  default: () =>
    new Wallet(
      process.env.WALLET_PRIVATE_KEY as string,
      providers.getDefaultProvider(CORRECT_NETWORK, {
        etherscan: process.env.ETHERSCAN_API_KEY,
        infura: process.env.INFURA_PROJECT_KEY,
      })
    ),
}[CORRECT_NETWORK ?? 'default']

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

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

    // now get the passcodes.
    const data = await service.findMany({
      OR: messageTokenIdList.map((id) => ({ messageTokenId: id })),
    })

    res.status(200).json({ data })
  } catch (error) {
    if (error.code === 'INVALID_ARGUMENT')
      return res.status(422).send('Invalid Address')

    res.status(500).send(error.message)
  }
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
