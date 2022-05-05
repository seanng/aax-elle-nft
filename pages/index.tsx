import type { NextPage } from 'next'
import { Web3Button } from 'components'
import SEO from 'components/SEO'

const Home: NextPage = () => {
  return (
    <>
      <SEO />
      <div className="flex h-screen flex-col">
        <nav className="flex flex-row justify-between p-4">
          <Web3Button />
        </nav>
      </div>
    </>
  )
}

export default Home
