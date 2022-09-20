import { ethers, network } from 'hardhat'

// Get from deploy script
const CONTRACT_ADDRESS = '0xdE32B5AfC6bB356AcD8F9FEd07b420c84bFEE7db'

async function setSalePhase() {
  if (!network.config.from)
    throw new Error(`no from address configured in ${network.name}!`)

  const contract = (await ethers.getContractFactory('Elleverse')).attach(
    CONTRACT_ADDRESS
  )

  await contract.setPublicSalePhase()
}

setSalePhase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
