import axios from 'lib/axios'
import { ethers } from 'ethers'
import {
  NO_WHITELIST_TOKEN,
  BEFORE,
  AFTER,
  NEVER,
  PUBLIC,
  INCONSISTENT_CONTRACT_STATUS,
  PUBLIC_SALE,
  PRIVATE_SALE,
  REACHED_MESSAGE_LIMIT,
} from 'shared/constants'
import contractABI from 'artifacts/contracts/Elleverse.sol/Elleverse.json'
import { useState } from 'react'
import { Files, MintForm, MintResponseData } from 'shared/types'
import { uploadOneFile } from 'utils/helpers'
import { useWeb3Context } from 'context'
import { contractAddress, salePhase, emailTemplateIds } from 'utils/config'

export function useMint() {
  const { web3Provider, address, balance } = useWeb3Context()
  const [mintGasFee, setMintGasFee] = useState<string>('')
  const [atMsgTokenLimit, setAtMsgTokenLimit] = useState(false)

  const contract =
    web3Provider && contractAddress
      ? new ethers.Contract(
          contractAddress as string,
          contractABI.abi,
          web3Provider.getSigner()
        )
      : null

  const calcMintGasFee = async (): Promise<void> => {
    if (contract && web3Provider) {
      try {
        const mintMethod =
          // @ts-ignore
          salePhase === PUBLIC_SALE ? 'publicSaleMint' : 'privateSaleMint'
        const functionFee = await contract.estimateGas[mintMethod]({
          value: ethers.utils.parseEther((Number(balance) * 0.95).toString()),
        })
        const feeData = await web3Provider.getFeeData()
        const estGasFeeBN = feeData.maxFeePerGas?.mul(functionFee)
        estGasFeeBN && setMintGasFee(ethers.utils.formatEther(estGasFeeBN))
      } catch (error) {
        if (error?.data?.message?.search('exceed msg token limit') > -1) {
          setAtMsgTokenLimit(true)
          // send notifer emails to sean.
          axios.post('/api/mailer', {
            templateId: 'd-033f8971bd3646aabcf8103caa0c25f7',
            email: [
              'sean.ng@aax.com',
              'shonum@gmail.com',
              'sophie.hsu@aax.com',
              'sharon@accucrazy.com',
            ],
          })
        }
        setMintGasFee('')
      }
    }
  }

  // TODO: reset to blank values
  const [form, setForm] = useState<MintForm>({
    email: 'sean.ng@aax.com',
    message: 'Yo this is a test LOVE message. 愛愛愛',
    passcode: 'asdfasdf',
    minterName: 'Sean',
    receiverName: 'Patrick',
    donationInput: 0,
    donationInEth: 0,
  })

  const [files, setFiles] = useState<Files>({
    beforeOpenImage: null,
    beforeOpenHtml: null,
    afterOpenImage: null,
    afterOpenHtml: null,
    neverOpenedImage: null,
    neverOpenedHtml: null,
  })

  const [ethToNtd, setEthToNtd] = useState<number | null>(null)

  const calcEthToNtd = async (): Promise<void> => {
    const { data } = await axios.get(
      'https://api.coinbase.com/v2/exchange-rates?currency=ETH'
    )
    setEthToNtd(Number(data.data?.rates?.TWD))
  }

  const privateSaleMint = async (onMetamaskConfirm: () => void) => {
    const hasWhitelistToken = await contract?.callStatic.ownsWhitelistToken(
      address
    )
    if (!hasWhitelistToken) throw new Error(NO_WHITELIST_TOKEN)
    return executeMint(true, onMetamaskConfirm)
  }

  const publicSaleMint = (onMetamaskConfirm: () => void) =>
    executeMint(false, onMetamaskConfirm)

  const executeMint = async (
    isPrivateSale: boolean,
    onMetamaskConfirm: () => void
  ): Promise<MintResponseData> => {
    if (!contract) return
    const mintOpts = {
      value: ethers.utils.parseEther(form.donationInEth.toFixed(18)),
    }

    const mintMethod = isPrivateSale ? 'privateSaleMint' : 'publicSaleMint'
    const contractPhase = isPrivateSale ? 'PRIVATE SALE' : 'PUBLIC SALE'

    if (atMsgTokenLimit) throw new Error(REACHED_MESSAGE_LIMIT)
    const statusIsConsistent =
      (await contract['SALE_PHASE']()) === contractPhase
    if (!statusIsConsistent) throw new Error(INCONSISTENT_CONTRACT_STATUS)

    const tokenIdBN = await contract.callStatic[mintMethod](mintOpts)
    const messageTokenId = Number(tokenIdBN.toString())
    await contract[mintMethod](mintOpts)
    onMetamaskConfirm()

    await uploadOneFile(PUBLIC, `${messageTokenId}.png`, files.beforeOpenImage)
    await uploadOneFile(PUBLIC, `${messageTokenId}.html`, files.beforeOpenHtml)
    await uploadOneFile(BEFORE, `${messageTokenId}.png`, files.beforeOpenImage)
    await uploadOneFile(BEFORE, `${messageTokenId}.html`, files.beforeOpenHtml)
    await uploadOneFile(AFTER, `${messageTokenId}.png`, files.afterOpenImage)
    await uploadOneFile(AFTER, `${messageTokenId}.html`, files.afterOpenHtml)
    await uploadOneFile(NEVER, `${messageTokenId}.png`, files.neverOpenedImage)
    await uploadOneFile(NEVER, `${messageTokenId}.html`, files.neverOpenedHtml)

    const { PRIVATE_SALE_MINT, PUBLIC_SALE_MINT } = emailTemplateIds

    const { data: mintData } = await axios.post(`/api/message-tokens`, {
      emailTemplateId: isPrivateSale ? PRIVATE_SALE_MINT : PUBLIC_SALE_MINT,
      tokenId: messageTokenId,
      isPrivateSale,
      message: form.message,
      minterEmail: form.email,
      minterWallet: address,
      ethDonated: form.donationInEth.toString(),
      passcode: form.passcode,
    })

    await axios.post('/api/prize-tokens', {
      tokenId: messageTokenId + 1,
      minterEmail: form.email,
      minterWallet: address,
      isPrivateSale: salePhase === PRIVATE_SALE,
      ...(salePhase !== PRIVATE_SALE && { tokenName: 'Prize Token' }),
    })

    return mintData
  }

  return {
    privateSaleMint,
    publicSaleMint,
    calcEthToNtd,
    ethToNtd,
    form,
    setForm,
    setFiles,
    files,
    contract,
    calcMintGasFee,
    atMsgTokenLimit,
    mintGasFee,
  }
}
