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
} from 'shared/constants'
import contractABI from 'artifacts/contracts/Elleverse.sol/Elleverse.json'
import { useState } from 'react'
import { Files, MintForm, MintResponseData } from 'shared/types'
import { useWeb3Context } from 'context'
import { saleStatus } from 'utils/config'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export function useMint() {
  const { web3Provider } = useWeb3Context()
  const [mintGasFee, setMintGasFee] = useState<string>('')

  const contract = web3Provider
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
          saleStatus === PUBLIC_SALE ? 'publicSaleMint' : 'preSaleMint'
        const functionFee = await contract.estimateGas[mintMethod]({
          value: ethers.utils.parseEther('0.1'),
        })
        const feeData = await web3Provider.getFeeData()
        const estGasFeeBN = feeData.maxFeePerGas?.mul(functionFee)
        estGasFeeBN && setMintGasFee(ethers.utils.formatEther(estGasFeeBN))
      } catch (error) {
        console.log('error calculating gas fee: ', error)
        setMintGasFee('')
      }
    }
  }

  // TODO: reset to blank values
  const [form, setForm] = useState<MintForm>({
    email: 'sean.ng@aax.com',
    message: 'Yo this is a test LOVE message. 愛愛愛',
    passcode: 'asdfasdf',
    senderName: 'Sean',
    receiverName: 'Patrick',
    mintedAt: new Date(),
    donationInput: 0,
    donationInEth: 0,
  })

  const [files, setFiles] = useState<Files>({
    beforeOpenImage: null,
    beforeOpenHtml: null,
    beforeOpenPreview: null,
    beforeOpenDataURL: null,
    afterOpenImage: null,
    afterOpenHtml: null,
    afterOpenPreview: null,
    afterOpenDataURL: null,
    neverOpenedImage: null,
    neverOpenedHtml: null,
    neverOpenedPreview: null,
    neverOpenedDataURL: null,
  })

  const [ethToNtd, setEthToNtd] = useState<number | null>(null)

  const calcEthToNtd = async (): Promise<void> => {
    const { data } = await axios.get(
      'https://api.coinbase.com/v2/exchange-rates?currency=ETH'
    )
    setEthToNtd(Number(data.data?.rates?.TWD))
  }

  const preSaleMint = async () => {
    const hasWhitelistToken = await contract?.callStatic.ownsWhitelistToken(
      contract.address
    )
    if (!hasWhitelistToken) throw new Error(NO_WHITELIST_TOKEN)
    return executeMint(true)
  }

  const publicSaleMint = () => executeMint(false)

  const executeMint = async (isPresale: boolean): Promise<MintResponseData> => {
    if (!contract) return
    const mintOpts = {
      value: ethers.utils.parseEther(form.donationInEth.toString()),
    }

    const mintMethod = isPresale ? 'preSaleMint' : 'publicSaleMint'
    const contractStatusMethod = isPresale ? 'isPreSale' : 'isPublicSale'

    const statusIsConsistent = await contract[contractStatusMethod]()
    if (!statusIsConsistent) throw new Error(INCONSISTENT_CONTRACT_STATUS)

    const tokenIdBN = await contract.callStatic[mintMethod](mintOpts)
    const messageTokenId = Number(tokenIdBN.toString())
    await contract[mintMethod](mintOpts)

    // TODO: Upload images & HTMLs to S3
    await uploadOneFile(PUBLIC, `${messageTokenId}.png`, files.beforeOpenImage)
    await uploadOneFile(PUBLIC, `${messageTokenId}.html`, files.beforeOpenHtml)
    await uploadOneFile(BEFORE, `${messageTokenId}.png`, files.beforeOpenImage)
    await uploadOneFile(BEFORE, `${messageTokenId}.html`, files.beforeOpenHtml)
    await uploadOneFile(AFTER, `${messageTokenId}.png`, files.afterOpenImage)
    await uploadOneFile(AFTER, `${messageTokenId}.html`, files.afterOpenHtml)
    await uploadOneFile(NEVER, `${messageTokenId}.png`, files.neverOpenedImage)
    await uploadOneFile(NEVER, `${messageTokenId}.html`, files.neverOpenedHtml)

    const { data: mintData } = await axios.post(`/api/mints`, {
      messageTokenId,
      isPresale,
      message: form.message,
      minterEmail: form.email,
      minterWallet: contract.address,
      ethDonated: form.donationInEth.toString(),
      passcode: form.passcode,
      mintedAt: new Date(),
    })

    return mintData
  }

  const uploadOneFile = async (
    folder: string,
    key: string,
    file: File | null
  ) => {
    if (!file) throw new Error('No File in uploadOneFile')
    // Get presigned post fields
    const res = await fetch(
      `/api/upload-encrypted-images-url?file=${folder}/${key}`
    )
    const { url, fields } = await res.json()
    const formData = new FormData()

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    // Upload to S3.
    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    if (!upload.ok) {
      // WHAT DO WE DO IF THE UPLOAD FAILS!? >_<
    }
  }

  return {
    preSaleMint,
    publicSaleMint,
    calcEthToNtd,
    ethToNtd,
    form,
    setForm,
    setFiles,
    files,
    contract,
    calcMintGasFee,
    mintGasFee,
  }
}
