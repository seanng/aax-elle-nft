import { ethers } from 'hardhat'

const SAMPLE_TOKEN_URI = 'https://jsonkeeper.com/b/RUUS'

async function main() {
  const nftContractFactory = await ethers.getContractFactory('ElleNFT')
  const nftContract = await nftContractFactory.deploy()
  await nftContract.deployed()
  console.log('Contract deployed to:', nftContract.address)

  // Call the function.
  let txn = await nftContract.mint(SAMPLE_TOKEN_URI)
  // Wait for it to be mined.
  await txn.wait()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
