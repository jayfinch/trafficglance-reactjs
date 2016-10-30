import reducer from './reducer'
import { type } from '../constants/constants'

describe('reducer', () => {
  describe('default', () => {
    const prevState = {
      existingProp: 'alpha'
    }

    it('Should return intial state', () => {
      const actual = reducer(undefined, {})

      const expected = {
        apiKey: 'no-key-defined',
        distanceUnit: 'mi',
        commutes: []
      }

      expect(actual).toEqual(expected)
    })

    it('Should handle FETCH_CONFIG_REQUEST', () => {
      const actual = reducer(prevState, {
        type: type.FETCH_CONFIG_REQUEST
      })

      const expected = {
        existingProp: 'alpha'
      }

      expect(actual).toEqual(expected)
    })

    it('Should handle FETCH_CONFIG_SUCCESS', () => {
      const actual = reducer(prevState, {
        type: type.FETCH_CONFIG_SUCCESS,
        apiKey: 'foo',
        distanceUnit: 'bar',
        commutes: 'baz'
      })

      const expected = {
        existingProp: 'alpha',
        apiKey: 'foo',
        distanceUnit: 'bar',
        commutes: 'baz'
      }

      expect(actual).toEqual(expected)
    })

    it('Should handle FETCH_CONFIG_FAILURE', () => {
      const actual = reducer(prevState, {
        type: type.FETCH_CONFIG_FAILURE,
        configError: true
      })

      const expected = {
        existingProp: 'alpha',
        configError: true
      }

      expect(actual).toEqual(expected)
    })

    it('Should handle FETCH_TRAFFIC_REQUEST', () => {
      const prevState = {
        existingProp: 'alpha',
        commutes: [
          {
            existingProp: 'omega',
            id: 'foo',
            trafficData: 'bar',
            fetchingTraffic: 'baz',
            trafficError: 'qux'
          },
          {
            existingProp: 'omega',
            id: 'cat',
            trafficData: 'bear',
            fetchingTraffic: 'dog',
            trafficError: 'cow'
          }
        ]
      }

      const actual = reducer(prevState, {
        type: type.FETCH_TRAFFIC_REQUEST,
        id: 'foo'
      })

      const expected = {
        existingProp: 'alpha',
        commutes: [
          {
            existingProp: 'omega',
            id: 'foo',
            trafficData: null,
            fetchingTraffic: true,
            trafficError: false
          },
          {
            existingProp: 'omega',
            id: 'cat',
            trafficData: 'bear',
            fetchingTraffic: 'dog',
            trafficError: 'cow'
          }
        ]
      }

      expect(actual).toEqual(expected)
    })

    it('Should handle FETCH_TRAFFIC_SUCCESS', () => {
      const prevState = {
        existingProp: 'alpha',
        commutes: [
          {
            existingProp: 'omega',
            id: 'foo',
            trafficData: 'bar',
            fetchingTraffic: 'baz',
            trafficError: 'qux'
          },
          {
            existingProp: 'omega',
            id: 'cat',
            trafficData: 'bear',
            fetchingTraffic: 'dog',
            trafficError: 'cow'
          }
        ]
      }

      const actual = reducer(prevState, {
        type: type.FETCH_TRAFFIC_SUCCESS,
        id: 'foo',
        trafficData: 'bar'
      })

      const expected = {
        existingProp: 'alpha',
        commutes: [
          {
            existingProp: 'omega',
            id: 'foo',
            trafficData: 'bar',
            fetchingTraffic: false,
            trafficError: false
          },
          {
            existingProp: 'omega',
            id: 'cat',
            trafficData: 'bear',
            fetchingTraffic: 'dog',
            trafficError: 'cow'
          }
        ]
      }

      expect(actual).toEqual(expected)
    })

    it('Should handle FETCH_TRAFFIC_FAILURE', () => {
      const prevState = {
        existingProp: 'alpha',
        commutes: [
          {
            existingProp: 'omega',
            id: 'foo',
            trafficData: 'bar',
            fetchingTraffic: 'baz',
            trafficError: 'qux'
          },
          {
            existingProp: 'omega',
            id: 'cat',
            trafficData: 'bear',
            fetchingTraffic: 'dog',
            trafficError: 'cow'
          }
        ]
      }

      const actual = reducer(prevState, {
        type: type.FETCH_TRAFFIC_FAILURE,
        id: 'foo',
        trafficData: 'bar'
      })

      const expected = {
        existingProp: 'alpha',
        commutes: [
          {
            existingProp: 'omega',
            id: 'foo',
            trafficData: null,
            fetchingTraffic: false,
            trafficError: true
          },
          {
            existingProp: 'omega',
            id: 'cat',
            trafficData: 'bear',
            fetchingTraffic: 'dog',
            trafficError: 'cow'
          }
        ]
      }

      expect(actual).toEqual(expected)
    })
  })
})
