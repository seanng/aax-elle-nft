import { useState, useEffect } from 'react'
import StepWizard from 'react-step-wizard'
import type { NextPage } from 'next'
import {
  EmailStep,
  Navigation,
  MessageStep,
  CoverStep,
  PasscodeStep,
  DonationStep,
} from 'components'
import Animate from 'styles/animate.module.css'

// TODO: change to Tailwind animation classes?
const transitions = {
  enterRight: `${Animate.animated} ${Animate.fadeInDown}`,
  enterLeft: `${Animate.animated} ${Animate.fadeInUp}`,
  exitRight: `${Animate.animated} ${Animate.fadeOutDown}`,
  exitLeft: `${Animate.animated} ${Animate.fadeOutUp}`,
}

const MintPage: NextPage = () => {
  const [form, setForm] = useState({
    email: '',
    message: '',
    code: '',
    donation: null,
  })

  const updateForm = (formValues) => {
    setForm({ ...form, ...formValues })
  }

  useEffect(() => {
    // open modal
    if (form.donation) {
      console.log('in the mintpage useeffect.')
    }
  }, [form.donation])

  return (
    <>
      <Navigation />
      <div className="bg-black min-h-screen pt-28 text-white">
        <StepWizard transitions={transitions}>
          <CoverStep />
          <MessageStep updateForm={updateForm} />
          <EmailStep updateForm={updateForm} />
          <PasscodeStep updateForm={updateForm} />
          <DonationStep updateForm={updateForm} />
        </StepWizard>
      </div>
    </>
  )
}

export default MintPage
