import type { ReactNode } from 'react'
import { LayoutHeader } from 'components'
import { ToastContainer } from 'react-toastify'

type Props = {
  children?: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <LayoutHeader />
      <main className="h-full">{children}</main>
      <ToastContainer
        hideProgressBar
        position="bottom-right"
        autoClose={2000}
      />
    </div>
  )
}
