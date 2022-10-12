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

// Goerli Contract deployed on 10 Oct: 0xAbfFa373ef628884951567831f1650cfB8883aca
// Rinkeby Contract deployed on 12 Sep: 0xdE32B5AfC6bB356AcD8F9FEd07b420c84bFEE7db
// Localhost Contract deployed on 10 Oct: 0x5FbDB2315678afecb367f032d93F642f64180aa3

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
