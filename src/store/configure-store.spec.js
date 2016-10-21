import configureStore from './configure-store'

describe('configureStore', () => {
  describe('default', () => {
    it('Should return intial state', () => {
      const store = configureStore()
      expect(typeof store.getState).toEqual('function')
      expect(typeof store.dispatch).toEqual('function')
    })
  })
})
