import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Web3Button } from 'components'

const Home: NextPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Web3 Next-Boilerplate Mono</title>
        <meta name="description" content="Boilerplate for Web3 dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex flex-row justify-between p-4">
        <Web3Button />
      </nav>
    </div>
  )
}

export default Home
