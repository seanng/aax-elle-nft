import { ethers } from 'hardhat'
import dotenv from 'dotenv'
if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

async function setSalePhase() {
  const contract = (await ethers.getContractFactory('Elleverse')).attach(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  )

  // await contract.setPublicSalePhase()
  await contract.setPrivateSalePhase()
}

setSalePhase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
