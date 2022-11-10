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

  describe('publicSaleMint', () => {
    it('can only mint during public sale phase', async function () {
      const [, sender] = signers
      const spy1 = jest.fn()
      const spy2 = jest.fn()
      const connection = await contract.connect(sender)

      await connection.publicSaleMint({ value: donation }).catch(spy1)
      expect(spy1).toHaveBeenCalled()
      await contract.setPublicSalePhase()
      await connection.publicSaleMint({ value: donation }).catch(spy2)
      expect(spy2).not.toHaveBeenCalled()
    })
    it('assigns 2 tokens to sender per mint', async function () {
      const [, sender] = signers
      await contract.setPublicSalePhase()
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
      await contract.setPublicSalePhase()
      await contract.connect(signers[1]).publicSaleMint({ value: donation })
      const newContractBalance = ethers.utils.formatEther(
        await provider.getBalance(contract.address)
      )
      expect(Number(newContractBalance)).toEqual(0.1)
    })
    it('cannot mint if exceeds message token limit', async function () {
      const errorCallback1 = jest.fn()
      const errorCallback2 = jest.fn()
      const errorCallback3 = jest.fn()
      const errorCallback4 = jest.fn()
      await contract.setPublicSalePhase()
      await contract.setMsgTokenLimit(3)
      await contract
        .connect(signers[1])
        .publicSaleMint({ value: donation })
        .catch(errorCallback1)
      await contract
        .connect(signers[2])
        .publicSaleMint({ value: donation })
        .catch(errorCallback2)
      await contract
        .connect(signers[3])
        .publicSaleMint({ value: donation })
        .catch(errorCallback3)
      await contract
        .connect(signers[4])
        .publicSaleMint({ value: donation })
        .catch(errorCallback4)

      expect(errorCallback1).not.toHaveBeenCalled()
      expect(errorCallback2).not.toHaveBeenCalled()
      expect(errorCallback3).not.toHaveBeenCalled()
      expect(errorCallback4).toHaveBeenCalled()
    })
  })

  describe('setBaseURI', () => {
    it('sets the token URI for future and past NFTs', async function () {
      const newBaseURI = 'https://newBaseURI.com/metadata/'
      const [_, sender] = signers
      await contract.setBaseURI(newBaseURI)
      await contract.setPublicSalePhase()
      await contract.connect(sender).publicSaleMint({ value: donation })
      const token0Uri = await contract.connect(sender).tokenURI(0)
      expect(token0Uri).toBe('https://newBaseURI.com/metadata/0')

      const newerBaseURI = 'https://anEvenNewerBaseURI.com/metadata/'
      await contract.setBaseURI(newerBaseURI)
      const newToken0Uri = await contract.connect(sender).tokenURI(0)
      expect(newToken0Uri).toBe('https://anEvenNewerBaseURI.com/metadata/0')
    })
  })

  describe('airdropBothTokens', () => {
    it('transfers tokens to wallets in correct order', async function () {
      const [, sender1, sender2, sender3, sender4] = signers
      await contract.airdropBothTokens([
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

    it('can airdrop if not reached message token limit', async function () {
      const errorCallback = jest.fn()
      await contract.setMsgTokenLimit(3)
      await contract
        .airdropBothTokens([signers[1].address, signers[2].address])
        .catch(errorCallback)

      expect(errorCallback).not.toHaveBeenCalled()

      const token0Owner = await contract.ownerOf(0)
      const token1Owner = await contract.ownerOf(1)
      const token2Owner = await contract.ownerOf(2)
      const token3Owner = await contract.ownerOf(3)
      expect(token0Owner).toEqual(signers[1].address)
      expect(token1Owner).toEqual(signers[1].address)
      expect(token2Owner).toEqual(signers[2].address)
      expect(token3Owner).toEqual(signers[2].address)
    })

    it('cannot airdrop if exceeds message token limit', async function () {
      const errorCallback = jest.fn()
      const [, sender1, sender2, sender3, sender4] = signers
      await contract.setMsgTokenLimit(3)
      await contract
        .airdropBothTokens([
          sender1.address,
          sender2.address,
          sender3.address,
          sender4.address,
        ])
        .catch(errorCallback)
      expect(errorCallback).toHaveBeenCalled()
    })
  })

  describe('ownsWhitelistToken', () => {
    beforeEach(async () => {
      const [, sender1, __, sender3] = signers
      await contract.airdropBothTokens([sender1.address, sender3.address])
    })

    it('returns correct boolean if user owns whitelist token', async function () {
      const [, sender1, sender2, sender3] = signers
      expect(await contract.ownsWhitelistToken(sender1.address)).toBe(true)
      expect(await contract.ownsWhitelistToken(sender2.address)).toBe(false)
      expect(await contract.ownsWhitelistToken(sender3.address)).toBe(true)
    })
    it('returns correct boolean after user transfers whitelist token', async function () {
      const [, sender1, sender2] = signers
      expect(await contract.ownsWhitelistToken(sender1.address)).toBe(true)
      expect(await contract.ownsWhitelistToken(sender2.address)).toBe(false)

      await contract
        .connect(sender1)
        ['safeTransferFrom(address,address,uint256)'](
          sender1.address,
          sender2.address,
          1
        )
      expect(await contract.ownsWhitelistToken(sender1.address)).toBe(false)
      expect(await contract.ownsWhitelistToken(sender2.address)).toBe(true)
    })
  })

  describe('withdraw', () => {
    beforeEach(async () => {
      await contract.setPublicSalePhase()
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

  describe('setTreasury', () => {
    test('setTreasury should set the correct treasury account', async function () {
      const [owner, newTreasurer] = signers
      expect(await contract.treasury()).toEqual(owner.address)
      await contract.setTreasury(newTreasurer.address)
      expect(await contract.treasury()).toEqual(newTreasurer.address)
    })
    it('withdraws to the new treasury address', async function () {
      const [owner, minter, treasurer] = signers
      await contract.setPublicSalePhase()
      await contract.connect(minter).publicSaleMint({ value: donation })

      expect(await contract.treasury()).toEqual(owner.address)

      // Set treasurer as treasury
      await contract.setTreasury(treasurer.address)

      const oldTreasurerBalance = await treasurer.getBalance()
      const oldOwnerBalance = await owner.getBalance()

      // It is the owner that is calling the withdraw function.
      await contract.withdraw()
      const newTreasurerBalance = await treasurer.getBalance()
      const newOwnerBalance = await owner.getBalance()

      const ownerDiffInEth = Number(
        ethers.utils.formatEther(newOwnerBalance.sub(oldOwnerBalance))
      )

      const treasurerDiffInEth = Number(
        ethers.utils.formatEther(newTreasurerBalance.sub(oldTreasurerBalance))
      )

      // owner balance should be the diff in gas fee.
      expect(ownerDiffInEth).toBeLessThan(0)
      expect(treasurerDiffInEth).toEqual(0.1)
    })
  })

  describe('tokensOfOwner', () => {
    beforeEach(async () => {
      const [, sender1, __, sender3] = signers
      await contract.airdropBothTokens([sender1.address, sender3.address])
    })
    it('returns the correct ownership data on query', async () => {
      const [, sender1, sender2, sender3] = signers
      const tokensOfSender1 = await contract.tokensOfOwner(sender1.address)
      const tokensOfSender2 = await contract.tokensOfOwner(sender2.address)
      const tokensOfSender3 = await contract.tokensOfOwner(sender3.address)
      expect(tokensOfSender1.map((bn) => bn.toNumber())).toEqual([0, 1])
      expect(tokensOfSender2.map((bn) => bn.toNumber())).toEqual([])
      expect(tokensOfSender3.map((bn) => bn.toNumber())).toEqual([2, 3])
    })
  })

  describe('airdropWhitelistTokens', () => {
    beforeEach(async () => {
      await contract.setNotStartedPhase()
      const [, sender1, sender2, sender3, sender4] = signers
      await contract.airdropWhitelistTokens([
        sender1.address,
        sender2.address,
        sender3.address,
        sender4.address,
      ])
    })

    it('transfers tokens to wallets in correct order', async function () {
      const [, sender1, sender2, sender3, sender4] = signers
      const token1Owner = await contract.ownerOf(1)
      const token3Owner = await contract.ownerOf(3)
      const token5Owner = await contract.ownerOf(5)
      const token7Owner = await contract.ownerOf(7)
      expect(token1Owner).toEqual(sender1.address)
      expect(token3Owner).toEqual(sender2.address)
      expect(token5Owner).toEqual(sender3.address)
      expect(token7Owner).toEqual(sender4.address)
    })

    it('only issues 1 token to sender', async function () {
      const [, _, sender2] = signers
      const tokensOfSender2 = await contract.tokensOfOwner(sender2.address)
      expect(tokensOfSender2.map((bn) => bn.toNumber())).toEqual([3])
    })
  })

  describe('burnMultiple', () => {
    beforeEach(async () => {
      const [, sender1, sender2, sender3, sender4] = signers
      await contract.airdropBothTokens([
        sender1.address,
        sender2.address,
        sender3.address,
        sender4.address,
      ])
      await contract.setEventOverPhase()
    })

    it('burns the correct tokens at once.', async function () {
      const preBurnErrorCallback = jest.fn()
      const postBurnErrorCallback = jest.fn()
      const notBurnedTokenErrorCallback = jest.fn()
      const tokenIdsToBurn = [1, 5]
      await contract.ownerOf(1).catch(preBurnErrorCallback)
      await contract.burnMultiple(tokenIdsToBurn)
      await contract.ownerOf(1).catch(postBurnErrorCallback) // throws after burning.
      await contract.ownerOf(3).catch(notBurnedTokenErrorCallback) // throws after burning.
      expect(notBurnedTokenErrorCallback).not.toHaveBeenCalled()
      expect(preBurnErrorCallback).not.toHaveBeenCalled()
      expect(postBurnErrorCallback).toHaveBeenCalled()
    })

    it('allows to check whitelist after burn', async function () {
      const tokenIdsToBurn = [1]
      const [, sender1, sender2, sender3, sender4] = signers
      await contract.burnMultiple(tokenIdsToBurn)
      await contract.setPrivateSalePhase()
      const owns = await contract.ownsWhitelistToken(sender3.address)
      expect(owns).toBe(true)
    })
  })

  describe('getNextTokenId', () => {
    it('correctly returns the next token id', async function () {
      const nextTokenId = await contract.getNextTokenId()
      expect(nextTokenId.toNumber()).toBe(0)
    })

    it('is not callable by non-contract owners', async function () {
      const nonOwnerErrorCB = jest.fn()
      const ownerErrorCB = jest.fn()
      const [owner, nonOwner] = signers

      await contract.connect(owner).getNextTokenId().catch(ownerErrorCB)
      await contract.connect(nonOwner).getNextTokenId().catch(nonOwnerErrorCB)

      expect(ownerErrorCB).not.toHaveBeenCalled()
      expect(nonOwnerErrorCB).toHaveBeenCalled()
    })
  })
})
