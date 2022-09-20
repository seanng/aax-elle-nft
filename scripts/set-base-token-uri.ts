import { ethers, network } from 'hardhat'

// CONFIGURATIONS
const CONTRACT_ADDRESS = '0xdE32B5AfC6bB356AcD8F9FEd07b420c84bFEE7db'
const NEW_BASE_URI =
  'https://aax-elle-nft-git-dev-seanng.vercel.app/api/metadata/'

async function setSalePhase() {
  if (!network.config.from)
    throw new Error(`no from address configured in ${network.name}!`)

  const contract = (await ethers.getContractFactory('Elleverse')).attach(
    CONTRACT_ADDRESS
  )

  await contract.setBaseURI(NEW_BASE_URI)
}

setSalePhase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
