import { ethers, network } from 'hardhat'
import dotenv from 'dotenv'
if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

// CONFIGURATIONS
const NEW_BASE_URI =
  'https://aax-elle-nft-git-dev-seanng.vercel.app/api/metadata/'

async function run() {
  if (!network.config.from)
    throw new Error(`no from address configured in ${network.name}!`)

  const contract = (await ethers.getContractFactory('Elleverse')).attach(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  )

  // const uriOfNotSeen = await contract.tokenURI(14)
  // const uriOfSeen = await contract.tokenURI(2)
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
