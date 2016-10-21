import configureStore from './configure-store'

const mockModule = {
  hot: {
    accept: jest.fn((a, b) => b())
  }
}

describe('configureStore', () => {
  describe('default', () => {
    it('Should return intial state', () => {
      const store = configureStore(undefined, mockModule)
      expect(typeof store.getState).toEqual('function')
      expect(typeof store.dispatch).toEqual('function')
      expect(mockModule.hot.accept).toHaveBeenCalled()
    })
  })
})
