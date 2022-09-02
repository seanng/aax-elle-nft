import { Mint } from '@prisma/client'
import {
  ErrorScreen,
  GreenLockIcon,
  FormErrorIcon,
  MintLayout,
  ResponsivePrimaryButton,
  GreenUnlockIcon,
  SocialButtons,
  OutlinedHeading,
  SpinningOverlay,
  ToastMessage,
} from 'components'
import axios from 'lib/axios'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { S3_BASE_URL } from 'shared/constants'

interface Props {
  slugExists: boolean
  data: Mint
}

const OpenPage: NextPage<Props> = ({ slugExists, data }) => {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isOpened, setIsOpened] = useState(!!data?.openedAt)

  const handleInputChange = (e) => {
    if (errorMsg) setErrorMsg('')
    const { value } = e.target
    setInputValue(value)
  }

  const handleDLClick = () => {
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.href = `${S3_BASE_URL}/public/${data.messageTokenId}.png`
    a.download = 'My_Secret.png'
    a.click()
    toast.success(
      <ToastMessage heading="成功下載告白圖片" body="請至手機相簿瀏覽" />
    )
    document.body.removeChild(a)
  }

  const handleIGClick = () => {
    // Open a new NextJS Page (_target=blank) that renders the IG image + instructions.
    // Page must instruct the user how to save the image to his/her phone.
    // For instance on iOS, user must hold down the image in order to save photo to phone.
    // Page can have a button that directs the user to instagram://story-camera (see: https://stackoverflow.com/a/65893635) photo is saved.
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (inputValue === '') return
    setIsLoading(true)
    const passcode = inputValue

    try {
      await axios.post(`/api/mints/${data.id}`, { passcode })

      // TODO: Update S3 public folder (from here or backend?)

      // Update UI on this page.
      setIsOpened(true)
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMsg('密碼不對')
      }
      if (error.response.status === 500) {
        setErrorMsg('Server error.')
      }
    } finally {
      setInputValue('')
      setIsLoading(false)
    }
  }

  if (!slugExists) {
    return <ErrorScreen />
  }

  return (
    <>
      <MintLayout className="flex flex-col items-center">
        {isOpened ? (
          <div className="w-80 flex flex-col items-center pt-5">
            <GreenUnlockIcon className="mb-3" />
            <OutlinedHeading>解鎖秘密告白</OutlinedHeading>
            <p className="my-3 text-center w-[275px] md:mb-7 md:text-xl leading-150% tracking-wide">
              秘密 Impact NFT 已被解開
            </p>
            <iframe
              height={350}
              width={350}
              src={`${S3_BASE_URL}/public/${data.messageTokenId}.html?b`}
              className="mb-6 md:mb-10"
            />
            <Link href="/mint">
              <a>
                <ResponsivePrimaryButton type="button">
                  我也要告白
                </ResponsivePrimaryButton>
              </a>
            </Link>
          </div>
        ) : (
          <div className="w-80 flex flex-col items-center pt-5">
            <GreenLockIcon height={50} width={50} className="mb-3" />
            <OutlinedHeading>解鎖秘密告白</OutlinedHeading>
            <p className="my-3 md:mt-4 md:mb-7 text-center md:text-2xl w-[275px] leading-150% tracking-wide">
              輸入密碼解鎖秘密！
            </p>
            <iframe
              height={350}
              width={350}
              src={`${S3_BASE_URL}/public/${data.messageTokenId}.html?a`}
              className="mb-6 md:mb-10"
            />
            <form onSubmit={handleSubmit} className="text-center w-full">
              <input
                id="passcode"
                name="passcode"
                placeholder="輸入專屬密碼"
                type="text"
                value={inputValue}
                className="text-black border-lime w-full font-mono placeholder-slate-500 bg-lime border-transparent focus:border-transparent focus:ring-0 md:p-4 md:text-lg"
                onChange={handleInputChange}
              />
              {errorMsg && (
                <div className="w-full flex items-center mt-3">
                  <FormErrorIcon />
                  <span className="ml-2 text-sm">{errorMsg}</span>
                </div>
              )}
              <ResponsivePrimaryButton
                className="mx-auto mt-5 md:mt-12 mb-10"
                disabled={inputValue === ''}
                type="submit"
              >
                解鎖
              </ResponsivePrimaryButton>
            </form>
          </div>
        )}
      </MintLayout>
      <SpinningOverlay isLoading={isLoading} />
    </>
  )
}

export default OpenPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = { slugExists: false, data: {} }
  try {
    const slug = context?.params?.slug
    if (!slug) throw new Error()
    const { data: response } = (await axios.get(`/api/mints?slug=${slug}`)) as {
      data: Mint[]
    }

    if (response.length === 0) throw new Error()
    props.data = response[0]
    props.slugExists = true
    return { props }
  } catch (error) {
    console.log('error: ', error)
    return { props }
  }
}
