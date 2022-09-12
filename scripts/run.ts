import { ethers, network } from 'hardhat'
import fs from 'fs'
import path from 'path'

// Get from deploy script
const CONTRACT_ADDRESS = '0xdE32B5AfC6bB356AcD8F9FEd07b420c84bFEE7db'

async function main() {
  if (!network.config.from)
    throw new Error(`no from address configured in ${network.name}!`)

  const contractABIPath = path.join(
    __dirname,
    '..',
    'artifacts',
    'contracts',
    'Elleverse.sol',
    'Elleverse.json'
  )
  const contractABI = JSON.parse(fs.readFileSync(contractABIPath, 'utf-8'))
  const owner = await ethers.getSigner(network.config.from)
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, owner)
  await contract.callStatic.setPublicSalePhase()
  console.log('Method exists.')
  await contract.setPublicSalePhase()
  // console.log('txn mined: ', txn)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
