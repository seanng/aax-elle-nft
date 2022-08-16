import axios from 'lib/axios'
import { ethers } from 'ethers'
import {
  NO_WHITELIST_TOKEN,
  OPENED,
  UNOPENED,
  PUBLIC,
  INCONSISTENT_CONTRACT_STATUS,
} from 'shared/constants'
import { useState } from 'react'
import { Files, MintForm, MintResponseData } from 'shared/types'

export function useMint(contract: ethers.Contract | null) {
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
    unopenedImage: null,
    unopenedHtml: null,
    openedImage: null,
    openedHtml: null,
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
    // await uploadOneFile(OPENED, `${messageTokenId}.png`)
    // await uploadOneFile(OPENED, `${messageTokenId}.html`)
    // await uploadOneFile(UNOPENED, `${messageTokenId}.png`)
    // await uploadOneFile(UNOPENED, `${messageTokenId}.html`)
    // await uploadOneFile(PUBLIC, `${messageTokenId}.png`)
    // await uploadOneFile(PUBLIC, `${messageTokenId}.html`)

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

  const uploadOneFile = async (folder: string, key: string, file: File) => {
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
  }
}
