import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contract with the account:', deployer.address)
  console.log(
    'Account balance before:',
    (await deployer.getBalance()).toString()
  )

  const ContractFactory = await ethers.getContractFactory('Elleverse')
  const token = await ContractFactory.deploy()
  await token.deployed()
  console.log('Contract deployed to:', token.address)
  console.log(
    'Account balance after:',
    (await deployer.getBalance()).toString()
  )
}

// Goerli Contract deployed on 10 Oct: 0xAbfFa373ef628884951567831f1650cfB8883aca
// Localhost Contract deployed on 10 Oct: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Goerli Contract v3 deployed on 8 Nov: 0x447D1A0dD7e37E13f16678cCF4F1416f77aD6CB5
// Goerli Contract v4 deployed on 10 Nov: 0x09cDDb19b298f4b6399793DcEB0E5e88621e81dE

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
