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
      const oldBalance = await owner.getBalance()
      await contract.connect(sender).mint('FAKE_TOKEN_URI', { value: donation })
      const newBalance = await owner.getBalance()
      expect(newBalance.sub(oldBalance)).toEqual(donation)
    })
  })
  describe('mint2', () => {
    it('increments the tokenId by 2', async function () {
      const [owner, sender, receiver] = await ethers.getSigners()
      expect(bigNumberToString(await contract.getTokenId())).toBe('0')
      await contract
        .connect(sender)
        .mint2(receiver.address, 'FAKE_MSG_URI', 'FAKE_RECEIPT_URI', {
          value: donation,
        })
      expect(bigNumberToString(await contract.getTokenId())).toBe('2')
    })
  })
})
