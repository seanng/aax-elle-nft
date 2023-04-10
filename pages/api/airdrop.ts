import dotenv from 'dotenv'
import { ethers } from 'ethers'
import contractABI from 'artifacts/contracts/Elleverse.sol/Elleverse.json'
import { contractAddress } from 'utils/config'
import { prisma } from 'lib/prisma'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

interface HandlerRequest extends NextApiRequest {
  body: {
    mintMethod: string
    address: string
  }
}

const handler = async (req: HandlerRequest, res: NextApiResponse) => {
  const { mintMethod, address } = req?.body
  console.log(mintMethod, address)
  const privateKey = process.env.GOERLI_PRIVATE_KEY
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
  const signer = new ethers.Wallet(privateKey, provider)
  const contract = new ethers.Contract(contractAddress, contractABI.abi, signer)

  const tokenIdBN = await contract.callStatic[mintMethod](address)
  const messageTokenId = Number(tokenIdBN.toString())
  await contract[mintMethod](address)
  res.status(200).json({ messageTokenId })
}

export default handler
