import type { NextPage } from 'next'
import {
  LandingNavigation,
  HeroSection,
  IntroSection,
  BodySection,
} from 'components'
import { ToastContainer } from 'react-toastify'
import ReactFullpage from '@fullpage/react-fullpage'

const HomePage: NextPage = () => {
  return (
    <>
      <LandingNavigation />
      <ReactFullpage
        navigation
        render={(comp) => (
          <ReactFullpage.Wrapper>
            <HeroSection />
            <IntroSection />
            <BodySection />
          </ReactFullpage.Wrapper>
        )}
      />
      <ToastContainer
        hideProgressBar
        position="bottom-right"
        autoClose={2000}
      />
    </>
  )
}

export default HomePage
