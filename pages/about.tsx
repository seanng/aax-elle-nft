import type { NextPage } from 'next'
import {
  HeroSection,
  IntroSection,
  BodySection,
  MintNavigation,
  MintFooter,
} from 'components'
import ReactFullpage from '@fullpage/react-fullpage'

const AboutPage: NextPage = () => {
  return (
    <>
      <MintNavigation />
      {/* <WelcomeNavigation /> */}
      <ReactFullpage
        licenseKey="62K6J-PQ71H-00KVJ-7RJGJ-VYVZP"
        navigation
        render={(comp) => (
          <ReactFullpage.Wrapper>
            <HeroSection />
            <IntroSection />
            <BodySection />
          </ReactFullpage.Wrapper>
        )}
      />
      <MintFooter />
    </>
  )
}

export default AboutPage
