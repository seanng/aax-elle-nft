import SEO from 'components/SEO'
import { DetectionContextProvider, Web3ContextProvider } from 'context'
import { ToastContainer } from 'react-toastify'
import { ToastSuccessIcon } from 'components'

import 'styles/fonts.css'
import 'styles/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import 'styles/custom.css'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

const toastClass = {
  success: 'bg-lime text-black',
  warning: 'bg-orange text-white',
  default: 'bg-white',
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SEO
        seoImage={{
          url: 'https://d378vx0xcxselt.cloudfront.net/assets/meta-image.png',
          dimensions: { width: 1200, height: 630 },
        }}
      />
      <DetectionContextProvider>
        <Web3ContextProvider>
          <Component {...pageProps} />
        </Web3ContextProvider>
      </DetectionContextProvider>
      <ToastContainer
        hideProgressBar
        position="top-center"
        autoClose={2000}
        icon={<ToastSuccessIcon />}
        closeOnClick
        closeButton={false}
        toastClassName={(ctx) =>
          toastClass[ctx?.type || 'default'] +
          ' p-4 rounded-none cursor-pointer'
        }
        bodyClassName={() => 'flex items-start'}
      />
    </>
  )
}

export default MyApp
