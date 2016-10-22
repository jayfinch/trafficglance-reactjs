import * as actions from './actions'
import * as commutesHelper from './../utils/commutes-helper'
import type from './constants'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock('../utils/commutes-helper.js')
jest.mock('../utils/traffic-helper.js')
jest.mock('fetch-jsonp')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  // fetchConfig

  describe('fetchConfig', () => {
    it('Should handle success', () => {
      const commute = 'baz'
      const response = {
        'apiKey': 'foo',
        'distanceUnit': 'bar',
        'commutes': commute
      }
      fetch.mockResponseOnce(JSON.stringify(response), {status: 200})

      const expectedActions = [
        {
          type: type.FETCH_CONFIG_REQUEST
        },
        {
          type: type.FETCH_CONFIG_SUCCESS,
          apiKey: 'foo',
          distanceUnit: 'bar',
          commutes: 'baz-transformed'
        }

      ]
      const store = mockStore()

      return store.dispatch(actions.fetchConfig())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
          expect(commutesHelper.transformCommutes).toHaveBeenCalledWith(commute)
        })
    })

    it('Should handle failure', () => {
      fetch.mockResponseOnce('', {status: 400, statusText: 'foo'})

      const expectedActions = [
        {
          type: type.FETCH_CONFIG_REQUEST
        },
        {
          type: type.FETCH_CONFIG_FAILURE,
          error: 'foo'
        }

      ]
      const store = mockStore()

      return store.dispatch(actions.fetchConfig())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  // fetchTraffic

  describe('fetchTraffic', () => {
    it('Should handle success', () => {
      const expectedActions = [
        {
          type: type.FETCH_TRAFFIC_REQUEST,
          id: 'foo-id'
        },
        {
          type: type.FETCH_TRAFFIC_SUCCESS,
          id: 'foo-id',
          trafficData: {
            distance: 'a',
            arriveTime: 'b',
            hours: 'c',
            minutes: 'd',
            durationNoCongestion: 'e',
            durationLowCongestion: 'f',
            durationModerateCongestion: 'g',
            durationSeriousCongestion: 'h',
            travelWarnings: 'i'
          }
        }

      ]
      const store = mockStore()

      return store.dispatch(actions.fetchTraffic('success-url', 'foo-id'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Should handle failure', () => {
      const expectedActions = [
        {
          type: type.FETCH_TRAFFIC_REQUEST,
          id: 'foo-id'
        },
        {
          type: type.FETCH_TRAFFIC_FAILURE,
          error: 'bad-response',
          id: 'foo-id'
        }

      ]
      const store = mockStore()

      return store.dispatch(actions.fetchTraffic('fail-url', 'foo-id'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})
