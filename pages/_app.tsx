import 'styles/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'

import { Web3ContextProvider } from 'context'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }) {
  return (
    <Web3ContextProvider>
      <Component {...pageProps} />
      <ToastContainer
        hideProgressBar
        position="bottom-right"
        autoClose={2000}
      />
    </Web3ContextProvider>
  )
}

export default MyApp
