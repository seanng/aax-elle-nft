/*
 * @jest-environment node
 */
import { ethers } from 'hardhat'

const DONATION_IN_ETH = '0.1'
const donation = ethers.utils.parseEther(DONATION_IN_ETH)

describe('Elleverse', function () {
  let contract
  let signers

  beforeEach(async () => {
    const contractFactory = await ethers.getContractFactory('Elleverse')
    contract = await contractFactory.deploy()
    await contract.deployed()

    signers = await ethers.getSigners()
  })

  describe('constructor', () => {
    test('treasury is owner', async function () {
      const [owner] = signers
      expect(await contract.treasury()).toEqual(owner.address)
    })
  })

  describe('publicSaleMint', () => {
    it('can only mint during public sale phase', async function () {
      const [owner, sender] = signers
      const spy1 = jest.fn()
      const spy2 = jest.fn()
      const connection = await contract.connect(sender)

      await connection.publicSaleMint({ value: donation }).catch(spy1)
      expect(spy1).toHaveBeenCalled()
      await contract.setPublicSaleState(true)
      await connection.publicSaleMint({ value: donation }).catch(spy2)
      expect(spy2).not.toHaveBeenCalled()
    })
    it('assigns 2 tokens to sender per mint', async function () {
      const [owner, sender] = signers
      await contract.setPublicSaleState(true)
      await contract.connect(sender).publicSaleMint({ value: donation })
      const token0Owner = await contract.connect(sender).ownerOf(0)
      const token1Owner = await contract.connect(sender).ownerOf(1)
      expect(token0Owner).toEqual(sender.address)
      expect(token1Owner).toEqual(sender.address)
    })
    it('adds to address balance', async function () {})
  })

  describe('setBaseURI', () => {
    it('sets the token URI for future and past NFTs', async function () {
      const newBaseURI = 'https://newBaseURI.com/metadata/'
      const [_, sender] = signers
      await contract.setBaseURI(newBaseURI)
      await contract.setPublicSaleState(true)
      await contract.connect(sender).publicSaleMint({ value: donation })
      const token0Uri = await contract.connect(sender).tokenURI(0)
      expect(token0Uri).toBe('https://newBaseURI.com/metadata/0')

      const newerBaseURI = 'https://anEvenNewerBaseURI.com/metadata/'
      await contract.setBaseURI(newerBaseURI)
      const newToken0Uri = await contract.connect(sender).tokenURI(0)
      expect(newToken0Uri).toBe('https://anEvenNewerBaseURI.com/metadata/0')
    })
  })

  describe('withdraw', () => {
    beforeEach(async () => {
      await contract.setPublicSaleState(true)
      await contract.connect(signers[1]).publicSaleMint({ value: donation })
      // await contract.connect(signers[2]).publicSaleMint({ value: donation })
    })
    // it('adds to address balance', )

    // it('', async () => {

    // })

    xit('transfers the correct amount to owner address', async () => {
      const [owner] = signers
      const oldBalance = await owner.getBalance()
      await contract.withdraw()
      const newBalance = await owner.getBalance()

      expect(
        Number(ethers.utils.formatEther(newBalance)) -
          Number(ethers.utils.formatEther(oldBalance))
      ).toEqual(donation)
      // expect(newBalance.sub(oldBalance)).toEqual(donation)
    })
  })
})
