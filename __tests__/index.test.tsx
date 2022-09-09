import { render, screen } from '@testing-library/react'
import App from '@/pages/index'
import { makeStore } from '../src/store/index'
import { Provider } from 'react-redux' 

describe('Home', () => {
  it('renders a heading', () => {
    render(<Provider store={makeStore()}><App /></Provider>)

    // const heading = screen.getByRole('heading', {
    //   name: /welcome to next\.js!/i,
    // })

    // expect(heading).toBeInTheDocument()
  })
})
