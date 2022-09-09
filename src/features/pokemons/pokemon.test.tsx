import { render, screen } from '@testing-library/react'
import App from '@/pages/index'
import { makeStore } from '../../store/index'
import { Provider } from 'react-redux' 

describe('Home', () => {
  it('renders a heading', () => {
    
    const component = render(<Provider store={makeStore()}><App /></Provider>)
    console.log(component);
    
  })
})
