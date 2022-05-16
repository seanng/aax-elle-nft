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

// testnet contract: 0xabb8b6c797dbad714dcb87e3102eef736e553a60

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
