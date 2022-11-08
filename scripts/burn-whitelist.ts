import { ethers } from 'hardhat'
import dotenv from 'dotenv'
if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

async function burnWhitelist() {
  const contract = (await ethers.getContractFactory('Elleverse')).attach(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  )

  // Get latest tokenId.
  const nextTokenId = (await contract.callStatic.getNextTokenId()).toNumber()
  const tokenIdsToBurn = [] as number[]
  for (let i = 1; i < nextTokenId; i += 2) {
    tokenIdsToBurn.push(i)
  }

  console.log(
    '🚀 ~ file: burn-whitelist.ts ~ line 16 ~ burnWhitelist ~ tokenIdsToBurn',
    tokenIdsToBurn
  )

  await contract.setEventOverPhase()
  await contract.burnMultiple(tokenIdsToBurn)
}

burnWhitelist()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
