/*
 * @jest-environment node
 */
import { bigNumberToString } from 'backend/helpers'
import { ethers } from 'hardhat'

const DONATION_IN_ETH = '0.00001'
const donation = ethers.utils.parseEther(DONATION_IN_ETH)

describe('ElleNFT', function () {
  let contract
  beforeEach(async () => {
    const contractFactory = await ethers.getContractFactory('ElleNFT')
    contract = await contractFactory.deploy()
    await contract.deployed()
  })
  describe('mint', () => {
    it('increments the tokenId by 1', async function () {
      expect(bigNumberToString(await contract.getTokenId())).toBe('0')
      await contract.mint('FAKE_TOKEN_URI', { value: donation })
      expect(bigNumberToString(await contract.getTokenId())).toBe('1')
    })

    it('successfully pays to the owner', async function () {
      const [owner, sender] = await ethers.getSigners()
      const oldBalance = Number(bigNumberToString(await owner.getBalance()))
      await contract.connect(sender).mint('FAKE_TOKEN_URI', { value: donation })
      const newBalance = Number(bigNumberToString(await owner.getBalance()))
      const donationAmt = Number(bigNumberToString(donation))
      expect(newBalance - donationAmt).toBe(oldBalance)
    })
  })
})
