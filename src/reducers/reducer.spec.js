import reducer from './reducer'
import type from '../actions/constants'

describe('reducer', () => {
  describe('default', () => {
    it('Should handle FETCH_CONFIG_FAILURE', () => {
      const state = reducer({}, {
        type: type.FETCH_CONFIG_FAILURE,
        configError: true
      })

      expect(state).toEqual({
        configError: true
      })
    })
  })
})
