import {
  ErrorScreen,
  GreenLockIcon,
  MintLayout,
  PrimaryButton,
} from 'components'
import axios from 'lib/axios'
import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'

interface Props {
  slugExists: boolean
  data: any
}

const OpenPage: NextPage<Props> = ({ slugExists, data }) => {
  const [inputValue, setInputValue] = useState('')
  const [isOpened, setIsOpened] = useState(!!data?.openedAt)

  const handleInputChange = (e) => {
    const { value } = e.target
    setInputValue(value)
  }

  const handleSubmit = async () => {
    if (inputValue === '') return
    // Update S3 public folder (from here or backend?)

    // Update API with openedAt.
    await axios.put(`/api/mints/${data.id}`, { openedAt: new Date() })

    // Update UI on this page.
    setIsOpened(true)
  }

  if (!slugExists) {
    return <ErrorScreen />
  }

  return (
    <MintLayout>
      {isOpened ? (
        <div>isopened.</div>
      ) : (
        <div className="w-80 flex flex-col items-center pt-5">
          <GreenLockIcon height={50} width={50} />
          <p className="my-5 text-center w-[275px] leading-150%">
            你收到來自Demi More的秘密告白NFT，輸入密碼解鎖秘密！
          </p>
          <form onSubmit={handleSubmit} className="text-center">
            <input
              id="passcode"
              name="passcode"
              placeholder="輸入專屬密碼"
              type="text"
              className="text-black border-lime w-full mb-5 font-mono placeholder-slate-500 bg-lime border-transparent focus:border-transparent focus:ring-0"
              onChange={handleInputChange}
            />
            <PrimaryButton
              className="mx-auto"
              disabled={inputValue === ''}
              type="submit"
            >
              解鎖
            </PrimaryButton>
          </form>
        </div>
      )}
    </MintLayout>
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
