import { ethers, network } from 'hardhat'

async function main() {
  const ContractFactory = await ethers.getContractFactory('Elleverse')
  if (!network.config.from)
    throw new Error(`no from address configured in ${network.name}!`)
  const contractOwner = await ethers.getSigner(network.config.from)
  const contract = await ContractFactory.connect(contractOwner).deploy()
  await contract.deployed()
  console.log('Contract deployed to:', contract.address)
}

// Rinkeby Contract deployed on 25 Jul: 0x7DB0fF67A2B3c974E4661583CCeE98b1b6810af5
// Localhost Contract deployed on 27 Jul: 0x5FbDB2315678afecb367f032d93F642f64180aa3

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
