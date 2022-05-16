import 'styles/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'

import { Web3ContextProvider } from 'context'
import { Layout } from 'components'

function MyApp({ Component, pageProps }) {
  return (
    <Web3ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3ContextProvider>
  )
}

export default MyApp
