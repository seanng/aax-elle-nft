import { ethers, network } from 'hardhat'

// const SAMPLE_TOKEN_URI = 'https://jsonkeeper.com/b/RUUS'

async function main() {
  const ContractFactory = await ethers.getContractFactory('ElleNFT')
  if (!network.config.from)
    throw new Error(`no from address configured in ${network.name}!`)
  const contractOwner = await ethers.getSigner(network.config.from)
  const contract = await ContractFactory.connect(contractOwner).deploy()
  await contract.deployed()
  console.log('Contract deployed to:', contract.address)
}

// Rinkeby Contract deployed on 24 May: 0xAbfFa373ef628884951567831f1650cfB8883aca

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
