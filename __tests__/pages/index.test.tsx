import { render, screen } from '@testing-library/react'
import Home from 'pages/index'

// eslint-disable-next-line react/display-name
jest.mock('components/SEO', () => () => <div />)

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const button = screen.getByRole('button', {
      name: /Loading.../i,
    })

    expect(button).toBeInTheDocument()
  })
})
