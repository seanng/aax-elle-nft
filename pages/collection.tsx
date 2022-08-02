import { MintNavigation } from 'components'
import type { NextPage } from 'next'

const CollectionPage: NextPage = () => {
  return (
    <>
      <MintNavigation />
      <div className="bg-white min-h-screen pt-16 text-black">
        <div className="flex flex-col items-center">
          <h1 className="font-mono text-xl">My Secrets</h1>
        </div>
      </div>
    </>
  )
}

export default CollectionPage
