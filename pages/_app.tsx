import SEO from 'components/SEO'
import { Web3ContextProvider } from 'context'

import 'styles/fonts.css'
import 'styles/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import 'styles/custom.css'

function MyApp({ Component, pageProps }) {
  return (
    <Web3ContextProvider>
      <SEO />
      <Component {...pageProps} />
    </Web3ContextProvider>
  )
}

export default MyApp
