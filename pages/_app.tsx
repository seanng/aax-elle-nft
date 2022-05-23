import 'styles/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import 'styles/loader.css'

import { Web3ContextProvider } from 'context'
import SEO from 'components/SEO'

function MyApp({ Component, pageProps }) {
  return (
    <Web3ContextProvider>
      <SEO />
      <Component {...pageProps} />
    </Web3ContextProvider>
  )
}

export default MyApp
