import type { NextPage } from 'next'
import { FaqSection, EncryptDialog, Layout } from 'components'
import { useState } from 'react'

const HomePage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Layout>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-24 bg-gray-100 min-h-screen">
        <HeroSection />
        <FaqSection />
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          onClick={() => setIsOpen(true)}
        >
          open modal
        </button>
        <EncryptDialog setOpen={setIsOpen} open={isOpen} />
      </div>
    </Layout>
  )
}

function HeroSection() {
  return <div className="min-w-screen w-full lg:block h-screen">yo.</div>
}

export default HomePage
