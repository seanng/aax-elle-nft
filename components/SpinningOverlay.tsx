import React from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'

export function SpinningOverlay({ isLoading }) {
  return (
    <Transition
      show={isLoading}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed top-0 right-0 left-0 bottom-0 w-full h-screen z-50 bg-black-rgba-70 backdrop-blur-sm flex flex-col items-center justify-center">
        <Image
          src="/images/loading-icon.gif"
          layout="fixed"
          height={104}
          width={104}
        />
      </div>
    </Transition>
  )
}
