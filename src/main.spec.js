import { injectApp } from './main'
import { render } from 'react-dom'

jest.mock('react-dom', () => {
  return { render: jest.fn() }
})

describe('main', () => {
  it('Should lorem', () => {
    injectApp('app', 'el')
    expect(render).toHaveBeenCalledWith('app', 'el')
  })
})
