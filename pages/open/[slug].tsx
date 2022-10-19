import { MessageToken } from '@prisma/client'
import {
  ErrorScreen,
  GreenLockIcon,
  FormErrorIcon,
  PrimaryButton,
  GreenUnlockIcon,
  OutlinedHeading,
  SpinningOverlay,
  SecondaryButton,
  SquareShareButton,
  WarningIcon,
} from 'components'
import axios from 'lib/axios'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { FINISHED } from 'shared/constants'
import { salePhase, s3BaseUrl } from 'utils/config'

interface Props {
  slugExists: boolean
  data: MessageToken
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
      await axios.post(`/api/message-tokens/${data.id}`, { passcode })

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
      <div
        className="bg-black min-h-screen pt-navbar-height pb-10 md:pb-20 text-white bg-repeat flex flex-col items-center overflow-x-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(85, 242, 99, 0.3) 0.1px, transparent 1px), linear-gradient(to bottom, rgba(85, 242, 99, 0.3) 0.1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        {isOpened ? (
          <div className="flex flex-col items-center pt-5 w-full text-center">
            <GreenUnlockIcon className="mb-3 md:mb-7" />
            <OutlinedHeading className="mb-16 md:mb-20">
              告白已解開
            </OutlinedHeading>
            <div className="flex flex-col mb-20 md:mb-28 w-full items-center">
              <iframe
                src={`${s3BaseUrl}/public/${data.tokenId}.html?b`}
                className="mb-6 md:mb-10 scale-100 md:scale-[1.5] h-[350px] w-[350px] md:h-[525px] md:w-[525px] origin-top-left max-w-full"
              />
            </div>
            <div className="flex items-start">
              <div className="mr-4 md:mr-8">
                <Link href="/" passHref>
                  <a target="__blank">
                    <SecondaryButton type="button">體驗鑄造</SecondaryButton>
                  </a>
                </Link>
              </div>
              <Link href={`/ig-share?id=${data.tokenId}&lol`} passHref>
                <a target="__blank">
                  <SquareShareButton />
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-80 flex flex-col items-center pt-5">
            {salePhase === FINISHED && (
              <div className="bg-orange p-4 flex text-white space-x-4 mb-8 items-center">
                <WarningIcon color="white" width={32} height={32} />
                <p className="font-medium md:text-xl">活動已結束</p>
              </div>
            )}
            <GreenLockIcon height={50} width={50} className="mb-3" />
            <OutlinedHeading>解鎖秘密告白</OutlinedHeading>
            <iframe
              height={350}
              width={350}
              src={`${s3BaseUrl}/public/${data.tokenId}.html?a`}
              className="mb-6 mt-5 md:mt-8 md:mb-10"
            />
            {salePhase !== FINISHED && (
              <form onSubmit={handleSubmit} className="text-center w-full">
                <input
                  id="passcode"
                  name="passcode"
                  placeholder="輸入密碼解鎖秘密"
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
                <div className="mx-auto mt-5 md:mt-12 mb-10">
                  <PrimaryButton disabled={inputValue === ''} type="submit">
                    解鎖
                  </PrimaryButton>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
      {isLoading && <SpinningOverlay />}
    </>
  )
}

export default OpenPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = { slugExists: false, data: {} }
  try {
    const slug = context?.params?.slug
    if (!slug) throw new Error()
    const { data: response } = (await axios.get(
      `/api/message-tokens?slug=${slug}`
    )) as {
      data: MessageToken[]
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
