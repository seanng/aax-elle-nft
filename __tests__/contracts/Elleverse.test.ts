/*
 * @jest-environment node
 */
import { ethers, waffle } from 'hardhat'

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
  describe('setTreasury', () => {
    test('treasury should transfer to new address', async function () {
      const [owner, newTreasurer] = signers
      expect(await contract.treasury()).toEqual(owner.address)
      await contract.setTreasury(newTreasurer.address)
      expect(await contract.treasury()).toEqual(newTreasurer.address)
    })
  })

  describe('publicSaleMint', () => {
    it('can only mint during public sale phase', async function () {
      const [, sender] = signers
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
      const [, sender] = signers
      await contract.setPublicSaleState(true)
      await contract.connect(sender).publicSaleMint({ value: donation })
      const token0Owner = await contract.connect(sender).ownerOf(0)
      const token1Owner = await contract.connect(sender).ownerOf(1)
      expect(token0Owner).toEqual(sender.address)
      expect(token1Owner).toEqual(sender.address)
    })
    it('adds to address balance', async function () {
      const provider = waffle.provider
      const oldContractBalance = ethers.utils.formatEther(
        await provider.getBalance(contract.address)
      )
      expect(Number(oldContractBalance)).toEqual(0)
      await contract.setPublicSaleState(true)
      await contract.connect(signers[1]).publicSaleMint({ value: donation })
      const newContractBalance = ethers.utils.formatEther(
        await provider.getBalance(contract.address)
      )
      expect(Number(newContractBalance)).toEqual(0.1)
    })
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

  describe('airdrop', () => {
    it('transfers tokens to wallets in correct order', async function () {
      const [, sender1, sender2, sender3, sender4] = signers
      await contract.airdrop([
        sender1.address,
        sender2.address,
        sender3.address,
        sender4.address,
      ])
      const token0Owner = await contract.ownerOf(0)
      const token1Owner = await contract.ownerOf(1)
      const token2Owner = await contract.ownerOf(2)
      const token3Owner = await contract.ownerOf(3)
      const token4Owner = await contract.ownerOf(4)
      const token5Owner = await contract.ownerOf(5)
      const token6Owner = await contract.ownerOf(6)
      const token7Owner = await contract.ownerOf(7)
      expect(token0Owner).toEqual(sender1.address)
      expect(token1Owner).toEqual(sender1.address)
      expect(token2Owner).toEqual(sender2.address)
      expect(token3Owner).toEqual(sender2.address)
      expect(token4Owner).toEqual(sender3.address)
      expect(token5Owner).toEqual(sender3.address)
      expect(token6Owner).toEqual(sender4.address)
      expect(token7Owner).toEqual(sender4.address)
    })
  })

  describe('withdraw', () => {
    beforeEach(async () => {
      await contract.setPublicSaleState(true)
      await contract.connect(signers[1]).publicSaleMint({ value: donation })
    })
    it('withdraws all money from address balance', async () => {
      const provider = waffle.provider
      const oldContractBalance = ethers.utils.formatEther(
        await provider.getBalance(contract.address)
      )
      expect(Number(oldContractBalance)).toEqual(0.1)
      await contract.withdraw()
      const newContractBalance = ethers.utils.formatEther(
        await provider.getBalance(contract.address)
      )
      expect(Number(newContractBalance)).toEqual(0)
    })
    it('transfers the correct amount to owner address', async () => {
      const [owner] = signers
      const oldBalance = await owner.getBalance()
      await contract.withdraw()
      const newBalance = await owner.getBalance()
      const diffInEth = Number(
        ethers.utils.formatEther(newBalance.sub(oldBalance))
      )
      // Expect GAS to be paid during withdraw function.
      expect(diffInEth).toBeLessThan(0.1)
      expect(diffInEth).toBeGreaterThan(0.099)
    })
  })
})
