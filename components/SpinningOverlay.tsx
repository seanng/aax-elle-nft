import React from 'react'
import Image from 'next/image'

export function SpinningOverlay() {
  return (
    <div
      className="fixed top-0 right-0 left-0 bottom-0 w-full h-screen z-50 bg-black-rgba-70 backdrop-blur-sm flex flex-col items-center justify-center"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Image
        src="/images/loading-icon.gif"
        layout="fixed"
        height={104}
        width={104}
      />
    </div>
  )
}
