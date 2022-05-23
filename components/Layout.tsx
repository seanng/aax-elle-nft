import type { ReactNode } from 'react'
import { LayoutHeader, LayoutFooter } from 'components'
import { ToastContainer } from 'react-toastify'

type Props = {
  children?: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <div className="flex flex-col">
      <LayoutHeader />
      <main className="flex-grow">{children}</main>
      <LayoutFooter />
      <ToastContainer
        hideProgressBar
        position="bottom-right"
        autoClose={2000}
      />
    </div>
  )
}
