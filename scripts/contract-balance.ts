import { ethers } from 'hardhat'
import dotenv from 'dotenv'
if (!process.env.VERCEL) dotenv.config({ path: __dirname + '/.env.local' })

async function contractBalance() {
  const contract = (await ethers.getContractFactory('Elleverse')).attach(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  )

  const balance = await contract.provider.getBalance(contract.address)
  const balanceInEth = ethers.utils.formatEther(balance)
  console.log('Contract Balance: ', balanceInEth)
}

contractBalance()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
