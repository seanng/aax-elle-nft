import { useState } from 'react'
import axios from 'lib/axios'
import { ethers } from 'ethers'
import { NO_WHITELIST_TOKEN, OPENED, UNOPENED, PUBLIC } from 'shared/constants'

export function useMint(contract: ethers.Contract | void) {
  const [form, setForm] = useState({
    email: '',
    message: '',
    passcode: '',
    donation: '',
  })

  const preSaleMint = async () => {
    const hasWhitelistToken = await contract?.ownsWhitelistToken(
      contract.address
    )
    if (!hasWhitelistToken) throw new Error(NO_WHITELIST_TOKEN)
    await executeMint(true)
  }

  const publicSaleMint = () => executeMint(false)

  const executeMint = async (isPresale: boolean) => {
    if (!contract) return
    // TODO: delete.
    const form = {
      message: 'Yo this is a test LOVE message. 愛愛愛',
      donation: '0.5',
      email: 'sean.ng@aax.com',
      passcode: 'asdfasdf',
    }

    const mintOpts = { value: ethers.utils.parseEther(form.donation) }

    const mintMethod = isPresale ? 'preSaleMint' : 'publicSaleMint'

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
      ethDonated: form.donation,
      passcode: form.passcode,
    })
  }

  const uploadOneFile = async (folder: string, key: string, file: string) => {
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
    setForm,
  }
}
