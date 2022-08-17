import {
  ErrorScreen,
  GreenLockIcon,
  FormErrorIcon,
  MintLayout,
  PrimaryButton,
  GreenUnlockIcon,
  SocialButtons,
  FormHeading,
  SpinningOverlay,
} from 'components'
import axios from 'lib/axios'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
  slugExists: boolean
  data: any
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
            <FormHeading>解鎖秘密告白</FormHeading>
            <p className="my-3 text-center w-[275px] leading-150% tracking-wide">
              秘密 Impact NFT 已被解開
            </p>
            <SocialButtons />
            <Link href="/mint">
              <a>
                <PrimaryButton type="button">我也要告白</PrimaryButton>
              </a>
            </Link>
          </div>
        ) : (
          <div className="w-80 flex flex-col items-center pt-5">
            <GreenLockIcon height={50} width={50} className="mb-3" />
            <FormHeading>解鎖秘密告白</FormHeading>
            <p className="my-3 text-center w-[275px] leading-150% tracking-wide">
              你收到來自Demi More的秘密告白NFT，輸入密碼解鎖秘密！
            </p>
            <form onSubmit={handleSubmit} className="text-center w-full">
              <input
                id="passcode"
                name="passcode"
                placeholder="輸入專屬密碼"
                type="text"
                value={inputValue}
                className="text-black border-lime w-full font-mono placeholder-slate-500 bg-lime border-transparent focus:border-transparent focus:ring-0"
                onChange={handleInputChange}
              />
              {errorMsg && (
                <div className="w-full flex items-center mt-3">
                  <FormErrorIcon />
                  <span className="ml-2 text-sm">{errorMsg}</span>
                </div>
              )}
              <PrimaryButton
                className="mx-auto mt-5"
                disabled={inputValue === ''}
                type="submit"
              >
                解鎖
              </PrimaryButton>
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
    const { data } = await axios.get(`/api/mints?slug=${slug}`)

    if (data.length === 0) throw new Error()

    props.data = data[0]
    props.slugExists = true
    return { props }
  } catch (error) {
    console.log('error: ', error)
    return { props }
  }
}
