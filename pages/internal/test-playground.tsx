import { NextPage } from 'next'

const TestPlayground: NextPage = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return <div>Internal Only. Pls view page on Staging Site.</div>
  }

  return (
    <div>
      <button className="text-black bg-lemon shadow-pixel-active-sm md:shadow-pixel-active-lg">
        開始抽獎！
      </button>
    </div>
  )
}

export default TestPlayground
