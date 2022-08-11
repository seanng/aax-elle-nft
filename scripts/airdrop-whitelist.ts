import { ethers, network } from 'hardhat'
import fs from 'fs'
import path from 'path'

// Get from deploy script
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
// List of addresses to airdrop to.
const addresses = [
  '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', //account #1
  // '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
  // '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
  // '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
  '0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc', //account #5
]

async function airdrop() {
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

  const txn = await contract.airdropWhitelistTokens(addresses)
  console.log('Airdrop complete. ', txn)
}

airdrop()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
